import React, {ReactNode} from "react";
import css from "./Header.module.css";

interface Props {
    children: ReactNode;
}

function Header({children}: Props) {
    return (
        <header className={css.header}>
            {children}
        </header>
    )
}

export default Header;