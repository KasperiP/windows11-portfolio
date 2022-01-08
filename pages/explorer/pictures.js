import Head from "next/head";
import React from "react";
import Icons from "../../components/icons/Icons";
import FileExplorer from "../../components/fileExplorer/FileExplorer";
import styles from "../../styles/utils/MediaGrid.module.scss";
import Image from "next/image";
import cloudinary from "cloudinary";

function Pictures({ data }) {
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
                                        src={image.secure_url.replace(
                                            "/upload/",
                                            "/upload/f_auto/"
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
                <title>kassq - Pictures</title>
                <link
                    rel="canonical"
                    href="https://www.kassq.dev/explorer/pictures"
                />
            </Head>
            <div style={{ height: "100%" }}>
                <FileExplorer
                    folder="Pictures"
                    topNav={false}
                    icon="pictures"
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
            "folder:images/*" // add your folder
        )
        .sort_by("public_id", "desc")
        .max_results(30)
        .execute();

    const data = res.resources;

    console.log(data);

    return {
        props: { data },
    };
}

export default Pictures;
