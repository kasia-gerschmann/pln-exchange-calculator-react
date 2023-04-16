import React from "react";
import css from "./HomeFormResult.module.css";
import Loader from "../../../../components/Loader/Loader";

interface Props {
    result: string | undefined;
    loading: boolean;
}

function HomeFormResult({result, loading}: Props) {
    return (
        <div className={css.container}>
            <h3>{result}</h3>
            {loading ? <Loader/> : undefined}
        </div>
    );
}

export default HomeFormResult;