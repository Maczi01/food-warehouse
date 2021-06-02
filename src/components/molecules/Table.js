import React from "react";
import styled from "styled-components";
import ButtonIcon from "../atoms/ButtonIcon";
import pdf from "../../asstets/img/pdf.svg";
import pdf__inactive from "../../asstets/img/pdf__inactive.svg";
import sms from "../../asstets/img/sms.svg";
import plus from "../../asstets/img/plus.svg";
import emailjs from 'emailjs-com';
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import Menu from "./Menu";
import {Doc} from "./Doc";
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable";
import {toast, ToastContainer} from "react-toastify";
import {Form} from "formik";
import remove from "../../asstets/img/remove.svg";


const templateParams = {
    name: 'James',
    notes: 'Check this out!'
};

const sendMail = () => {
    console.log("clicked");
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
      //width: 40vw;
      @media (max-width: ${({theme}) => theme.mobile}) {
        width: 80vw;
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
`;

const StyledButton = styled.img`
    margin: 0 30px;
    margin-bottom: 20px;
    height: 40px;
    width: 40px;
    justify-content: space-around;
    @media (max-width: ${({theme}) => theme.mobile}) {
        height: 30px;
        width: auto;
    }
`


const Table = ({data, setShowAddShopModal, deleteFromShoppingList}) => {

    const jsPdfGenerator = () => {
        const doc = new jsPDF('p', 'pt')
        doc.setFont('courier');
        const name = <FormattedMessage id="name"/>
        const quantity = <FormattedMessage id="quantity"/>
        const unit = <FormattedMessage id="unit"/>
        doc.text(220, 30, 'Shopping list');
        const rows = [];

        data.map((item, index) => rows.push([
            index + 1,
            item.name,
            item.maximalQuantity,
            item.unit]))
        ;
        doc.autoTable({
            head: [['Index'
                , 'Name'
                , 'Quantity'
                , 'Unit'
            ]],
            body: rows
        })
        doc.save("generated.pdf");
    }

    const notify = () => {
        toast.success(`File with list succesfully saved`, {
            position: toast.POSITION.TOP_CENTER
        });
    };


    return (
        <>
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
                            <td>
                                <StyledButton src={remove} onClick={() => deleteFromShoppingList(item.id)}/>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </StyledTable>

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
