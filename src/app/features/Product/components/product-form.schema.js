import * as Yup from 'yup';

export const ProductFormSchema = Yup.object({
  name: Yup.string()
    .min(2, 'GLOBAL.FORM.ERROR.MIN')
    .max(30, 'GLOBAL.FORM.ERROR.MAX')
    .required('GLOBAL.FORM.ERROR.REQUIRED'),
  unit: Yup.string().required('GLOBAL.FORM.ERROR.REQUIRED'),
  category: Yup.string().required('GLOBAL.FORM.ERROR.REQUIRED'),
  currentQuantity: Yup.number()
    .positive('GLOBAL.FORM.ERROR.NUMBER')
    .max(Yup.ref('maximalQuantity'), 'PRODUCT.FORM.ERROR.CURRENT_QUANTITY_LOWER_THAN_MAXIMAL')
    .required('GLOBAL.FORM.ERROR.REQUIRED'),
  minimalQuantity: Yup.number()
    .positive('GLOBAL.FORM.ERROR.NUMBER')
    .max(Yup.ref('maximalQuantity'), 'PRODUCT.FORM.ERROR.LOWER_QUANTITY_LOWER_THAN_MAXIMAL')
    .required('GLOBAL.FORM.ERROR.REQUIRED'),
  maximalQuantity: Yup.number()
    .min(Yup.ref('minimalQuantity'), 'PRODUCT.FORM.ERROR.MAXIMAL_QUANTITY_GRATER_THAN_MINIMAL')
    .positive('GLOBAL.FORM.ERROR.NUMBER')
    .max(10, 'GLOBAL.FORM.ERROR.MAX')
    .required('GLOBAL.FORM.ERROR.REQUIRED'),
});
