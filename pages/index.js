import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Index.module.css";
import Selecto from "react-selecto";

export default function Home() {
    return (
        <div className={styles.container}>
            <Selecto
                dragContainer={".elements"}
                selectableTargets={[".selecto-area .cube"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={true}
                ratio={0}
                onSelect={(e) => {
                    e.added.forEach((el) => {
                        el.classList.add("selected");
                    });
                    e.removed.forEach((el) => {
                        el.classList.remove("selected");
                    });
                }}
            ></Selecto>
            <div
                className={`elements selecto-area ${styles.content}`}
                id="selecto1"
            >
                <div className={styles.item}>
                    <Image
                        src="/icons/folder.ico"
                        alt="icon"
                        width={40}
                        height={40}
                    ></Image>
                    <p>Projektit</p>
                </div>
                <div className={styles.item}>
                    <Image
                        src="/icons/folder.ico"
                        alt="icon"
                        width={40}
                        height={40}
                    ></Image>
                    <p>Tietoa minusta</p>
                </div>
                <div className={styles.item}>
                    <Image
                        src="/icons/folder.ico"
                        alt="icon"
                        width={40}
                        height={40}
                    ></Image>
                    <p>Työkalut</p>
                </div>
                <div className={styles.item}>
                    <Image
                        src="/icons/pictures.ico"
                        alt="icon"
                        width={40}
                        height={40}
                    ></Image>
                    <p>Kuvat</p>
                </div>
                <div className={styles.item}>
                    <Image
                        src="/icons/videos.ico"
                        alt="icon"
                        width={40}
                        height={40}
                    ></Image>
                    <p>Videot</p>
                </div>
                <div className={styles.item}>
                    <Image
                        src="/icons/contacts.ico"
                        alt="icon"
                        width={40}
                        height={40}
                    ></Image>
                    <p>Linkit</p>
                </div>
                <div className={styles.item}>
                    <Image
                        src="/icons/trashcan.ico"
                        alt="icon"
                        width={40}
                        height={40}
                    ></Image>
                    <p>Roskakori</p>
                </div>
            </div>
        </div>
    );
}
