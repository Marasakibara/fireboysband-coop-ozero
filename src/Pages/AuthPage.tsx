import { Button, FormItem, Group, Input, Panel, PanelHeader } from '@vkontakte/vkui';
import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { useLocation } from 'react-router-dom';
import LoadingElement from '../components/loading/loadingElement';
import LogInElem from '../components/logInElem/logInElem';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useAuthContext } from '../AuthContext';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
interface IFormInput {
  login: string;
  email: string;
  password: string;
  passwordCorrect: string;
}

const AuthPage = () => {
  const [isCorrect, setIsCorrect] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      login: '',
      email: '',
      password: '',
      passwordCorrect: '',
    },
  });
  const [emailValid, setEmailValid] = React.useState(true);
  const location = useLocation();
  const login = watch('login');
  const email = watch('email');
  const password = watch('password');
  const passwordCorrect = watch('passwordCorrect');

  const { auth, isAuth } = useAuthContext();
  React.useEffect(() => {
    if (!isAuth) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isAuth]);
  if (isLoading) {
    return <LoadingElement />;
  }

  const Registation = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(true);
        const user = userCredential.user;
        //console.log(user);
        updateProfile(user, {
          displayName: login,
        })
          .then(() => {
            window.location.href = '/';
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          setEmailValid(false);
        }
        console.log(errorMessage);
        // ..
      });
  };
  const onSubmitRegistration: SubmitHandler<IFormInput> = async (data) => {
    const { login, email, password, passwordCorrect } = { ...data };
    if (
      login &&
      email.includes('@') &&
      email.includes('.') &&
      password.length > 5 &&
      password === passwordCorrect
    ) {
      setIsCorrect(true);
      Registation(email, password);
    } else {
      setIsCorrect(false);
    }
  };

  const Authorization = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;
        setIsLoading(true);
        window.location.href = '/';
      })
      .catch((error) => {
        setIsCorrect(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  const onSubmitAuthorization: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = { ...data };
    if (email.includes('@') && email.includes('.') && password.length > 5) {
      setIsCorrect(true);
      Authorization(email, password);
    } else {
      setIsCorrect(false);
    }
  };

  if (isAuth) {
    return (
      <>
        <LogInElem />
      </>
    );
  }
  if (location.pathname === '/registration') {
    return (
      <Panel id="new-user">
        <PanelHeader>Регистрация</PanelHeader>
        <Group mode="card">
          <form onSubmit={handleSubmit(onSubmitRegistration)}>
            <FormItem
              bottom={login ? 'Логин введён' : 'Введите логин!'}
              status={login ? 'valid' : 'error'}
              top="Логин">
              <Controller
                name="login"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </FormItem>
            <FormItem
              htmlFor="email"
              top="E-mail"
              status={email.includes('@') && email.includes('.') ? 'valid' : 'error'}
              bottom={
                email.includes('@') && email.includes('.')
                  ? 'Электронная почта введена верно!'
                  : 'Пожалуйста, введите электронную почту'
              }
              bottomId="email-type">
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </FormItem>
            <FormItem
              bottom={
                password
                  ? password.length > 5
                    ? 'Пароль введён'
                    : 'Пароль должен содержать не менее 6 символов'
                  : 'Введите пароль'
              }
              status={password ? (password.length > 5 ? 'valid' : 'error') : 'default'}
              top="Пароль"
              htmlFor="pass">
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input type="password" {...field} />}
              />
            </FormItem>
            <FormItem
              status={
                passwordCorrect ? (password === passwordCorrect ? 'valid' : 'error') : 'error'
              }
              bottom={
                passwordCorrect
                  ? password === passwordCorrect
                    ? 'Пароли совпадают'
                    : 'Пароли не совпадают'
                  : 'Пароль может содержать только латинские буквы и цифры.'
              }
              bottomId="passwordDescription">
              <Controller
                name="passwordCorrect"
                control={control}
                render={({ field }) => <Input type="password" {...field} />}
              />
            </FormItem>
            {!isCorrect && (
              <FormItem status="error" bottom={'Данные введены неправильно!'}></FormItem>
            )}
            {!emailValid && (
              <FormItem status="error" bottom={'Аккаунт с таки мemail уже существует'}></FormItem>
            )}
            <FormItem>
              <Button type="submit">Зарегистрироваться</Button>
            </FormItem>
          </form>
        </Group>
      </Panel>
    );
  }
  if (location.pathname === '/auth') {
    return (
      <Panel id="new-user">
        <PanelHeader>Вход</PanelHeader>
        <Group>
          <form onSubmit={handleSubmit(onSubmitAuthorization)}>
            <FormItem
              htmlFor="email"
              top="E-mail"
              status={email.includes('@') && email.includes('.') ? 'valid' : 'error'}
              bottom={
                email.includes('@') && email.includes('.')
                  ? 'Электронная почта введена верно!'
                  : 'Пожалуйста, введите электронную почту'
              }
              bottomId="email-type">
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </FormItem>
            <FormItem
              bottom={
                password
                  ? password.length > 5
                    ? 'Пароль введён'
                    : 'Пароль должен содержать не менее 6 символов'
                  : 'Введите пароль'
              }
              status={password ? (password.length > 5 ? 'valid' : 'error') : 'default'}
              top="Пароль"
              htmlFor="pass">
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input type="password" {...field} />}
              />
            </FormItem>
            {!isCorrect && (
              <FormItem status="error" bottom={'Вы неправильно ввели E-mail или пароль'}></FormItem>
            )}
            <FormItem>
              <Button type="submit">Войти</Button>
            </FormItem>
          </form>
        </Group>
      </Panel>
    );
  }
};

export default AuthPage;
