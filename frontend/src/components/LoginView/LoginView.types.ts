export interface InputsCollectionProps {
  [key: string]: {
    inputName: string;
    value: string;
    type: string;
    isValid: boolean;
    label: string;
  };
}

export interface InputsProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputsCollection: InputsCollectionProps;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
