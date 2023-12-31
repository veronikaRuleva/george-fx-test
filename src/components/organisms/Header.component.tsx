import classNames from "classnames";
import { ReactComponent as GeorgeLogo } from "src/svg/george-logo.svg";
import { Container } from "../templates/Container.component";
import { memo } from "react";

export interface HeaderProps extends React.HTMLAttributes<HTMLMenuElement> {}

export const Header = memo(function HeaderComponent({
  className,
  ...props
}: HeaderProps) {
  return (
    <header className={classNames("bg-george-blue-300", className)} {...props}>
      <Container
        className="flex items-center p-4"
        data-testid="container-header"
      >
        <GeorgeLogo width={25} className="mr-6" data-testid="george-logo" />

        <h1 className="text-sm text-white font-inter font-semibold">
          George FE Test
        </h1>
      </Container>
    </header>
  );
});
