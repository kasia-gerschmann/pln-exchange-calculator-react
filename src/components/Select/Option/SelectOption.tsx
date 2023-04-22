import { OptionHTMLAttributes, ReactNode } from "react";

interface Props extends OptionHTMLAttributes<HTMLOptionElement> {
  children: ReactNode;
}

function SelectOption({ children, ...props }: Props) {
  return <option {...props}>{children}</option>;
}

export default SelectOption;
