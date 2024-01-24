import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import appStore from '../../stores/AppStore';

function NotFound(): ReactElement {
  return (
    <Wrapepr>
      <NotFoundPage isDark={appStore.isDark}>404</NotFoundPage>
    </Wrapepr>
  );
}

const Wrapepr = styled.div`
  width: 100%;
  height: 100ch;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFoundPage = styled.div<{ isDark: boolean }>`
  font-size: 100px;
  font-weight: 800;
  color: ${({ isDark }) => (isDark ? 'white' : 'black')};
`;
export default observer(NotFound);
