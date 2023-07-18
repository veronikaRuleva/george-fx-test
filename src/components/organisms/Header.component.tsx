import classNames from "classnames";
import { ReactComponent as GeorgeLogo } from "src/svg/george-logo.svg";
import { Container } from "../templates/Container.component";

export interface HeaderProps extends React.HTMLAttributes<HTMLMenuElement> {}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={classNames("bg-george-blue-300", className)}>
      <Container className="flex items-center p-4">
        <GeorgeLogo width={25} className="mr-6" />

        <h1 className="text-sm text-white font-inter font-semibold">
          George FE Test
        </h1>
      </Container>
    </header>
  );
};
