import React from "react";

export interface InputsCollectionPropsCreateUser {
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

export interface InputsPropsCreateUser {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputsCollection: InputsCollectionPropsCreateUser;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
