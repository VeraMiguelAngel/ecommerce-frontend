import * as Yup from 'yup';

export const validateFormLogin = Yup.object({
  email: Yup.string()
    .email('Email inválido')
    .required('Campo requerido'),
  password: Yup.string()
    .required('Campo requerido')
    .min(8, 'Debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[@$!%*?&]/, 'Debe contener al menos un carácter especial (@$!%*?&)')
});

export const validateFormRegister = Yup.object({
  name: Yup.string()
    .required('Campo requerido')
    .min(2, 'Debe tener al menos 2 caracteres'),
  email: Yup.string()
    .email('Email inválido')
    .required('Campo requerido'),
  password: Yup.string()
    .required('Campo requerido')
    .min(8, 'Debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[@$!%*?&]/, 'Debe contener al menos un carácter especial (@$!%*?&)')
  ,
  address: Yup.string()
    .required('Campo requerido')
    .min(5, 'Debe tener al menos 5 caracteres'),
  phone: Yup.string()
    .required('Campo requerido')
    .matches(/^[0-9]+$/, 'Debe contener solo números')
    .min(8, 'Debe tener al menos 8 dígitos')
});
