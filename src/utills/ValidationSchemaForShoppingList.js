import * as Yup from "yup";

export const ValidationSchemaForShoppingList =
    Yup.object({
            name: Yup.string()
                .min(2, "Too short, minimal 3 characters!")
                .max(30, "Too long, maximal 3 characters!!")
                .required("Name is required!"),
            unit: Yup.string()
                .required("Unit is required!"),
            neededQuantity: Yup.number()
                .positive("Only positive number!")
                .max(20, "Current quantity must be lower than maximal!")
                .required("Required")
        }
    );