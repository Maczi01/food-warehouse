import React, {useState} from "react";
import {ValidationSchemaForFoodList} from "../../utills/ValidationSchemaForFoodList";
import {Formik, Field} from "formik";
import StyledInput from "../atoms/StyledInput";

const FormItem = ({addItem}) => {

    const [item, setItem] = useState({
        name: "",
        category: "",
        unit: "",
        currentQuantity: 0,
        minimalQuantity: 0,
        maximalQuantity: 0
    });

    const handleInputChange = e => {
        const {name, value} = e.target;
        setItem({...item, [name]: value});
    };

    return (
        <Formik
            enableReinitialize
            initialValues={item}
            onSubmit={(values, {setSubmitting, resetForm,handleSubmit}) => {
                //TODO: check submitting
                setSubmitting(true);
                handleSubmit(values);
                setSubmitting(false);
                resetForm({});
            }}
            validationSchema={ValidationSchemaForFoodList}
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({values, errors, touched, handleBlur, isValid, dirty, isSubmitting, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="name"
                        type="input"
                        as={StyledInput}
                    />

                </form>
            )}


        </Formik>

    )

};

export default FormItem;