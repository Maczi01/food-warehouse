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
import {db} from '../../firebase/firebaseConfig'

const categories = ["Pieczywo", "Makaron, ryż, kasze",
    "Produkty sypkie, przyprawy", "Warzywa i owoce",
    "Mięso, ryby, owoce morza", "Nabiał", "Słodycze i przekąski", "Napoje"];

const units = ["sztuka", "litr", "kilogram"]

class EditItemForm extends React.Component {

    state = {
        id: this.props.item.id,
        name: this.props.item.name,
        category: this.props.item.category,
        currentQuantity: this.props.item.currentQuantity,
        minimalQuantity: this.props.item.minimalQuantity,
        maximalQuantity: this.props.item.maximalQuantity,
        unit: this.props.item.unit,
    };

    notify = (name) => {
        toast.success(`Succesfully edited ${name}`, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmitForm = () => {
        const {editItem} = this.props
        editItem(this.state);
    };

    render() {
        return (
            <FormWrapper>
                <Heading>
                    <FormattedMessage id="edit product"/>
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


export default EditItemForm;



