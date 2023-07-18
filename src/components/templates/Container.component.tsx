import classNames from "classnames";
import { HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container = ({ className, children }: ContainerProps) => (
  <div className={classNames("container mx-auto", className)}> {children}</div>
);
