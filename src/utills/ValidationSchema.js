import * as Yup from "yup";

export const ValidationSchema =
    Yup.object({
            name: Yup.string()
                .min(2, "Too short, minimal 3 characters!")
                .max(30, "Too long, maximal 3 characters!!")
                .required("Name is required!"),
            unit: Yup.string()
                .required("Unit is required!"),
            category: Yup.string()
                .required("Category is required!"),
            currentQuantity: Yup.number()
                .positive("Only positive number!")
                .max(Yup.ref("maximalQuantity"), "Current quantity must be lower than maximal!")
                .required("Required"),
            minimalQuantity: Yup.number()
                .positive("Only positive number!")
                .max(Yup.ref("maximalQuantity"), "Minimal quantity must be lower than maximal!")
                .required("Required"),
            maximalQuantity: Yup.number()
                .positive("Only positive number!")
                .max(10, "Less than 10!")
                .min(Yup.ref("minimalQuantity"), "Maximal quantity must be greather than minimal!")
                .required("Required"),
        }
    );