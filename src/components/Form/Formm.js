import React from 'react'
import AppContext from "../../context/context";
import {v4 as uuidv4} from 'uuid';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Formik, Form} from 'formik';
import accept from '../../asstets/img/accept.svg'
import decline from '../../asstets/img/decline.svg'
import styled from "styled-components";
import ButtonIcon from "../ButtonIcon";

const FormWrapper = styled.div`
      //padding: 70px 80px 50px;
      //top: 50%;
      //transform: translateY(-50%);
      //left: 0;
      //right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 60vw;
      //height: 90vh;
      //position: fixed;
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
      font-size: 16px;
      height: 70px;
      width: 300px;
      margin: 6px;
      display: flex;
      text-decoration: none;
      align-items: center;
`


class Formm extends React.Component {

    state = {
        id: "",
        name: "",
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

    };

    notify = () => {
        toast.success("Dodano", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    render() {
        return (
            <FormWrapper>
                <h3>Dodaj nowy produkt</h3>
                <Formik
                    initialValues={{name: 'xxx', currentQuantity: '', minimalQuantity: '', maximalQuantity: ''}}
                    onSubmit={this.handleSubmitForm}
                >
                    {() => (
                        <Form>
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
                                <StyledInput/>
                            </FormItem>
                            <FormItem>
                                <StyledLabel htmlFor="currentQuantity">
                                    Jednostka
                                </StyledLabel>
                                <StyledInput/>
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
                                <ButtonIcon
                                    icon={decline}
                                />
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


export default Formm;



