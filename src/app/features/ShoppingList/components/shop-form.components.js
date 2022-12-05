import React from 'react'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Field, Form, Formik} from 'formik';
import {FormattedMessage} from 'react-intl'

import accept from '../../../shared/assets/icons/accept.svg'
import decline from '../../../shared/assets/icons/decline.svg'
import {ButtonIcon, ButtonContainer} from "../../../shared/ui/Button";
import {FormWrapper, StyledLabel, ErrorText, FormItem} from "../../../shared/ui/Form";
import {Heading} from "../../../shared/ui/Page";
import {StyledSelect} from "../../../shared/ui/Select";
import {properties} from "../../../shared/utills/itemProperties";
import {ValidationSchemaForShoppingList} from "../../../shared/utills/ValidationSchemaForShoppingList";
import {StyledInput} from "../../../shared/ui/Input";

const ShopForm = ({addItemToShoppingList, setShowAddShopModal}) => {

    const handleSubmitForm = (values) => {
        addItemToShoppingList(values);
        notify(values.name)
        console.log(`adding ${values}`)
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
                initialValues={{
                    name: "",
                    unit: "",
                    neededQuantity: 0,
                }}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    handleSubmitForm(values);
                    setSubmitting(false);
                    resetForm({});

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
                            <Field
                                name="name"
                                type="text"
                                placeholder=""
                                errors={errors.name && touched.name}
                                as={StyledInput}
                            />
                        </FormItem>
                        {errors.name && touched.name ?
                            <ErrorText>{errors.name}</ErrorText> : null
                        }
                        <FormItem>
                            <StyledLabel htmlFor="unit">
                                <FormattedMessage id="choose unit"/>
                            </StyledLabel>
                            <Field
                                name="unit"
                                onBlur={handleBlur}
                                placeholder=""
                                errors={errors.category && touched.category}
                                as={StyledSelect}
                            >
                                {properties.units.map((unit) => (
                                    <FormattedMessage
                                        id={unit}
                                        key={unit}>
                                        {(text) => <option value={text}>{unit}</option>}
                                    </FormattedMessage>)
                                )}
                            </Field>
                        </FormItem>
                        {errors.unit && touched.unit ?
                            <ErrorText>{errors.unit}</ErrorText> : null
                        }

                        <FormItem>
                            <StyledLabel htmlFor="neededQuantity">
                                <FormattedMessage id="quantity"/>
                            </StyledLabel>
                            <Field
                                name="neededQuantity"
                                type="number"
                                as={StyledInput}
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
};

export default ShopForm