import { ReactNode, SelectHTMLAttributes } from "react";
import css from "./Select.module.css";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: ReactNode;
  children: ReactNode;
}

function Select({ label, children, ...props }: Props) {
  return (
    <div className={css.container}>
      <label className={css.label} htmlFor={props.name}>
        {label}
      </label>
      <select className={css.select} {...props}>
        {children}
      </select>
    </div>
  );
}

export default Select;
