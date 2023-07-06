import { Box } from '@mui/material';
import { styled } from '@mui/system';
// import styled from 'styled-components';

// const FormWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   margin: 0 auto;
//   @media (max-width: ${({ theme }) => theme.mobile}) {
//     width: 100vw;
//   }
// `;


// TODO styled, ale innego typu (MUI)
const FormWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '0 auto',
    '@media (max-width: ${({theme}) => theme.mobile})': {
        width: '100vw',
    }
});


// TODO to nie zadziaa w ted sposób, chyba, zadeklarujemy children
// moze warto stworzy wlasny komponent?
// const FormWrapper = () => {
//     return <Box sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'column',
//         margin: '0 auto',
//         '@media (max-width: ${({theme}) => theme.mobile})': {
//             width: '100vw',
//         }
//     }}/>
// }

export default FormWrapper;
