import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import eyeclosed from "../../asstets/img/eyeclosed.svg"
import eyeopen from "../../asstets/img/eyeopen.svg"
import StyledTitle from "../atoms/auth/StyledTitle";
import StyledInput from "../atoms/auth/StyledInput";
import PasswordWrapper from "../atoms/auth/PasswordWrapper";
import StyledPassword from "../atoms/auth/StyledPassword";
import FormIcon from "../atoms/auth/FormIcon";
import ItemsContainer from "../atoms/auth/ItemsContainer";
import Form from "../atoms/auth/Form";
import ConfirmButton from "../atoms/auth/ConfirmButton";
import Paragraph from "../atoms/auth/Paragraph";

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