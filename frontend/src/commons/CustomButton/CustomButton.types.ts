export interface CustomButtonProps {
  children: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "contained" | "outlined" | "text";
  type?: "submit" | "button";
}
