import { UserProps } from "@/types";

export interface InputsCollectionPropsEditUser {
  [key: string]: {
    inputName: string;
    value: string;
    type: string;
    isValid: boolean;
    label: string;
    regex: RegExp;
    errorMessage: string;
  };
}

export interface InputsPropsEditUser {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputsCollection: InputsCollectionPropsEditUser;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
