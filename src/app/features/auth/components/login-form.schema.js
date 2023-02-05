import * as Yup from 'yup';

export const LoginFormSchema = Yup.object({
  email: Yup.string().required('GLOBAL.FORM.ERROR.REQUIRED'),
  password: Yup.string().required('GLOBAL.FORM.ERROR.REQUIRED'),
});
