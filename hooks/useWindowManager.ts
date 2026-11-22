'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type MouseEvent, useCallback, useEffect, useMemo } from 'react';
import { WINDOWS, windowForPath, type WindowId } from '../lib/windows';
import { useWindowStore } from '../store/windows';

/**
 * Opens and focuses the window that owns the current route. Called once from
 * the root Layout, so every navigation (links, back/forward, a full load)
 * goes through here.
 */
export function useRouteSync() {
	const pathname = usePathname();

	useEffect(() => {
		const id = windowForPath(pathname);
		if (!id) return;
		const store = useWindowStore.getState();
		store.open(id, pathname);
		if (id === 'fileExplorer') store.explorerVisit(pathname);
	}, [pathname]);
}

/** Opens and focuses the window for a route the URL already points at. */
const reopenRoute = (pathname: string) => {
	const id = windowForPath(pathname);
	if (id) useWindowStore.getState().open(id, pathname);
};

/**
 * A link to the route that is already showing does not change the pathname,
 * so useRouteSync never sees it. Use as onClickCapture on containers of links
 * that live outside their window (the start menu) so clicking one still
 * restores and focuses a minimized or unfocused window.
 */
export function reopenIfCurrentRoute(e: MouseEvent) {
	const anchor = (e.target as Element).closest('a');
	if (!anchor) return;
	const { pathname } = new URL(anchor.href);
	if (pathname === window.location.pathname) reopenRoute(pathname);
}

/** Navigates like a link click, for things opened by double-click. */
export function useOpenRoute() {
	const router = useRouter();
	return useCallback(
		(href: string) => {
			const { pathname } = new URL(href, window.location.href);
			if (pathname === window.location.pathname) reopenRoute(pathname);
			else router.push(href);
		},
		[router],
	);
}

/**
 * Window actions that also keep the URL on the focused window's route.
 * Handlers read window.location rather than usePathname so they never act on
 * a stale pathname.
 */
export function useWindowActions() {
	const router = useRouter();

	return useMemo(() => {
		const store = useWindowStore.getState;

		const ownsUrl = (id: WindowId) =>
			windowForPath(window.location.pathname) === id;

		// After the URL's window is minimized or closed, follow focus.
		const followFocus = () => {
			const { focused, windows } = store();
			router.replace((focused && windows[focused].path) || '/');
		};

		const activate = (id: WindowId) => {
			store().focus(id);
			const { path } = store().windows[id];
			if (path && path !== window.location.pathname) router.replace(path);
		};

		const launch = (id: WindowId) => {
			if (store().windows[id].open) return activate(id);
			const path = WINDOWS[id].defaultPath;
			if (!path) return;
			if (path === window.location.pathname) store().open(id, path);
			else router.push(path);
		};

		const minimizeWindow = (id: WindowId) => {
			const owned = ownsUrl(id);
			store().minimize(id);
			if (owned) followFocus();
		};

		const closeWindow = (id: WindowId) => {
			const owned = ownsUrl(id);
			store().close(id);
			if (owned) followFocus();
		};

		/** Windows 11 taskbar click: launch, focus/restore, or minimize. */
		const taskbarClick = (id: WindowId) => {
			const { windows, focused } = store();
			const w = windows[id];
			if (!w.open) return launch(id);
			if (focused === id && !w.minimized) return minimizeWindow(id);
			activate(id);
		};

		return { activate, launch, minimizeWindow, closeWindow, taskbarClick };
	}, [router]);
}
