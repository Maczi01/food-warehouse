import React, {useState} from 'react'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Formik} from 'formik';
import accept from '../../assets/img/accept.svg'
import decline from '../../assets/img/decline.svg'
import ButtonIcon from "../atoms/ButtonIcon";
import {FormattedMessage} from 'react-intl'
import FormWrapper from "../atoms/FormWrapper";
import Heading from "../atoms/Heading";
import FormItem from "../molecules/FormItem";
import StyledLabel from "../atoms/StyledLabel";
import ErrorText from "../atoms/ErrorText";
import StyledSelect from "../atoms/StyledSelect";
import ButtonContainer from "../atoms/ButtonContainer";
import {properties} from "../../utills/itemProperties";
import {ValidationSchemaForShoppingList} from "../../utills/ValidationSchemaForShoppingList";
import StyledInput from "../atoms/StyledInput";

const ShopForm = ({addItemToShoppingList, setShowAddShopModal}) => {

        const [item, setItem] = useState({
            name: "",
            unit: "",
            neededQuantity: 0,
        });

        const handleInputChange = e => {
            const {name, value} = e.target;
            setItem({...item, [name]: value});
        };

        const handleSubmitForm = (values) => {
            addItemToShoppingList(values);
            notify(values.name)
            setItem({name: "", unit: "", neededQuantity: 0})
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
                    }}
                    validationSchema={ValidationSchemaForShoppingList}
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
                                    // value={values.name}
                                    placeholder=""
                                    errors={errors.name && touched.name}
                                />
                            </FormItem>
                            {errors.name && touched.name ?
                                <ErrorText>{errors.name}</ErrorText> : null
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
                                <StyledLabel htmlFor="neededQuantity">
                                    <FormattedMessage id="quantity"/>
                                </StyledLabel>
                                <StyledInput
                                    onChange={handleInputChange}
                                    name="neededQuantity"
                                    type="number"
                                    value={values.neededQuantity}
                                    placeholder=""
                                    errors={errors.neededQuantity && touched.neededQuantity}
                                />
                            </FormItem>
                            {errors.neededQuantity && touched.neededQuantity ?
                                <ErrorText>{errors.neededQuantity}</ErrorText> : null
                            }
                            <ButtonContainer>
                                <ButtonIcon
                                    onClick={() => setShowAddShopModal(prev => !prev)}
                                    icon={decline}
                                />
                                <ButtonIcon
                                    type="submit"
                                    icon={accept}
                                />
                            </ButtonContainer>
                        </Form>
                    )}
                </Formik>
            </FormWrapper>
        )
    }
;

export default ShopForm
