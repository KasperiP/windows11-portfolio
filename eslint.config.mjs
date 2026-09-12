import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
	globalIgnores(['.next/**', 'out/**', 'node_modules/**']),
	...nextCoreWebVitals,
	// Keep last so Prettier owns all formatting decisions.
	prettier,
]);
