import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';

import ShowFoodDetails from '../ShowFoodDetails';
import { renderComponent } from '../../../../testUtils/renderComponent';

const mockedFood = {
  brand: 'Bimbo',
  datasource: 'openfoodfacts',
  grams: 100,
  id: '8412600009345',
  imageUrl:
    'https://images.openfoodfacts.org/images/products/841/260/000/9345/front_en.33.400.jpg',
  ingredients:
    'Harina de _trigo_ , agua, levadura, aceite vegetal (oliva refinado 1,4 %), sal, masa madre inactiva de _trigo_ y _centeno_ integral.',
  kcals: '252',
  macronutrients: {
    alcohol: {
      amount: '0',
      name: 'alcohol',
      units: 'g',
    },
    carbs: {
      amount: '45',
      name: 'carbs',
      units: 'g',
    },
    fat: {
      amount: '2.8',
      name: 'fat',
      units: 'g',
    },
    protein: {
      amount: '9.6',
      name: 'protein',
      units: 'g',
    },
  },
  name: 'Pan de molde de trigo',
};

describe('Component ShowFoodDetails', () => {
  const defaultProps = {
    datasource: mockedFood.datasource,
    foodId: mockedFood.id,
    onDetailsLoad: jest.fn(),
  };

  const fetchedUrl = '/api/food/getDetails';
  let mockedFetch: any;
  const mockDetailsFetch = (
    mockedResponse: any = mockedFood,
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
    renderComponent(<ShowFoodDetails {...defaultProps} {...props} />);

  const renderWithPropsAwaiting = async (props: any = {}) => {
    renderWithProps(props);
    await screen.findByTestId('food-details');
  };

  beforeEach(() => {
    fetchMockJest.mockClear();
    mockedFetch = mockDetailsFetch();
  });

  it('renders the component successfully', async () => {
    renderWithProps();

    await waitFor(() =>
      expect(screen.getByTestId('loader')).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.getByTestId('food-details')).toBeInTheDocument(),
    );
  });

  it('makes the fetch with the right datasource header and the provided foodId', async () => {
    await renderWithPropsAwaiting();

    expect(
      mockedFetch.calls()[0][0].includes(defaultProps.foodId),
    ).toBeTruthy();
    expect(mockedFetch.calls()[0][1]).toEqual(
      expect.objectContaining({
        headers: { datasource: defaultProps.datasource },
      }),
    );
  });

  it('does not make any fetch call if foodDetails are provided', async () => {
    await renderWithPropsAwaiting({ foodDetails: mockedFood });
    expect(mockedFetch).not.toHaveFetched();
  });

  it('fetches for details if the foodId provided is not the same as the one in foodDetails provided', async () => {
    const foodId = '1234';
    await renderWithPropsAwaiting({ foodDetails: mockedFood, foodId });

    expect(mockedFetch).toHaveFetched();
    expect(mockedFetch.calls()[0][0].includes(foodId)).toBeTruthy();
  });

  it('calls the provided onDetailsLoad method when the data fetch is completed', async () => {
    await renderWithPropsAwaiting();
    expect(defaultProps.onDetailsLoad).toBeCalledWith(mockedFood);
  });

  it('displays an error notification if the fetch call fails', async () => {
    fetchMockJest.mockClear();
    mockDetailsFetch({}, { status: 500 });
    renderWithProps();

    await waitFor(() => {
      expect(screen.getByText('T_errorOcurred')).toBeInTheDocument();
    });
  });
});
