import React from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Formik} from 'formik';
import accept from '../../asstets/img/accept.svg'
import decline from '../../asstets/img/decline.svg'
import styled from "styled-components";
import ButtonIcon from "../ButtonIcon";
import {Link} from "react-router-dom";

const FormWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 60vw;
`;

const ButtonContainer = styled.div`
      margin: 20px 0 20px 0;
      display: flex;
      justify-content: flex-end
`

const FormItem = styled.div`
      width: 100%;
      display: flex;
      //position: relative;
      //flex-shrink: 0;
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

    // &:focus{
    //       width: 300px;
    //
    //   background-color: #bcffb8;
    // }
    //
    // &:focus{
    //   width: 300px;
    //       background-color: ${({theme}) => theme.colors.gray};

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
  `

const Heading = styled.h1`
     //margin-top: 30px;
      color: ${({theme}) => theme.colors.blue};
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      padding: 10px;

      //width: 75vw;
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
        const {addItem} = this.props
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

    notify = () => {
        toast.success("Dodano", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    render() {
        return (
            <FormWrapper>
                <Heading>Dodaj produkt</Heading>
                <Formik
                    initialValues={{
                        name: '',
                        category: '',
                        unit: '',
                        currentQuantity: 0,
                        minimalQuantity: '',
                        maximalQuantity: ''
                    }}
                    onSubmit={this.handleSubmitForm}
                >
                    {() => (
                        <Form autoComplete="off">
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    Nazwa produktu
                                </StyledLabel>
                                <StyledInput
                                    onChange={this.handleInputChange}
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    placeholder=""/>
                            </FormItem>
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    Kategoria
                                </StyledLabel>
                                <Select
                                    onChange={this.handleInputChange}
                                    name="category"
                                    value={this.state.category}
                                    placeholder=""
                                >
                                    <option label="Wybierz kategorię..." value="Wybierz kategorię..."/>
                                    <option label="Makaron ryż, kasze" value="Makaron ryż, kasze"/>
                                    <option label="Produkty sypkie, przyprawy" value="Produkty sypkie, przyprawy"/>
                                    <option label="Pieczywo" value="Pieczywo"/>
                                    <option label="Warzywa i owoce" value="Warzywa i owoce"/>
                                    <option label="Mięso, ryby, owoce morza" value="Mięso, ryby, owoce morza"/>
                                    <option label="Nabiał" value="Nabiał"/>
                                    <option label="Słodycze i przekąski" value="Słodycze i przekąski"/>
                                    <option label="Napoje" value="Napoje"/>
                                </Select>
                            </FormItem>
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    Jednostka
                                </StyledLabel>
                                <Select
                                    onChange={this.handleInputChange}
                                    name="unit"
                                    value={this.state.unit}
                                    placeholder=""
                                >
                                    <option value="Wybierz jednostkę..." label=""/>
                                    <option value="Sztuka" label="Sztuka"/>
                                    <option value="Litr" label="Litr"/>
                                    <option value="Kilogram" label="Kilogram"/>
                                </Select>
                            </FormItem>
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    Ilość w spiżarni
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
                                    Ilość minimalna
                                </StyledLabel>
                                <StyledInput
                                    onChange={this.handleInputChange}
                                    name="minimalQuantity"
                                    type="number"
                                    value={this.state.minimalQuantity}
                                    placeholder=""/>
                            </FormItem>
                            <FormItem>
                                <StyledLabel htmlFor="maximalQuantity">
                                    Ilość maksymalna
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
                            <ToastContainer autoClose={1200}/>
                        </Form>
                    )}
                </Formik>
            </FormWrapper>
        )
    }
}
;


export default AddItemForm;



