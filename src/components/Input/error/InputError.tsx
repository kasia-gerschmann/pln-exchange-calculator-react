import React from "react";
import css from "./InputError.module.css";
import classNames from "classnames";

interface Props {
    error: string | undefined;
}

function InputError({error}: Props) {
    const errorClass = classNames({
        [css.error]: true,
        hidden: !error,
    });
    return (
        <div className={errorClass}>{error}</div>
    )
}

export default InputError;