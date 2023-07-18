export interface FlagImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  countryCode: string;
  pathToFlagImages: string;
  imageFileType: string;
}

export const FlagImage = ({
  className,
  alt,
  countryCode,
  pathToFlagImages,
  imageFileType,
}: FlagImageProps) => {
  return (
    <img
      src={`${pathToFlagImages}${countryCode.toLowerCase()}.${imageFileType}`}
      alt={alt}
      className={className}
    />
  );
};
