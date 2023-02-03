import styled from 'styled-components';

const FormItem = styled.div`
      width: 100%;
      display: flex;
         @media (max-width: ${({ theme }) => theme.mobile}) {
          flex-direction: column;
          border: 1px solid   ${({ theme }) => theme.colors.darkblue});
      }
`;

export default FormItem;
