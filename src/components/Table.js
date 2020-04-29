import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import print from "../asstets/img/print.svg";
import sms from "../asstets/img/sms.svg";
import emailjs from 'emailjs-com';

var templateParams = {
    name: 'James',
    notes: 'Check this out!'
};



const sendMail = () =>{
    console.log("clicked")
    emailjs.init("mateusz_w_twardy_gmail_com");
    emailjs.send('mateusz_w_twardy_gmail_com', 'template_cGuzq0Bv', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });

}
const TableWrapper = styled.div`
      display: flex;
      justify-content: center;
      //align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 40vw;
`;


const StyledTable = styled.table`
  margin: 20px;
  border: none;
  border-collapse: collapse;
  border-radius: 20px;
  td,
  th {
        border: none;
        padding: 20px 50px;
        color: ${({theme}) => theme.colors.white};
        border-top: 1px solid ${({theme}) => theme.colors.blue}
  }
  td {
    padding: 20px 50px;
    vertical-align: top;
          color: black;

  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: ${({theme}) => theme.colors.white};
      color: black;
    }
    :hover {
      background-color: ${({theme}) => theme.colors.green};
    }
  }
  thead > tr {
          background-color: ${({theme}) => theme.colors.blue};;
  }
`;

const ButtonContainer = styled.div`
      margin: 20px 0 20px 0;
      display: flex;
      justify-content: flex-end;
`




const TableMarkup = ({data}) => (
    <TableWrapper>
        <StyledTable>
            <colgroup>
                <col/>
                <col/>
                <col/>
            </colgroup>
            <thead>
            <tr>
                <th>#</th>
                <th>Nazwa</th>
                <th>Ilość</th>
                <th>Jednostka</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.maximalQuantity - item.currentQuantity}</td>
                    <td>{item.unit}</td>
                </tr>
            ))}
            </tbody>
        </StyledTable>
        <ButtonContainer>
            <ButtonIcon
                icon={print}
            />
            <ButtonIcon
                onClick={() =>sendMail()}
                icon={sms}
            />
        </ButtonContainer>
    </TableWrapper>
);

export default TableMarkup;
