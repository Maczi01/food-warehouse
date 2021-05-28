import styled from "styled-components";

const StyledPassword = styled.input`
    margin-bottom: 30px;
    padding: 2px 0;
    padding-bottom: 5px;
    width: 230px;
    background-color: transparent;
    border: ${({previousLoginAttemptFailed}) => previousLoginAttemptFailed ? "3px solid red" : "none"};
    outline: none;
    border-bottom: 1.5px solid;
    border-bottom-color: grey;
    font-weight: 700;
    color: ${({theme}) => theme.colors.blue};
    opacity: 0.55;
`

export default StyledPassword;