import React from 'react'
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

const ErrorContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
`

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

const InputError = styled.span`
      width: 100px;
      height: 30px;
      z-index: 15;
      background-color: #e62163;
      color: white;
`;

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

class AddItemForm extends React.Component {

    state = {
        name: "",
        category: "",
        unit: "",
        currentQuantity: "",
        minimalQuantity: "",
        maximalQuantity: "",
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmitForm = () => {
        const {addItem} = this.props;
        addItem(this.state);
        this.setState({
            name: "",
            category: '',
            unit: "",
            currentQuantity: "",
            minimalQuantity: "",
            maximalQuantity: "",
        });
    };


    notify = (name) => {
        toast.success(`Succesfully added ${name}`, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    render() {
        return (
            <FormWrapper>
                <Heading>
                    <FormattedMessage id="add product"/>
                </Heading>
                <Formik
                    enableReinitialize
                    initialValues={{...this.state}}
                    onSubmit={this.handleSubmitForm}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .min(2, "Too short!")
                            .max(30, "Too long!")
                            .required("Required"),
                        currentQuantity: Yup.number()
                            .positive("Only positive number!")
                            .max(10)
                            .required("Required"),
                        minimalQuantity: Yup.number()
                            .positive("Only positive number!")
                            .max(10)
                            .required("Required"),
                        maximalQuantity: Yup.number()
                            .positive("Only positive number!")
                            .min(10)
                            .required("Required"),
                    })}>
                    {({values, errors, touched, handleBlur}) => (
                        <Form autoComplete="off">
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    <FormattedMessage id="name"/>
                                </StyledLabel>
                                {errors.name && touched.name ?
                                    <>
                                        <StyledInputError
                                            onChange={this.handleInputChange}
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            placeholder=""
                                        />
                                        {/*<InputError>Too short!</InputError>*/}
                                    </>
                                    :
                                    <StyledInput
                                        onChange={this.handleInputChange}
                                        name="name"
                                        type="text"
                                        value={values.name}
                                        onBlur={handleBlur}
                                        placeholder=""
                                    />
                                }
                            </FormItem>
                            <FormItem>
                                <StyledLabel>
                                    <FormattedMessage id="choose category"/>
                                </StyledLabel>
                                <Select
                                    onChange={this.handleInputChange}
                                    name="category"
                                    value={values.category}
                                    onBlur={handleBlur}
                                    placeholder=""
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
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    <FormattedMessage id="choose unit"/>
                                </StyledLabel>
                                <Select
                                    onChange={this.handleInputChange}
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
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    <FormattedMessage id="current quantity"/>
                                </StyledLabel>
                                {errors.currentQuantity && touched.currentQuantity ?
                                    <StyledInputError
                                        onChange={this.handleInputChange}
                                        name="currentQuantity"
                                        type="number"
                                        onBlur={handleBlur}
                                        value={values.currentQuantity}
                                        placeholder=""/>
                                    :
                                    <StyledInput
                                        onChange={this.handleInputChange}
                                        name="currentQuantity"
                                        type="number"
                                        onBlur={handleBlur}
                                        value={values.currentQuantity}
                                        placeholder=""/>
                                }
                            </FormItem>
                            <FormItem>
                                <StyledLabel htmlFor="minimalQuantity">
                                    <FormattedMessage id="minimal quantity"/>
                                </StyledLabel>
                                {errors.minimalQuantity && touched.minimalQuantity ?
                                    <StyledInputError
                                        onChange={this.handleInputChange}
                                        name="minimalQuantity"
                                        type="number"
                                        // onBlur={handleBlur}
                                        value={values.minimalQuantity}
                                        placeholder=""/>
                                    : <StyledInput
                                        onChange={this.handleInputChange}
                                        name="minimalQuantity"
                                        type="number"
                                        onBlur={handleBlur}
                                        value={values.minimalQuantity}
                                        placeholder=""/>
                                }

                            </FormItem>
                            <FormItem>
                                <StyledLabel>
                                    <FormattedMessage id="maximal quanitity"/>
                                </StyledLabel>

                                {errors.maximalQuantity && touched.maximalQuantity ?
                                    <StyledInputError
                                        onChange={this.handleInputChange}
                                        name="maximalQuantity"
                                        type="number"
                                        onBlur={handleBlur}
                                        value={values.maximalQuantity}
                                        placeholder=""/>
                                    :
                                    <StyledInput
                                        onChange={this.handleInputChange}
                                        name="maximalQuantity"
                                        type="number"
                                        onBlur={handleBlur}
                                        value={values.maximalQuantity}
                                        placeholder=""/>
                                }
                            </FormItem>
                            <ButtonContainer>
                                <Link to="/register">
                                    <ButtonIcon
                                        icon={decline}
                                    />
                                </Link>
                                <ButtonIcon
                                    onClick={() => this.notify(this.state.name)}
                                    type="submit"
                                    icon={accept}
                                />
                            </ButtonContainer>
                            <ToastContainer autoClose={1400}/>
                        </Form>
                    )}
                </Formik>
            </FormWrapper>

        )
    }
}
;


export default AddItemForm;



