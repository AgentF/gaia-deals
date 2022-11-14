import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ to, children, className = "", classActive = "" }) => {
    const router = useRouter();
    const _className =
        router.pathname === to ? `${className} ${classActive}` : className;

    return (
        <Link href={to}>
            <a className={_className}>{children}</a>
        </Link>
    );
};

export default NavLink;