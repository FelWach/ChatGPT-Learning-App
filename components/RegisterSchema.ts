import * as Yup from 'yup';

export const nameSchema = Yup.string().required();
export const emailSchema = Yup.string().email().required();
export const passwordSchema = Yup.string().min(8).required();
export const repeatPasswordSchema = Yup.string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.')


