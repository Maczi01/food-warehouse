import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Formik} from 'formik';
import accept from '../../asstets/img/accept.svg'
import acceptDisabled from '../../asstets/img/acceptDisabled.svg'
import decline from '../../asstets/img/decline.svg'
import styled from "styled-components";
import ButtonIcon from "../atoms/ButtonIcon";
import {Link} from "react-router-dom";
import {FormattedMessage} from 'react-intl'
import * as Yup from "yup";
import FormWrapper from "../atoms/item/FormWrapper";
import Heading from "../atoms/item/Heading";
import FormItem from "../molecules/Item/FormItem";
import StyledLabel from "../atoms/item/StyledLabel";
import StyledInputError from "../atoms/item/StyledInputError";
import StyledInput from "../atoms/item/StyledInput";
import ErrorText from "../atoms/item/ErrorText";
import StyledSelect from "../atoms/item/StyledSelect";
import ButtonContainer from "../atoms/item/ButtonContainer";
import {ValidationSchema} from "../../utills/ValidationSchema";
// import {ValidationSchema} from "../../utills/ValidationSchema";
import eyeopen from "../../asstets/img/eyeopen.svg"

const categories = ["Pieczywo", "Makaron, ryż, kasze",
    "Produkty sypkie, przyprawy", "Warzywa i owoce",
    "Mięso, ryby, owoce morza", "Nabiał", "Słodycze i przekąski", "Napoje"];

const units = ["sztuka", "litr", "kilogram"];

const ItemForm = ({addItem}) => {

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

        const handleSubmitForm = (name) => {
            addItem(item);
            notify(name)
            setItem({name: "", category: "", unit: "", currentQuantity: 0, minimalQuantity: 0, maximalQuantity: 0})
        };

        const notify = (name) => {
            toast.success(`Succesfully added ${name}`, {
                position: toast.POSITION.TOP_CENTER
            })
        };

        return (
            <FormWrapper>
                <Heading>
                    <FormattedMessage id="add product"/>
                </Heading>
                <Formik
                    enableReinitialize
                    initialValues={item}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        handleSubmitForm(values.name);
                        setSubmitting(false);
                        resetForm();
                    }}
                    validationSchema={ValidationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}

                >
                    {({values, errors, touched, handleBlur, isValid, dirty, isSubmitting, handleSubmit}) => (
                        <Form
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    <FormattedMessage id="name"/>
                                </StyledLabel>
                                <StyledInput
                                    onChange={handleInputChange}
                                    name="name"
                                    type="text"
                                    value={values.name}
                                    placeholder=""
                                    errors={errors.name && touched.name}
                                />
                            </FormItem>
                            {errors.name && touched.name ?
                                <ErrorText>{errors.name}</ErrorText> : null
                            }
                            <FormItem>
                                <StyledLabel htmlFor="category">
                                    <FormattedMessage id="choose category"/>
                                </StyledLabel>
                                <StyledSelect
                                    onChange={handleInputChange}
                                    name="category"
                                    value={values.category}
                                    onBlur={handleBlur}
                                    errors={errors.category && touched.category}
                                >
                                    <option label="Choose category..." value="Choose category"/>
                                    <option label="pasta, rice, groats" value="pasta"/>
                                    <option label="loose products, spieces" value="spieces"/>
                                    <option label="baking" value="baking"/>
                                    <option label="vegetables and fruits" value="vegetablesAndFruits"/>
                                    <option label="meat, fiches, seafood" value="meatFishesSeafood"/>
                                    <option label="dairy" value="dairy"/>
                                    <option label="sweets and snacks" value="sweetsAndSnacks"/>
                                    <option label="beverages" value="beverages"/>
                                    <option label="others" value="others"/>
                                </StyledSelect>
                            </FormItem>
                            {errors.category && touched.category ?
                                <ErrorText>{errors.category}</ErrorText> : null
                            }
                            <FormItem>
                                <StyledLabel htmlFor="unit">
                                    <FormattedMessage id="choose unit"/>
                                </StyledLabel>
                                <StyledSelect
                                    onChange={handleInputChange}
                                    name="unit"
                                    onBlur={handleBlur}
                                    value={values.unit}
                                    placeholder=""
                                    errors={errors.category && touched.category}
                                >
                                    <option value="Wybierz jednostkę..." label="Choose unit..."/>
                                    <option value="Sztuka" label="Piece"/>
                                    <option value="Litr" label="Liter"/>
                                    <option value="Kilogram" label="Kilogram"/>
                                </StyledSelect>
                            </FormItem>
                            {errors.unit && touched.unit ?
                                <ErrorText>{errors.unit}</ErrorText> : null
                            }
                            <FormItem>
                                <StyledLabel>
                                    <FormattedMessage id="maximal quanitity"/>
                                </StyledLabel>
                                <StyledInput
                                    onChange={handleInputChange}
                                    name="maximalQuantity"
                                    type="number"
                                    value={values.maximalQuantity}
                                    placeholder=""
                                    errors={errors.maximalQuantity && touched.maximalQuantity}
                                />
                            </FormItem>
                            {errors.maximalQuantity && touched.maximalQuantity ?
                                <ErrorText>{errors.maximalQuantity}</ErrorText> : null
                            }
                            <FormItem>
                                <StyledLabel htmlFor="minimalQuantity">
                                    <FormattedMessage id="minimal quantity"/>
                                </StyledLabel>
                                <StyledInput
                                    onChange={handleInputChange}
                                    name="minimalQuantity"
                                    type="number"
                                    value={values.minimalQuantity}
                                    placeholder=""
                                    errors={errors.minimalQuantity && touched.minimalQuantity}
                                />
                            </FormItem>
                            {errors.minimalQuantity && touched.minimalQuantity ?
                                <ErrorText>{errors.minimalQuantity}</ErrorText> : null
                            }
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    <FormattedMessage id="current quantity"/>
                                </StyledLabel>
                                <StyledInput
                                    onChange={handleInputChange}
                                    name="currentQuantity"
                                    type="number"
                                    value={values.currentQuantity}
                                    placeholder=""
                                    errors={errors.currentQuantity && touched.currentQuantity}
                                />
                            </FormItem>
                            {errors.currentQuantity && touched.currentQuantity ?
                                <ErrorText>{errors.currentQuantity}</ErrorText> : null
                            }
                            <ButtonContainer>
                                <Link to="/">
                                    <ButtonIcon
                                        icon={decline}
                                    />
                                </Link>

                                <ButtonIcon
                                    type="submit"
                                    icon={accept}
                                />
                            </ButtonContainer>
                            <ToastContainer autoClose={2500}/>
                        </Form>
                    )}
                </Formik>
            </FormWrapper>
        )
    }
;

export default ItemForm;



