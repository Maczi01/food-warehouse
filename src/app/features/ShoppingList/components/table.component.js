import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useStoppingListStore } from '../../../services/shopping-list.store';
import StyledTr from './styled-tr.component';
import { StyledTable, TableWrapper } from './table.styled';

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
