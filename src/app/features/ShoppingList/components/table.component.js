import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import StyledTr from './styled-tr.component';
import { StyledTable, TableWrapper } from './table.styled';

const Table = ({ data, onToggleItem }) => {
  const items = data && data.length ? data : [];

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
          {items.map((item, index) => (
            <StyledTr key={item.id} item={item} index={index} onToggle={onToggleItem} />
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onToggleItem: PropTypes.func.isRequired,
};

Table.defaultProps = {
  data: [],
};

export default Table;
