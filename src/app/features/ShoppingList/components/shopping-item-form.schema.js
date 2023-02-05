import * as Yup from 'yup';

export const ShoppingItemFormSchema = Yup.object({
  name: Yup.string()
    .min(2, 'GLOBAL.FORM.ERROR.MIN')
    .max(30, 'GLOBAL.FORM.ERROR.MAX')
    .required('GLOBAL.FORM.ERROR.REQUIRED'),
  unit: Yup.string().required('GLOBAL.FORM.ERROR.REQUIRED'),
  neededQuantity: Yup.number()
    .positive('GLOBAL.FORM.ERROR.NUMBER')
    .max(20, 'SHOPPING_LIST.FORM.ERROR.CURRENT_QUANTITY_LOWER_THAN_MAXIMAL')
    .required('GLOBAL.FORM.ERROR.REQUIRED'),
});
