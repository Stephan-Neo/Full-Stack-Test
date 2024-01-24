import styled from 'styled-components';
import {Outlet, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect} from "react";


export default function LoginLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login')
  }, [])
  return (
    <Wrapper>
      <WrapperLogin>
        <Outlet />
      </WrapperLogin>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #303845;
`;

const WrapperLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 50px 30px 50px;
  background: var(--light-blue, #8b8ba9);
  @media (max-width: 425px) {
    width: 100%;
  }
`;
