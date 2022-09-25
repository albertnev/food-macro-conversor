import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export const renderComponent = (
  component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) =>
  render(
    <SessionProvider session={{ expires: '1', user: {} }}>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        hideProgressBar
        position="top-right"
        theme="colored"
      />
      {component}
    </SessionProvider>,
  );
