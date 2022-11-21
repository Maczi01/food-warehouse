import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

import eyeclosed from "../../../shared/assets/icons/eyeclosed.svg"
import eyeopen from "../../../shared/assets/icons/eyeopen.svg"
import StyledTitleComponent from "./styled-title.component";
import {PasswordWrapper, StyledPassword, StyledInputAuth} from "../../../shared/ui/Input";
import {FormIcon, Form} from "../../../shared/ui/Form";
import ItemsContainerComponent from "./items-container.component";
import {ConfirmButton} from "../../../shared/ui/Button";
import {Paragraph} from "../../../shared/ui/Paragraph";

const RegisterForm = ({handleRegister, removeBorder, error}) => {
    const [type, setType] = useState(false);
    return (
        <>
            <StyledTitleComponent>
                <FormattedMessage id="register"/>
            </StyledTitleComponent>
            <Paragraph>
                <FormattedMessage id="sign up account"/>
            </Paragraph>
            <ItemsContainerComponent>
                <Form
                    onSubmit={handleRegister}
                    autocomplete="off">
                    <StyledInputAuth
                        onFocus={removeBorder}
                        error={error}
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <PasswordWrapper>
                        <StyledPassword
                            onFocus={removeBorder}
                            error={error}
                            type={type ? "text" : "password"}
                            name="password"
                            placeholder="Password"/>
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
            </ItemsContainerComponent>
        </>
    );
}
export default RegisterForm;
