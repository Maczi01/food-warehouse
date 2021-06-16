import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import eyeclosed from "../../assets/img/eyeclosed.svg"
import eyeopen from "../../assets/img/eyeopen.svg"
import StyledTitle from "../atoms/StyledTitle";
import StyledInput from "../atoms/StyledInput";
import PasswordWrapper from "../atoms/PasswordWrapper";
import StyledPassword from "../atoms/StyledPassword";
import FormIcon from "../atoms/FormIcon";
import ItemsContainer from "../atoms/ItemsContainer";
import Form from "../atoms/Form";
import ConfirmButton from "../atoms/ConfirmButton";
import Paragraph from "../atoms/Paragraph";

const RegisterForm = ({handleRegister}) => {
    const [type, setType] = useState(false);
    return (
        <>
            <StyledTitle>
                <FormattedMessage id="register"/>
            </StyledTitle>
            <Paragraph>
                <FormattedMessage id="sign up account"/>
            </Paragraph>
            <ItemsContainer>
                <Form
                    onSubmit={handleRegister}
                    autocomplete="off">
                    <StyledInput
                        type="email"
                        name="email"
                        placeholder="Email"

                    />
                    <PasswordWrapper>
                        <StyledPassword type={type ? "text" : "password"} name="password" placeholder="Password"/>
                        <FormIcon
                            onClick={() => setType(!type)}
                            src={type ? eyeclosed : eyeopen}/>
                    </PasswordWrapper>
                    <ConfirmButton>
                        <FormattedMessage id="sign up"/>
                    </ConfirmButton>
                </Form>
                <Paragraph>
                    <FormattedMessage id="have account"/>
                    <Link to="/login">
                        <FormattedMessage id="log in"/>
                    </Link>
                </Paragraph>
            </ItemsContainer>
        </>
    );
}
export default RegisterForm;