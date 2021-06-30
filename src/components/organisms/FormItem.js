import React, {useState} from "react";
import {ValidationSchemaForFoodList} from "../../utills/ValidationSchemaForFoodList";
import {Formik, Form, Field} from "formik";
import StyledInput from "../atoms/StyledInput";
import StyledLabel from "../atoms/StyledLabel";
import {FormattedMessage} from "react-intl";
import accept from "../../assets/img/accept.svg";
import ButtonIcon from "../atoms/ButtonIcon";
import ButtonContainer from "../atoms/ButtonContainer";
import decline from "../../assets/img/decline.svg";
import {ToastContainer} from "react-toastify";
import StyledSelect from "../atoms/StyledSelect";
import {Link} from "react-router-dom";

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
            onSubmit={(values, {setSubmitting, resetForm, handleSubmit}) => {
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
            {({values, errors, touched,handleChange, handleBlur, isValid, dirty, isSubmitting, handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <FormItem>
                        <StyledLabel htmlFor="currentQuantity">
                            <FormattedMessage id="name"/>
                        </StyledLabel>
                        <Field
                            name="name"
                            type="input"
                            as={StyledInput}
                        />
                    </FormItem>

                    <FormItem>
                        <StyledLabel htmlFor="category">
                            <FormattedMessage id="choose category"/>
                        </StyledLabel>
                        <Field
                            name="category"
                            type="input"
                            as={StyledSelect}
                        />
                    </FormItem>

                    <FormItem>
                        <StyledLabel htmlFor="unit">
                            <FormattedMessage id="choose unit"/>
                        </StyledLabel>
                        <Field
                            name="unit"
                            type="input"
                            as={StyledSelect}
                        />
                    </FormItem>

                    <FormItem>
                        <StyledLabel htmlFor="maximalQuantity">
                            <FormattedMessage id="maximal quantity"/>
                        </StyledLabel>
                        <Field
                            name="maximalQuantity"
                            type="input"
                        />
                    </FormItem>

                    <FormItem>
                        <StyledLabel htmlFor="maximalQuantity">
                            <FormattedMessage id="maximal quantity"/>
                        </StyledLabel>
                        <Field
                            name="minimalQuantity"
                            type="input"
                        />
                    </FormItem>

                    <FormItem>
                        <StyledLabel htmlFor="maximalQuantity">
                            <FormattedMessage id="maximal quantity"/>
                        </StyledLabel>
                        <Field
                            name="currentQuantity"
                            type="input"
                        />
                    </FormItem>

                    <ButtonContainer>
                        <Link to="/">
                            <ButtonIcon
                                icon={decline}
                            />
                        </Link>
                        <ButtonIcon
                            type="submit"
                            disabled={isSubmitting}
                            icon={accept}
                        />
                    </ButtonContainer>
                    <ToastContainer autoClose={2500}/>
                </Form>
            )}


        </Formik>

    )

};

export default FormItem;