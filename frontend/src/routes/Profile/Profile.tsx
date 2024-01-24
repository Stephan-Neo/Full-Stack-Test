import React, {ReactElement, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { observer } from "mobx-react-lite";
import {getUser} from "../../api/User";
import userStore from "../../stores/UserStore";
import {ErrorRes} from "../../types/error";
import {message} from "antd";

function Profile(): ReactElement {
  const { t } = useTranslation();
  useEffect( () => {
    const userId = userStore.userId;
    const fetchData = async () => {
      await getUser(userId).then((res) => {
        userStore.setProfile(res)
      }).catch((res: ErrorRes) => {
        message.warning(`Ошибка при запросе: ${res.response.data.message}`).then();
      });
    };
    fetchData();
  }, [])
  return (
    <Wrapper>
      <div>User Info</div>
      <WrapperList>
        <div>Email: {userStore.profile?.email}</div>
        <div>Login: {userStore.profile?.login}</div>
        <div>UserId: {userStore.profile?.id}</div>
      </WrapperList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 50px;
  padding: 30px;
  font-weight: 800;
`;

const WrapperList = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  padding: 30px;
  gap: 20px;
  font-weight: 800;
`;

export default observer(Profile);
