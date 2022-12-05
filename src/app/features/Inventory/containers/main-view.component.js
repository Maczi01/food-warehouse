import React, { useContext } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import List from "../components/list.component";
import { AppContext } from "../../../../context/context";

const Heading = styled.h1`
  padding: 10px;
  color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 75vw;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 9rem 0 1rem;
    font-size: 26px;
    width: 100vw;
  }
`;

const MainViewComponent = ({ match }) => {
  const parameter = match.params.parameter;
  const { foodList } = useContext(AppContext);
  const newFoodList =
    parameter === "all"
      ? foodList
      : foodList.filter((item) => item.category === parameter);
  return (
    <>
      <Heading>
        <FormattedMessage id="what in inventory" />
      </Heading>
      <List items={newFoodList} parameter={parameter} />
    </>
  );
};

export default MainViewComponent;