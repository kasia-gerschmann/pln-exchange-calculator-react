import { ButtonHTMLAttributes, ReactNode } from "react";
import css from "./Button.module.css";
import classNames from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children: ReactNode;
}

function Button({ disabled = false, children, ...props }: Props) {
  const btnClass = classNames({
    [css.btn]: true,
    "no-pointer-events": disabled,
  });
  return (
    <div className={css.container}>
      <button className={btnClass} {...props}>
        {children}
      </button>
    </div>
  );
}

export default Button;
