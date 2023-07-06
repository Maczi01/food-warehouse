import {Typography} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { categories } from '../../../shared/utils/item-properties';
import { routes } from '../../../shared/utils/routes';
import { GridWrapper, Heading, Icon, IconWrapper } from './flter-view.styled';

const FilterViewComponent = () => (
  <>
    <Heading>
      <FormattedMessage id="INVENTORY.HEADER.WHAT_IN_INVENTORY" />
    </Heading>
    <GridWrapper>
      {categories.map((category) => (
        <IconWrapper
          key={category.name}
          as={Link}
          to={routes.inventory.category.url(category.name)}
          data-testid={category.id}
        >
          <Icon src={category.icon} />
          <Typography paragraph={true}>
            <FormattedMessage id={category.translationKey} />
          </Typography>
        </IconWrapper>
      ))}
    </GridWrapper>
  </>
);

export default FilterViewComponent;
