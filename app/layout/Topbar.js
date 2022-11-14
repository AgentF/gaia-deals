import { Fragment, useContext } from "react";
import Link from "next/link";
import styles from "../../styles/Layout.module.css";

const Topbar = ({ title }) => {
    const user = { username: "tonystark" };
    const isAuthenticated = true;

    const account = isAuthenticated ? (
        <Fragment>
            <div className={styles.topbar_ico_alert}></div>
            <div className={styles.topbar_avatar}></div>
            <span>{user.username}</span>
        </Fragment>
    ) : (
        <Link href="/">
            <a className="uppercase bg-yellow-100 text-yellow-500 h-8 flex items-center justify-center rounded px-4">
                Iniciar Sesion
            </a>
        </Link>
    );

    return (
        <div className="dt-topbar">
            <h3 className={styles.topbar_title}>{title}</h3>
            <div className={styles.topbar_account}>{account}</div>
        </div>
    );
};

export default Topbar;
