interface CustomInputProps {
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
  type: string;
  isValid: boolean;
}
