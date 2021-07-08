import React, { useContext, useState } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import StyledTr from "../molecules/StyledTr";
import { AppContext } from "../../context/context";

const templateParams = {
  name: "James",
  notes: "Check this out!",
};

const sendMail = () => {
  console.log("clicked");
  emailjs.init("mateusz_w_twardy_gmail_com");
  emailjs
    .send("mateusz_w_twardy_gmail_com", "template_cGuzq0Bv", templateParams)
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
};

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
  }
`;
const StyledTable = styled.table`
  padding-top: 15px;
  margin: 20px;
  border: none;
  border-collapse: collapse;
  border-radius: 20px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 0 auto;
  }
  td,
  th {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      padding: 20px 20px;
    }
    border: none;
    padding: 20px 50px;
    color: ${({ theme }) => theme.colors.white};
    border-top: 1px solid ${({ theme }) => theme.colors.blue};
  }
  td {
    padding: 20px 50px;
    vertical-align: top;
    color: black;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      padding: 20px 20px;
    }
  }
  thead > tr {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;
const ButtonContainer = styled.div`
  margin: 20px 20px 20px 0;
  display: flex;
  justify-content: flex-end;
`;

const Table = ({ data }) => {
  const { setItemAsChecked } = useContext(AppContext);

  const [list, setList] = useState(data);

  const jsPdfGenerator = () => {
    const doc = new jsPDF("p", "pt");
    doc.setFont("courier");
    const name = <FormattedMessage id="name" />;
    const quantity = <FormattedMessage id="quantity" />;
    const unit = <FormattedMessage id="unit" />;
    doc.text(220, 30, "Shopping list");
    const rows = [];

    data.map((item, index) =>
      rows.push([index + 1, item.name, item.maximalQuantity, item.unit])
    );
    doc.autoTable({
      head: [["Index", "Name", "Quantity", "Unit"]],
      body: rows,
    });
    doc.save("generated.pdf");
  };

  const notify = () => {
    toast.success(`File with list succesfully saved`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <TableWrapper>
      <StyledTable>
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="name" />
            </th>
            <th>
              <FormattedMessage id="quantity" />
            </th>
            <th>
              <FormattedMessage id="unit" />
            </th>
            <th>Purchased</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <StyledTr
              key={item.id}
              item={item}
              index={index}
              setItemAsChecked={setItemAsChecked}
            />
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

Table.propTypes = {
  data: PropTypes.array,
};

Table.defaultProps = {
  data: [],
};

export default Table;
