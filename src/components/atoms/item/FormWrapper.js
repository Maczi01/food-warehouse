import styled from "styled-components";

const FormWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 50vw;
      @media (max-width: ${({theme}) => theme.mobile}) {
        width: 40vw;
     }
`;

export default FormWrapper;