import styled from "styled-components";

const StyledInputAuth = styled.input`
  border: ${({ error }) => (error ? "3px solid red" : "none")};
  margin-bottom: 30px;
  padding: 2px 0;
  padding-bottom: 5px;
  width: 250px;
  background-color: transparent;
  outline: none;
  border-bottom: 1.5px solid;
  border-bottom-color: grey;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue};
  opacity: 0.55;
`;

export default StyledInputAuth;

