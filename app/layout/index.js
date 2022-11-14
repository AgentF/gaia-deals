import React from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footbar from "./Footbar";

function Layout({
    topbarTitle = null,
    metadata = null,
    title = "GaiaDeals",
    children,
}) {
    return (
        <div className="root">
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="theme-color" content="#171722" />
                <link rel="shortcut icon" href="/logo.png" />

                {metadata !== null && (
                    <React.Fragment>
                        <meta
                            name="description"
                            content={metadata.description}
                        />
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content={metadata.title} />
                        <meta
                            property="og:description"
                            content={metadata.description}
                        />
                        <meta property="og:image" content={metadata.image} />
                        <meta property="og:url" content={metadata.url} />
                        <meta
                            property="og:site_name"
                            content={metadata.sitename}
                        />
                        <meta name="twitter:title" content={metadata.title} />
                        <meta
                            name="twitter:description"
                            content={metadata.description}
                        />
                        <meta name="twitter:image" content={metadata.image} />
                    </React.Fragment>
                )}

                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
                    rel="stylesheet"
                />
                <title>{title}</title>
            </Head>

            <Sidebar />
            <div className="app-content">
                <Navbar />
                <Footbar />
                {topbarTitle !== null && <Topbar title={topbarTitle} />}
                <section className={topbarTitle === null ? "p-0" : ""}>
                    {children}
                </section>
            </div>
        </div>
    );
}

export default Layout;
