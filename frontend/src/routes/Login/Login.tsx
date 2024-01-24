import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import * as yup from "yup";
import { ErrorRes } from '../../types/error';
import 'react-toastify/dist/ReactToastify.css';
import {loginUser} from '../../api/User';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import userStore from "../../stores/UserStore";


const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
}).required();
type FormData = yup.InferType<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data: FormData) => {
    await loginUser(data.email, data.password).then((res) => {
      reset();
      userStore.setAccessToken(res.accessToken)
      userStore.setUserId(res.userId)
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('userId', res.userId);
      navigate('/')
    }).catch((res: ErrorRes) => {
      reset();
      message.warning(`Ошибка при логине: ${res.response.data.message}`).then();
    })
  };
  const SignUp = () => {
    navigate('/signup')
  }

  return (
    <>
      <Title>Логин</Title>
      <Error>{errors.email?.message}</Error>
      <Error>{errors.password?.message}</Error>
      <form onSubmit={handleSubmit(onSubmit)}>
        <WrapperInput>
          <Input {...register("email")} placeholder={'Email'}/>
        </WrapperInput>
        <WrapperInput>
          <Input {...register("password")} type={'password'} placeholder={'Пароль'}/>
        </WrapperInput>
        <Submit type="submit" value={"Войти"}/>
        <Buttons>
          <SignUpButton onClick={SignUp}>Зарегистрироваться</SignUpButton>
        </Buttons>
      </form>
    </>
  );
}

const WrapperInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #ccc;
    background: url(${'./custom-arrow.ico'}) no-repeat right 5% center / 10px 10px;
  }
`;

const Title = styled.div`
  color: var(--black, #ffffff);
  font-family: 'Mulish', sans-serif;
  width: 100%;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  margin-bottom: 20px;
`;

const Error = styled.div`
  display: flex;
  width: 300px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  color: var(--black, #b94e4e);
  text-align: center;
  font-family: 'Mulish', sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 20.4px */

  p {
    margin: 8px 15px;
  }
`;

const SignUpButton = styled.div`
  color: var(--grey, #ffffff);
  font-family: 'Mulish', sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 19.5px */

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Input = styled.input`
  display: flex;
  width: 292px;
  padding: 10px 10px 12px 20px;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border: 1px solid var(--light-grey, #D4DAE1);
  background: #FFF;
  font-family: 'Mulish', sans-serif;
  
  ::-webkit-input-placeholder {
    opacity: 0.4;
    font-size: inherit;
    color: inherit;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover {
    border: 1px solid #a3afc4;
  }

  &:focus {
    border: 1px solid #d8dde6;
  }

  :focus::-webkit-input-placeholder {
    opacity: 0;
    transform: translateX(10px);
  }
`;

const Submit = styled.input`
  display: flex;
  width: 292px;
  padding: 10px 20px 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: var(--red, #4c82a1);
  cursor: pointer;
  color: #FFF;
  font-family: 'Mulish', sans-serif;;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 25.2px */
  text-transform: uppercase;
  margin-bottom: 16px;

  ::-webkit-input-placeholder {
    opacity: 0.4;
    font-size: inherit;
    color: inherit;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:focus {
    border: 1px solid #d8dde6;
  }

  :focus::-webkit-input-placeholder {
    opacity: 0;
    transform: translateX(10px);
  }
`;