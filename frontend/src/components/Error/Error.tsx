import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import appStore from '../../stores/AppStore';

interface ErrorProps {
  text?: string;
}
function Error({ text }: ErrorProps): ReactElement {
  return (
    <Wrapepr>
      <NotFoundPage isDark={appStore.isDark}>{text}</NotFoundPage>
    </Wrapepr>
  );
}

const Wrapepr = styled.div`
  margin: 0 50px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFoundPage = styled.div<{ isDark: boolean }>`
  font-size: 50px;
  font-weight: 800;
  color: ${({ isDark }) => (isDark ? '#656fd9' : 'black')};
`;

export default observer(Error);
