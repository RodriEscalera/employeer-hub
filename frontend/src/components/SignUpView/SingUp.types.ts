import { RegisterServiceRequest } from "@/types";
import React from "react";

export interface InputsCollectionProps {
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

export interface InputsProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputsCollection: InputsCollectionProps;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
