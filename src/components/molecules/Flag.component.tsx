import { HTMLAttributes } from "react";
import { FlagImage } from "../atoms/FlagImage.component";
import { FlagPlaceholder } from "../atoms/FlagPlaceholder.component";

export interface FlagProps extends HTMLAttributes<HTMLDivElement> {
  isFlagProvided: boolean;
  countryCode: string;
  'data-testid'?: string;
}

export const Flag = ({
  isFlagProvided,
  countryCode,
  className,
  ...props
}: FlagProps) => {
  return isFlagProvided ? (
    <FlagImage
      pathToFlagImages="/images/flags/"
      alt={countryCode}
      countryCode={countryCode}
      imageFileType="png"
      className={className}
      data-testid="flag"
      {...props}
    />
  ) : (
    <FlagPlaceholder
      countryCode={countryCode}
      className={className}
      data-testid="flag-placeholder"
      {...props}
    />
  );
};
