import React, { useContext, useState } from "react";
import { AppContext } from "../context/context";
import "react-toastify/dist/ReactToastify.css";
import bag from "../assets/img/bag.svg";
import styled from "styled-components";
import Table from "../components/organisms/Table";
import { FormattedMessage } from "react-intl";
import MainTemplate from "../components/templates/MainTemplate";
import AddShopModal from "../components/organisms/AddShopModal";
import ButtonIcon from "../components/atoms/ButtonIcon";
import plus from "../assets/img/plus.svg";
import pdf from "../assets/img/pdf.svg";
import sms from "../assets/img/sms.svg";
import { toast, ToastContainer } from "react-toastify";
import remove from "../assets/img/remove.svg";
import generate from "../assets/img/generate.svg";
import { generatePdf } from "../utills/generatePdf";

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 80vw;
  font-size: 14px;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
  }
`;

const Heading = styled.h1`
  padding: 12px;
  color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 60vw;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 9rem 0 1rem;
    font-size: 26px;
    width: 100vw;
  }
`;

const ButtonContainer = styled.div`
  margin: 10px 20px 20px 0;
  display: flex;
  justify-content: flex-end;
`;

const Image = styled.img`
  margin: 5px;
  width: 150px;
  height: 150px;
`;

const ShoppingListView = () => {
  const {
    shoppingList,
    addItemToShoppingList,
    generateShoppingList,
    deleteShoppingList,
  } = useContext(AppContext);

  const [showAddShopModal, setShowAddShopModal] = useState(false);

  const notify = () => {
    toast.success(<FormattedMessage id="pdf saved" />, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <MainTemplate>
      {showAddShopModal && (
        <AddShopModal
          setShowAddShopModal={setShowAddShopModal}
          addItemToShoppingList={addItemToShoppingList}
        />
      )}
      <Heading>
        <FormattedMessage id="shopping list" />
      </Heading>
      <TableWrapper>
        <Image src={bag} alt="shopping bag" />
        <ButtonContainer>
          <ButtonIcon
            onClick={() => setShowAddShopModal((prev) => !prev)}
            icon={plus}
          />
          <ButtonIcon
            onClick={() => {
              generatePdf(shoppingList);
              notify();
            }}
            icon={pdf}
          />
          <ButtonIcon onClick={generateShoppingList} icon={generate} />
          <ButtonIcon onClick={generateShoppingList} icon={sms} />
          <ButtonIcon onClick={deleteShoppingList} icon={remove} />
        </ButtonContainer>
        {shoppingList.length ? (
          <Table data={shoppingList} />
        ) : (
          <span>
            <FormattedMessage id="empty list" />
          </span>
        )}
        <ToastContainer autoClose={1400} />
      </TableWrapper>
    </MainTemplate>
  );
};

export default ShoppingListView;
