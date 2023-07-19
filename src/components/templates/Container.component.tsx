import classNames from "classnames";
import { HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  "data-testid"?: string;
}

export const Container = ({
  className,
  children,
  ...props
}: ContainerProps) => (
  <div className={classNames("container mx-auto", className)} {...props}>
    {" "}
    {children}
  </div>
);
