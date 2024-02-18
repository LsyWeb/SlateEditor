import { Tooltip } from "antd";
import React, { FC, ReactNode } from "react";

type ButtonProps = {
  format: string;
  active?: boolean;
  children: ReactNode;
  tooltip?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = (props) => {
  const { children, format, active, tooltip, ...rest } = props;
  return (
    <Tooltip
      title={tooltip}
      trigger={["hover"]}
      overlayInnerStyle={{ fontSize: 12 }}
    >
      <button
        className={active ? "slate-button active" : "slate-button"}
        title={format}
        {...rest}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export default Button;
