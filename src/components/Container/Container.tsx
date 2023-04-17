import React, { ReactNode } from "react";
import css from "./Container.module.css";

interface Props {
  children: ReactNode;
}

function Container({ children }: Props) {
  return <div className={css.container}>{children}</div>;
}

export default Container;
