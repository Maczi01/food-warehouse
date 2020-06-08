import React from "react";
import styled from "styled-components";
import ButtonIcon from "../atoms/ButtonIcon";
import pdf from "../../asstets/img/pdf.svg";
import sms from "../../asstets/img/sms.svg";
import plus from "../../asstets/img/plus.svg";
import emailjs from 'emailjs-com';
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import Menu from "./Menu";
import {Doc} from "./Doc";


const templateParams = {
    name: 'James',
    notes: 'Check this out!'
};
const sendMail = () => {
    console.log("clicked")
    emailjs.init("mateusz_w_twardy_gmail_com");
    emailjs.send('mateusz_w_twardy_gmail_com', 'template_cGuzq0Bv', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });

}

const TableWrapper = styled.div`
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin: 0 auto;
      width: 40vw;
      @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
      }
`;
const StyledTable = styled.table`
  padding-top: 15px;
  margin: 20px;
  border: none;
  border-collapse: collapse;
  border-radius: 20px;
  @media (max-width: ${({theme}) => theme.mobile}) {
      margin: 0 auto;
  }
  td,
  th {
  @media (max-width: ${({theme}) => theme.mobile}) {
      padding: 20px 20px;
  }
      border: none;
      padding: 20px 50px;
      color: ${({theme}) => theme.colors.white};
      border-top: 1px solid ${({theme}) => theme.colors.blue}
  }
  td {
     padding: 20px 50px;
     vertical-align: top;
     color: black;
     @media (max-width: ${({theme}) => theme.mobile}) {
        padding: 20px 20px;
     }
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
      margin: 20px 20px 20px 0;
      display: flex;
      justify-content: flex-end;
`


const Table = ({data}) => {
    return (
        <>
            <TableWrapper>
                <Doc/>
                <StyledTable>
                    <colgroup>
                        <col/>
                        <col/>
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <FormattedMessage id="name"/>
                        </th>
                        <th>
                            <FormattedMessage id="quantity"/>
                        </th>
                        <th>
                            <FormattedMessage id="unit"/>
                        </th>
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
                        onClick={() => sendMail()}
                        icon={plus}
                    />
                    <Doc
                        icon={pdf}
                    />
                    <ButtonIcon
                        onClick={() => sendMail()}
                        icon={sms}
                    />
                </ButtonContainer>
            </TableWrapper>
        </>
    )
}


Table.propTypes = {
    data: PropTypes.array,
}

Table.defaultProps = {
    data: [],
}

export default Table;
