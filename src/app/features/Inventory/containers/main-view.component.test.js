import { render } from '@testing-library/react';
import { useParams } from 'react-router-dom';

import { useInventory } from '../../../services/inventory.hook';
import MainViewComponent from './main-view.component';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../../services/inventory.hook', () => ({
  useInventory: jest.fn(),
}));

jest.mock('../components/list.component', () => ({
  __esModule: true,
  default: ({ items }) => (
    <div data-testid="list-component">
      <div data-testid={items.length ? 'list-component-is-not-empty' : 'list-component-is-empty'} />
    </div>
  ),
}));

jest.mock('./main-view.styled', () => ({
  Heading: () => <div />,
}));

describe('MainView component', () => {
  it.each([
    {
      categoryName: 'expected-category-name',
      param: 'expected-category-name',
      searchElementId: 'list-component-is-not-empty',
      result: true,
    },
    {
      categoryName: 'expected-category-name',
      param: 'different-than-category-name-param-name',
      searchElementId: 'list-component-is-empty',
      result: true,
    },
  ])(
    'for given ($categoryName) and ($param) should return ($result)',
    async ({ categoryName, param, result, searchElementId }) => {
      const exampleParams = { parameter: param };
      const exampleStore = {
        state: {
          inventory: [
            {
              category: categoryName,
            },
          ],
        },
        getForCurrentUser: () => {},
      };
      useInventory.mockReturnValue(exampleStore);
      useParams.mockReturnValue(exampleParams);
      // jest.spyOn(List, 'default').mockImplementation(({ items }) => (
      //     <div data-testid="list-component">
      //       <div data-testid={items.length ? 'list-component-is-not-empty' : 'list-component-is-empty'} />
      //     </div>
      // ))

      const { findByTestId } = await render(<MainViewComponent />);
      const listComponentIsNotEmpty = await findByTestId(searchElementId);

      expect(!!listComponentIsNotEmpty).toBe(result);
    }
  );
});
