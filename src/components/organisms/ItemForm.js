import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Formik} from 'formik';
import accept from '../../assets/img/accept.svg'
import decline from '../../assets/img/decline.svg'
import ButtonIcon from "../atoms/ButtonIcon";
import {Link} from "react-router-dom";
import {FormattedMessage} from 'react-intl'
import FormWrapper from "../atoms/FormWrapper";
import Heading from "../atoms/Heading";
import FormItem from "../molecules/FormItem";
import StyledLabel from "../atoms/StyledLabel";
import ErrorText from "../atoms/ErrorText";
import StyledSelect from "../atoms/StyledSelect";
import ButtonContainer from "../atoms/ButtonContainer";
import {ValidationSchemaForFoodList} from "../../utills/ValidationSchemaForFoodList";
import {properties} from "../../utills/itemProperties";
import StyledInput from "../atoms/StyledInput";

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

        const handleSubmitForm = (values) => {
            addItem(values);
            notify(values.name);
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
                        //TODO: check submitting
                        setSubmitting(true);
                        handleSubmitForm(values);
                        setSubmitting(false);
                        resetForm({});
                    }}
                    validationSchema={ValidationSchemaForFoodList}
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
                                    onBlur={handleBlur}
                                    errors={errors.category && touched.category}
                                >
                                    {properties.categories.map((category) => (
                                        <FormattedMessage
                                            id={category}
                                            key={category}>
                                            {(text) => <option value={category}>{text}</option>}
                                        </FormattedMessage>)
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
                                    // value={values.currentQuantity}
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