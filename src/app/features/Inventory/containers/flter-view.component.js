import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { categories } from '../../../shared/utils/item-properties';
import { routes } from '../../../shared/utils/routes';

const GridWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    grid-column-gap: 0;
  }
`;

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

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 200px;
  margin: 20px 5px;
  align-items: center;
  animation: appear 0.3s ease;
  position: relative;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 5px;
    width: 150px;
  }

  @keyframes appear {
    0% {
      opacity: 0;
      top: 35px;
    }
    100% {
      opacity: 1;
      top: 0;
    }
  }
`;

const Paragraph = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.blue};
  ::first-letter {
    text-transform: uppercase;
  }
`;

const Icon = styled.img`
  justify-content: center;
  margin: 0;
  width: 150px;
  height: 150px;
  transition: all 0.6s ease 0s;
  :active {
    transform: scale(0.95);
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const FilterViewComponent = () => (
  <>
    <Heading>
      <FormattedMessage id={'INVENTORY.HEADER.WHAT_IN_INVENTORY'} />
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
          <Paragraph>
            <FormattedMessage id={category.translationKey} />
          </Paragraph>
        </IconWrapper>
      ))}
    </GridWrapper>
  </>
);

export default FilterViewComponent;
