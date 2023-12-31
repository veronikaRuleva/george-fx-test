import classNames from "classnames";
import { ElementType, memo } from "react";

export interface CardProps<C extends ElementType>
  extends React.HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean;
  as?: C;
}

export const Card = memo(function CardComponent<C extends ElementType>({
  className,
  children,
  as,
  withBorder = true,
  ...props
}: CardProps<C>) {
  const Component = as || "div";

  return (
    <Component
      className={classNames(
        "rounded-xl",
        {
          "border border-gray-200":
            !className?.includes("border") && withBorder,
        },
        { "p-6": !className?.includes("p-") },
        { "rounded-xl": !className?.includes("rounded-") },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
