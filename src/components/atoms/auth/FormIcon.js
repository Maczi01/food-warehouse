import styled from "styled-components";

const FormIcon = styled.img`
    justify-content: center;
    margin: 0;
    width: 20px;
    height: 20px;
    transition: all .6s ease 0s; 
    :active {
      transform: scale(0.95);
    }
      @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100px;
        height: 100px;
     }
`;


export default FormIcon;