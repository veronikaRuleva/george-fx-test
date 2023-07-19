export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  "data-testid"?: string;
}

export const Input = ({ className, ...props }: InputProps) => (
  <input className={className} {...props} />
);
