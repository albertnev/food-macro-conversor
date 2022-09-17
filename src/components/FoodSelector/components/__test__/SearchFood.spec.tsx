import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMockJest from 'fetch-mock-jest';

import SearchFood from '../SearchFood';
import { databaseErrorCodes } from '../../../../constants/databaseErrorCodes';
import { renderComponent } from '../../../../testUtils/renderComponent';
import { sleep } from '../../../../testUtils/sleep';

const mockedFoodList = [
  {
    datasource: 'bedca',
    id: '2260',
    name: 'Cerdo, panceta, cruda',
  },
  {
    datasource: 'openfoodfacts',
    id: '8710445020878',
    imageUrl: 'http://images.com/test-image.png',
    name: 'Pan de Fibra y Sésamo',
  },
];

describe('Component SearchFood', () => {
  const defaultProps = {
    onSelect: jest.fn(),
  };

  const fetchedUrl = '/api/food/search';
  let mockedFetch: any;
  const mockSearchFetch = (
    mockedResponse: any = mockedFoodList,
    config: any = {},
  ) =>
    fetchMockJest.mock(
      new RegExp(fetchedUrl),
      { body: mockedResponse, status: 200, ...config },
      {
        delay: 300,
        overwriteRoutes: true,
      },
    );

  const renderWithProps = (props: any = {}) =>
    renderComponent(<SearchFood {...defaultProps} {...props} />);

  const typeInput = async (text: string) => {
    await userEvent.type(screen.getByTestId('input-control'), text);
    // Input has a debounce of 800ms, simulate it here to avoid reaching timeout limit in jest waitFor
    await sleep(800);
  };

  beforeEach(() => {
    mockedFetch = mockSearchFetch();
  });

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('search-food')).toBeInTheDocument();
    expect(screen.getByText('T_foodSearch')).toBeInTheDocument();
  });

  it('fetches for food after user types into the input', async () => {
    renderWithProps();
    await typeInput('test');
    expect(mockedFetch).not.toHaveFetched();

    await waitFor(() => {
      expect(mockedFetch).toHaveFetched();
      expect(mockedFetch.calls()[0][0]).toEqual(`${fetchedUrl}?text=test`);
    });
  });

  it('shows loader when is fetching data', async () => {
    renderWithProps();
    await typeInput('test');

    await waitFor(() => {
      expect(screen.getByTestId('small-loader')).toBeInTheDocument();
    });
  });

  it('shows provided foodList elements', () => {
    const foodList = [...mockedFoodList, { id: '22323', name: 'Test name' }];
    renderWithProps({
      foodList,
    });

    foodList.forEach((food) => {
      expect(screen.getByText(food.name)).toBeInTheDocument();
    });
  });

  it('shows "no results retrieved" message if response from service comes empty', async () => {
    fetchMockJest.mockClear();
    renderWithProps();
    mockSearchFetch([]);

    await typeInput('test');
    await waitFor(() => {
      expect(screen.getByText('T_noResultsRetrieved')).toBeInTheDocument();
      expect(screen.getByText('T_tryAnotherSearch')).toBeInTheDocument();
    });
  });

  it('shows an information notification if BEDCA database returns an error', async () => {
    fetchMockJest.mockClear();
    renderWithProps();
    mockSearchFetch(undefined, { status: databaseErrorCodes.bedca });

    await typeInput('test');
    await waitFor(() => {
      expect(screen.getByText('T_errors.bedcaDatabase')).toBeInTheDocument();
    });
  });

  it('shows an information notification if OpenFoodFacts database returns an error', async () => {
    fetchMockJest.mockClear();
    renderWithProps();
    mockSearchFetch(undefined, { status: databaseErrorCodes.openfoodfacts });

    await typeInput('test');
    await waitFor(() => {
      expect(
        screen.getByText('T_errors.openfoodfactsDatabase'),
      ).toBeInTheDocument();
    });
  });

  it('shows an error notification if fetch call fails', async () => {
    fetchMockJest.mockClear();
    renderWithProps();
    mockSearchFetch(undefined, { status: 500 });

    await typeInput('test');
    await waitFor(() => {
      expect(screen.getByText('T_errorOcurred')).toBeInTheDocument();
    });
  });

  it('executes provided onSelect method when selecting a food from the list', async () => {
    renderWithProps();
    await typeInput('test');

    expect(await screen.findByTestId('food-list')).toBeInTheDocument();

    userEvent.click(screen.getByText(mockedFoodList[0].name));
    expect(defaultProps.onSelect).toBeCalledWith(mockedFoodList[0]);
  });

  it('shows the food element already selected in the list if selectedFoodId is provided', () => {
    renderWithProps({
      foodList: mockedFoodList,
      selectedFoodId: mockedFoodList[1].id,
    });

    expect(screen.getByText(mockedFoodList[1].name).closest('li')).toHaveClass(
      'foodList__item--selected',
    );
  });

  it('renders the provided title in stead of the default', () => {
    const title = 'Test title';
    renderWithProps({ title });

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
