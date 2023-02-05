import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { useStoppingListStore } from '../../../services/shopping-list.store';
import StyledTr from './styled-tr.component';

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

const Table = ({ data }) => {
  const { toggleItem } = useStoppingListStore();

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
              <FormattedMessage id="SHOPPING_LIST.TABLE.NAME" />
            </th>
            <th>
              <FormattedMessage id="SHOPPING_LIST.TABLE.QUANTITY" />
            </th>
            <th>
              <FormattedMessage id="SHOPPING_LIST.TABLE.UNIT" />
            </th>
            <th>Purchased</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length &&
            data.map((item, index) => (
              <StyledTr key={item.id} item={item} index={index} setItemAsChecked={toggleItem} />
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
