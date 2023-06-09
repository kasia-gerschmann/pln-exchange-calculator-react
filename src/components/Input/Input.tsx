import {InputHTMLAttributes, ReactNode} from "react";
import css from "./Input.module.css";
import InputError from "./error/InputError";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

function Input({ label, error, ...props }: Props) {
  return (
    <div className={css.container}>
      <label className={css.label} htmlFor={props.name}>
        {label}
      </label>
      <input className={css.input} {...props} />
      <InputError error={error}></InputError>
    </div>
  );
}

export default Input;
