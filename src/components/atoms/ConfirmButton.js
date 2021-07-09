import styled from "styled-components";

const ConfirmButton = styled.button`
  padding: 20px 30px;
  margin: 30px;
  outline: none;
  border: none;
  font-size: medium;
  font-weight: 600;
  letter-spacing: 5px;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.green};
  color: grey;
`;

export default ConfirmButton;
