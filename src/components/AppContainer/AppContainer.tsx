import React from 'react';

import { StAppContainer } from './AppContainer.styled';

interface AppContainerProps {
  children?: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => (
  <StAppContainer className="appContainer" data-testid="app-container">
    <div className="appContent">{children}</div>
  </StAppContainer>
);

AppContainer.defaultProps = {
  children: null,
};

export default AppContainer;
