export const validationRules = {
  firstname: {
    regex: /^.{5,15}$/,
    errorMessage: "El nombre de usuario es obligatorio",
  },
  lastname: {
    regex: /^.{5,15}$/,
    errorMessage: "El nombre de usuario es obligatorio",
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: "Correo electrónico no válido",
  },
  dni: { regex: /^.{1,8}$/, errorMessage: "Correo electrónico no válido" },
  password: {
    regex: /^(?=.*\d)(?=.*[A-Z]).{8,16}$/,
    errorMessage:
      "La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.",
  },
  confirmPassword: {
    regex: "",
    errorMessage: "Las contraseñas no coinciden",
  },
};
