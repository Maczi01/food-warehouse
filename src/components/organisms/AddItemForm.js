import React from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Formik} from 'formik';
import accept from '../../asstets/img/accept.svg'
import decline from '../../asstets/img/decline.svg'
import styled from "styled-components";
import ButtonIcon from "../atoms/ButtonIcon";
import {Link} from "react-router-dom";
import {FormattedMessage} from 'react-intl'
import {db} from '../../firebase/firebase'

const FormWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 60vw;
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
`
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
`
const StyledLabel = styled.label`
      background-color: ${({theme}) => theme.colors.blue};
      color: ${({theme}) => theme.colors.white};
      text-align: center;
      justify-content: center;  
      transition: 0.2s ease-out all;
      font-size: 18px;
      height: 70px;
      width: 300px;
      margin: 6px;
      display: flex;
      text-decoration: none;
      align-items: center;
      @media (max-width: ${({theme}) => theme.mobile}) {
          height: 50px;
      }
`
const Select = styled.select`
      width: 300px;
      font-size: 18px;
      display: flex;
      text-decoration: none;
      justify-content: center;
      text-align: center;
      align-items: center;
      height: 70px;
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

class AddItemForm extends React.Component {

    state = {
        id: "",
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
        const {addItem, checkName} = this.props
        // checkName(this.state.name);
        addItem(this.state);
        this.setState({
            id: 0,
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
                    initialValues={{
                        name: '',
                        category: '',
                        unit: '',
                        currentQuantity: 0,
                        minimalQuantity: '',
                        maximalQuantity: ''
                    }}
                    onSubmit={this.handleSubmitForm}>
                    {() => (
                        <Form autoComplete="off">
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    <FormattedMessage id="name"/>
                                </StyledLabel>
                                <StyledInput
                                    onChange={this.handleInputChange}
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    placeholder=""/>
                            </FormItem>
                            <FormItem>
                                <StyledLabel>
                                    <FormattedMessage id="choose category"/>

                                </StyledLabel>
                                <Select
                                    onChange={this.handleInputChange}
                                    name="category"
                                    value={this.state.category}
                                    placeholder=""
                                >
                                    <option label="Choose category..." value="Choose category"/>
                                    <option label="pasta, rice, groats" value="pasta, rice, groats"/>
                                    <option label="loose products, spieces" value="loose products, spieces"/>
                                    <option label="baking" value="baking"/>
                                    <option label="vegetables and fruits" value="vegetables and fruits"/>
                                    <option label="meat, fiches, seafood" value="meat, fishes, seafood"/>
                                    <option label="dairy" value="dairy"/>
                                    <option label="sweets and snacks" value="sweets and snacks"/>
                                    <option label="bevegares" value="bevegares"/>
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
                                    value={this.state.unit}
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
                                <StyledInput
                                    onChange={this.handleInputChange}
                                    name="currentQuantity"
                                    type="number"
                                    value={this.state.currentQuantity}
                                    placeholder=""/>
                            </FormItem>
                            <FormItem>
                                <StyledLabel htmlFor="minimalQuantity">
                                    <FormattedMessage id="minimal quantity"/>
                                </StyledLabel>
                                <StyledInput
                                    onChange={this.handleInputChange}
                                    name="minimalQuantity"
                                    type="number"
                                    value={this.state.minimalQuantity}
                                    placeholder=""/>
                            </FormItem>
                            <FormItem>
                                <StyledLabel>
                                    <FormattedMessage id="maximal quanitity"/>
                                </StyledLabel>
                                <StyledInput
                                    onChange={this.handleInputChange}
                                    name="maximalQuantity"
                                    type="number"
                                    value={this.state.maximalQuantity}
                                    placeholder=""/>
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



