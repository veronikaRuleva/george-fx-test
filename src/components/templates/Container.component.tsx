import classNames from "classnames";
import { HTMLAttributes, memo } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  "data-testid"?: string;
}

export const Container = memo(function ContainerComponent({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={classNames("container mx-auto", className)} {...props}>
      {children}
    </div>
  );
});
