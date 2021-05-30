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

const FormWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 50vw;
      @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
     }
`;

const ButtonContainer = styled.div`
      margin: 20px 0 20px 0;
      display: flex;
      justify-content: flex-end
`

const FormItem = styled.div`
      width: 100%;
      display: flex;
         @media (max-width: ${({theme}) => theme.mobile}) {
          flex-direction: column;
          border: 1px solid   ${({theme}) => theme.colors.darkblue});
      }
`;

const StyledInput = styled.input`
    display: block;
    appearance: none;
    outline: 0;
    border: 1px solid white;
    width: 300px;
    border-radius: 3px;
    margin: 6px;
    text-align: center;
    font-size: 18px;
    color: black;
    transition-duration: 0.25s;
    font-weight: 300;
    background-color: ${({theme}) => theme.colors.gray};
    @media (max-width: ${({theme}) => theme.mobile}) {
       height: 50px;
    }
  }
`;

const StyledInputError = styled.input`
    display: block;
    appearance: none;
    outline: 0;
    width: 300px;
    border-radius: 3px;
    margin: 6px;
    text-align: center;
    font-size: 18px;
    color: black;
    transition-duration: 0.25s;
    font-weight: 300;
    border: 3px solid red;
    background-color: ${({theme}) => theme.colors.gray};
    @media (max-width: ${({theme}) => theme.mobile}) {
       height: 50px;
    }
  }
`;

const StyledLabel = styled.label`
      background-color: ${({theme}) => theme.colors.blue};
      color: ${({theme}) => theme.colors.white};
      text-align: center;
      justify-content: center;  
      transition: 0.2s ease-out all;
      font-size: 18px;
      height: 60px;
      width: 300px;
      margin: 6px;
      display: flex;
      text-decoration: none;
      align-items: center;
      @media (max-width: ${({theme}) => theme.mobile}) {
          height: 50px;
      }
`;

const Select = styled.select`
      width: 300px;
      font-size: 18px;
      display: flex;
      text-decoration: none;
      justify-content: center;
      text-align: center;
      align-items: center;
      height: 60px;
      padding-left: 5px;
      border: none;
      margin: 6px;
      text-align-last:center;
      outline: none;
      color: black;
      background-color: ${({theme}) => theme.colors.gray};
      @media (max-width: ${({theme}) => theme.mobile}) {
          height: 50px;
      }
`;

const ErrorText = styled.p`
      text-align: right;
      align-items: center;
      color: red;
      font-weight: bold;
      margin-right: 20px;
`

const Heading = styled.h1`
     padding: 10px;
     color: ${({theme}) => theme.colors.blue};
     text-align: center;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     margin: 0 auto;
     width: 60vw;
     @media (max-width: ${({theme}) => theme.mobile}) {
        padding: 9rem 0 1rem;
        font-size: 26px;
        width: 100vw;
     }
`

const categories = ["Pieczywo", "Makaron, ryż, kasze",
    "Produkty sypkie, przyprawy", "Warzywa i owoce",
    "Mięso, ryby, owoce morza", "Nabiał", "Słodycze i przekąski", "Napoje"];

const units = ["sztuka", "litr", "kilogram"]

const AddItemForm2 = () => {

        // state = {
        //     name: "",
        //     category: "",
        //     unit: "",
        //     currentQuantity: "",
        //     minimalQuantity: "",
        //     maximalQuantity: "",
        // };
    const [values, setValues] = useState({name: "",category: "", unit:"",  currentQuantity: 0, minimalQuantity: 0, maximalQuantity:0})

        const handleInputChange = e => {
            const {name, value} = e.target
            setValues({...values, [name]: value})
        };

        const handleSubmitForm = () => {
            const {addItem} = this.props;
            addItem(values);
            setValues({name: "",category: "", unit:"",  currentQuantity: 0, minimalQuantity: 0, maximalQuantity:0})
        };


        const notify = (name) => {
            toast.success(`Succesfully added ${name}`, {
                position: toast.POSITION.TOP_CENTER
            });
        };

        return (
            <FormWrapper>
                <Heading>
                    <FormattedMessage id="add product"/>
                </Heading>
                <Formik
                    enableReinitialize
                    initialValues={values}
                    onSubmit={handleSubmitForm}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .min(2, "Too short, minimal 3 characters!")
                            .max(30, "Too long, maximal 3 characters!!")
                            .required("Required"),
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
                    })}>
                    {({values, errors, touched, handleBlur, isValid, dirty, isSubmitting}) => (
                        <Form autoComplete="off">
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    <FormattedMessage id="name"/>
                                </StyledLabel>
                                {errors.name && touched.name ?
                                    <>
                                        <StyledInputError
                                            onChange={handleInputChange}
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            placeholder=""
                                        />
                                    </>
                                    :
                                    <StyledInput
                                        onChange={handleInputChange}
                                        name="name"
                                        type="text"
                                        value={values.name}
                                        onBlur={handleBlur}
                                        placeholder=""
                                    />
                                }
                            </FormItem>
                            {errors.name && touched.name ?
                                <ErrorText>{errors.name}</ErrorText> : null
                            }
                            <FormItem>
                                <StyledLabel>
                                    <FormattedMessage id="choose category"/>
                                </StyledLabel>
                                <Select
                                    onChange={handleInputChange}
                                    name="category"
                                    value={values.category}
                                    onBlur={handleBlur}
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
                                </Select>
                            </FormItem>
                            {errors.category && touched.category ?
                                <ErrorText>{errors.category}</ErrorText> : null
                            }
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    <FormattedMessage id="choose unit"/>
                                </StyledLabel>
                                <Select
                                    onChange={handleInputChange}
                                    name="unit"
                                    onBlur={handleBlur}
                                    value={values.unit}
                                    placeholder=""
                                >
                                    <option value="Wybierz jednostkę..." label="Choose unit..."/>
                                    <option value="Sztuka" label="Piece"/>
                                    <option value="Litr" label="Liter"/>
                                    <option value="Kilogram" label="Kilogram"/>
                                </Select>
                            </FormItem>
                            {errors.unit && touched.unit ?
                                <ErrorText>{errors.unit}</ErrorText> : null
                            }
                            <FormItem>
                                <StyledLabel>
                                    <FormattedMessage id="maximal quanitity"/>
                                </StyledLabel>
                                {errors.maximalQuantity && touched.maximalQuantity ?
                                    <StyledInputError
                                        onChange={handleInputChange}
                                        name="maximalQuantity"
                                        type="number"
                                        onBlur={handleBlur}
                                        value={values.maximalQuantity}
                                        placeholder=""/>
                                    :
                                    <StyledInput
                                        onChange={handleInputChange}
                                        name="maximalQuantity"
                                        type="number"
                                        onBlur={handleBlur}
                                        value={values.maximalQuantity}
                                        placeholder=""/>
                                }
                            </FormItem>
                            {errors.maximalQuantity && touched.maximalQuantity ?
                                <ErrorText>{errors.maximalQuantity}</ErrorText> : null
                            }

                            <FormItem>
                                <StyledLabel htmlFor="minimalQuantity">
                                    <FormattedMessage id="minimal quantity"/>
                                </StyledLabel>
                                {errors.minimalQuantity && touched.minimalQuantity ?
                                    <StyledInputError
                                        onChange={handleInputChange}
                                        name="minimalQuantity"
                                        type="number"
                                        value={values.minimalQuantity}
                                        placeholder=""/>
                                    : <StyledInput
                                        onChange={handleInputChange}
                                        name="minimalQuantity"
                                        type="number"
                                        onBlur={handleBlur}
                                        value={values.minimalQuantity}
                                        placeholder=""/>
                                }
                            </FormItem>
                            {errors.minimalQuantity && touched.minimalQuantity ?
                                <ErrorText>{errors.minimalQuantity}</ErrorText> : null
                            }
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    <FormattedMessage id="current quantity"/>
                                </StyledLabel>
                                {errors.currentQuantity && touched.currentQuantity ?
                                    <StyledInputError
                                        onChange={handleInputChange}
                                        name="currentQuantity"
                                        type="number"
                                        onBlur={handleBlur}
                                        value={values.currentQuantity}
                                        placeholder=""/>
                                    :
                                    <StyledInput
                                        onChange={handleInputChange}
                                        name="currentQuantity"
                                        type="number"
                                        onBlur={handleBlur}
                                        value={values.currentQuantity}
                                        placeholder=""/>
                                }
                            </FormItem>
                            {errors.currentQuantity && touched.currentQuantity ?
                                <ErrorText>{errors.currentQuantity}</ErrorText> : null
                            }

                            <ButtonContainer>
                                <Link to="/register">
                                    <ButtonIcon
                                        icon={decline}
                                    />
                                </Link>
                                {isValid ?
                                    <ButtonIcon
                                        onClick={() => errors ? notify(values.name) : null}
                                        type="submit"
                                        icon={accept}
                                    />
                                    :
                                    <ButtonIcon
                                        icon={acceptDisabled}
                                    />
                                }
                            </ButtonContainer>
                            <ToastContainer autoClose={1400}/>
                        </Form>
                    )}
                </Formik>
            </FormWrapper>
        )
    }
;


export default AddItemForm2;



