import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Formik} from 'formik';
import accept from '../../asstets/img/accept.svg'
import decline from '../../asstets/img/decline.svg'
import styled from "styled-components";
import ButtonIcon from "../atoms/ButtonIcon";
import {Link} from "react-router-dom";
import {FormattedMessage} from 'react-intl'
import {db} from '../../firebase/firebaseConfig'
import FormWrapper from "../atoms/item/FormWrapper";
import Heading from "../atoms/item/Heading";
import {ValidationSchema} from "../../utills/ValidationSchema";
import FormItem from "../molecules/Item/FormItem";
import StyledLabel from "../atoms/item/StyledLabel";
import StyledInput from "../atoms/item/StyledInput";
import ErrorText from "../atoms/item/ErrorText";
import StyledSelect from "../atoms/item/StyledSelect";
import ButtonContainer from "../atoms/item/ButtonContainer";
import {properties} from "../../utills/itemProperties";

const categories = ["baking", "pasta",
    "spieces", "vegetables and fruits",
    "meat and more", "dairy", "sweets", "beverages", "others"];

const units = ["piece", "liter", "kilogram"];

const EditItemForm = ({item, editItem}) => {

        const [newItem, setNewItem] = useState(item)

        const handleInputChange = e => {
            const {name, value} = e.target;
            setNewItem({...newItem, [name]: value});
        };

        const handleSubmitForm = (name) => {
            editItem(newItem);
            notify(name)
            setNewItem({name: "", category: "", unit: "", currentQuantity: 0, minimalQuantity: 0, maximalQuantity: 0})
        };

        const notify = (name) => {
            toast.success(`Succesfully edited ${name}`, {
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
                    initialValues={newItem}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        //TODO: check submitting
                        setSubmitting(true);
                        handleSubmitForm(values.name);
                        setSubmitting(false);
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
                                    /*TODO check default value*/
                                    value={values.category}
                                    onBlur={handleBlur}
                                    errors={errors.category && touched.category}
                                >
                                    {properties.categories.map((category) => (
                                            <FormattedMessage
                                                id={category}
                                                key={category}>
                                                {(text) => <option value={category}>{text}</option>}
                                            </FormattedMessage>
                                        )
                                    )}
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
                                    {properties.units.map((unit) => (
                                        <FormattedMessage
                                            id={unit}
                                            key={unit}>
                                            {(text) => <option value={text}>{unit}</option>}
                                        </FormattedMessage>)
                                    )}
                                </StyledSelect>
                            </FormItem>
                            {errors.unit && touched.unit ?
                                <ErrorText>{errors.unit}</ErrorText> : null
                            }

                            <FormItem>
                                <StyledLabel htmlFor="maximalQuantity">
                                    <FormattedMessage id="maximal quantity"/>
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


export default EditItemForm;



