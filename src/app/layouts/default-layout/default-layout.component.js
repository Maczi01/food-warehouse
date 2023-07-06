import {Box} from '@mui/material';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {useAuth} from '../../shared/utils/auth';
import Footer from './components/footer.component';
import Navbar from './components/navbar.component';

// TODO delete styled component
// const ViewWrapper = styled.div`
//   width: 80vw;
//   height: 600px;
//   margin: 0 auto 70px auto;
//   display: flex;
//   flex-direction: column;
//
//   @media (max-width: ${({theme}) => theme.mobile}) {
//     width: 100vw;
//   }
// `;

const DefaultLayout = ({children}) => {
    const {auth} = useAuth();
    const signOut = () => auth.signOut();
    return (
        <>
            <Navbar signOut={signOut}/>
            <Box sx={{
                width: "80vw",
                height: "600px",
                margin: "0 auto 70px auto",
                display: "flex",
                flexDirection: "column",
                marginTop: '70px'
                // TODO handle width
                // maxWidth: {
                //     md: "100vw",
                // }
            }}>{children}</Box>
            <Footer/>
        </>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
