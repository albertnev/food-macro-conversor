import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';

import ShowFoodDetails from '../ShowFoodDetails';
import { renderComponent } from '../../../../testUtils/renderComponent';
import { mockedFoodDetails } from '../../../../testUtils/mocks/foodDetails';

describe('Component ShowFoodDetails', () => {
  const defaultProps = {
    datasource: mockedFoodDetails.datasource,
    foodId: mockedFoodDetails.id,
    onDetailsLoad: jest.fn(),
  };

  const fetchedUrl = '/api/food/getDetails';
  let mockedFetch: any;
  const mockDetailsFetch = (
    mockedResponse: any = mockedFoodDetails,
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
    await renderWithPropsAwaiting({ foodDetails: mockedFoodDetails });
    expect(mockedFetch).not.toHaveFetched();
  });

  it('fetches for details if the foodId provided is not the same as the one in foodDetails provided', async () => {
    const foodId = '1234';
    await renderWithPropsAwaiting({ foodDetails: mockedFoodDetails, foodId });

    expect(mockedFetch).toHaveFetched();
    expect(mockedFetch.calls()[0][0].includes(foodId)).toBeTruthy();
  });

  it('calls the provided onDetailsLoad method when the data fetch is completed', async () => {
    await renderWithPropsAwaiting();
    expect(defaultProps.onDetailsLoad).toBeCalledWith(mockedFoodDetails);
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
