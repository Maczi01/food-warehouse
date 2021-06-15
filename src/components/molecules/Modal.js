import React from 'react';
import styled from 'styled-components';
import ButtonIcon from "../atoms/ButtonIcon";
import bag from '../../assets/img/bag.svg'
import plus from "../../assets/img/plus.svg";
import print from "../../assets/img/print.svg";
import accept from '../../assets/img/accept.svg'
import decline from '../../assets/img/decline.svg'
import {Link} from "react-router-dom";
import {Form} from "formik";
import {auth} from "../../firebase/firebaseConfig";
import {FormattedMessage} from "react-intl";

const StyledModalWrapper = styled.div`
  background-color: white;
  //padding: 10px;
  position: fixed;
  top:0;
  right: 0;
  width: 100vw;

  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: grayscale(1) blur(2px);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const StyledModalHeader = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: ${({theme}) => theme.colors.blue};;
//   border-radius: 10px 10px 0 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: black;
//   font-weight: bold;
//   font-size: 14px;
// `;

const StyledModalCard = styled.div`
  //width: 340px;
  height: 120px;
  //width: 30vw;
  //height: 40vh;
  background-color: white;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 30px 60px -5px hsla(0, 0%, 0%, 0.2);
  display: flex;
  justify-content: space-between;
  padding: 5px;
  flex-direction: column;
`;

const StyledContentModal = styled.div`
  width: 90%;
  padding: 20px;
`;

// const StyledTitle = styled.div`
//   text-align: center;
//   justify-content: center;
// `

const StyledTitle = styled.div`      
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const ButtonContainer = styled.div`
    //border-top: 1px solid lightgray;
      width: 100%;
      //margin: 20px 0 20px 0;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
`

const Button = styled.button`
    width: 170px;
    height: 50px;
    outline: none;
    border: none;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 5px;
    border-radius: 5px;
    cursor: pointer;
    background: ${({theme}) => theme.colors.pink};
    color: ${({theme}) => theme.colors.white};
`


// const Modal = ({closeModalFn, children, btn, title = "title"}) => (
const Modal = () => {


        return (
            <StyledModalWrapper>
                <StyledModalCard>
                    {/*<StyledModalHeader>*/}
                    {/*{title}*/}
                    <StyledTitle>
                        Remove?
                    </StyledTitle>
                    {/*</StyledModalHeader>*/}
                    {/*<StyledContentModal>*/}
                    <ButtonContainer>
                        <Button onClick={() => auth.signOut()}>
                            Cancel
                        </Button>
                        <Button onClick={() => auth.signOut()}>
                            Delete
                        </Button>
                    </ButtonContainer>
                    {/*</StyledContentModal>*/}
                    {/*{btn}*/}
                </StyledModalCard>
            </StyledModalWrapper>
        )
    }

;

export default Modal