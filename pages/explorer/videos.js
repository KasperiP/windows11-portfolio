import Head from "next/head";
import React from "react";
import Icons from "../../components/icons/Icons";
import FileExplorer from "../../components/fileExplorer/FileExplorer";
import cloudinary from "cloudinary";
import styles from "../../styles/utils/MediaGrid.module.scss";
import Image from "next/image";

function videos({ data }) {
    const content = () => {
        return (
            <>
                <div className={styles.wrapper}>
                    {data &&
                        data.map((image) => (
                            <div
                                className={styles.mediaItem}
                                key={image.filename}
                                onClick={() =>
                                    window.open(
                                        image.secure_url,
                                        "_blank",
                                        "noopener,noreferrer"
                                    )
                                }
                            >
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={(
                                            image.secure_url
                                                .split(".")
                                                .slice(0, -1)
                                                .join(".") + ".webp"
                                        ).replace(
                                            "/upload/",
                                            "/upload/q_auto:low/"
                                        )}
                                        alt="icon"
                                        width="100%"
                                        height="100%"
                                        layout="responsive"
                                        objectFit="contain"
                                    ></Image>
                                </div>
                                <p>
                                    {image.filename.slice(0, -7)}.{image.format}
                                </p>
                            </div>
                        ))}
                </div>
            </>
        );
    };

    return (
        <>
            <Head>
                <title>kassq - Videos</title>
                <link
                    rel="canonical"
                    href="https://www.kassq.dev/explorer/videos"
                />
            </Head>
            <div style={{ height: "100%" }}>
                <FileExplorer
                    folder="Videos"
                    topNav={true}
                    icon="videos"
                    component={content()}
                />
                <Icons />
            </div>
        </>
    );
}

export async function getStaticProps() {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });

    const res = await cloudinary.v2.search
        .expression(
            "folder:videos/*" // add your folder
        )
        .sort_by("public_id", "desc")
        .max_results(30)
        .execute();

    const data = res.resources;

    return {
        props: { data },
    };
}

export default videos;
