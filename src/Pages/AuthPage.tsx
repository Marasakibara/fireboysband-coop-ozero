import { Button, FormItem, Group, Input, Panel, PanelHeader } from '@vkontakte/vkui';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { app } from '../userVariables';
import { useLocation } from 'react-router-dom';
import LoadingElement from '../components/loading/loadingElement';
import LogInElem from '../components/logInElem/logInElem';

const RegistrationPage = () => {
  const [isLogIn, setIsLogIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCorrect, setPasswordCorrect] = React.useState('');
  const [isCorrect, setIsCorrect] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = React.useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = React.useState(false);
  const auth = getAuth(app);
  const location = useLocation();
  const onChangeValueEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (event.target.value.includes('@') && event.target.value.includes('.')) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
    setIsCorrect(true);
  };
  const onChangeValuePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value === passwordCorrect) {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
    setIsCorrect(true);
  };
  const onChangeValuePasswordCorrect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCorrect(event.target.value);
    if (event.target.value === password) {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
    setIsCorrect(true);
  };
  const onChangeValueLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
    setIsCorrect(true);
  };
  const registation = (email: string, password: string) => {
    console.log(isEmailCorrect, isPasswordCorrect, email, password, login);
    if (isEmailCorrect && isPasswordCorrect && email && password && password.length > 5 && login) {
      setIsCorrect(false);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
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
          console.log(errorCode);
          console.log(errorMessage);
          // ..
        });
    } else {
      setIsCorrect(false);
    }
  };
  const authAcc = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;

        window.location.href = '/';
        setIsLoading(true);
      })
      .catch((error) => {
        setIsCorrect(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  const onClickRegistration = () => {
    registation(email, password);
  };
  const onClickAuth = () => {
    authAcc(email, password);
  };
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setIsLogIn(true);
        //console.log('authorized');
        setIsLoading(false);
      } else {
        setIsLogIn(false);
        setIsLoading(false);
        //console.log('not authorized');
      }
    });
  }, [auth]);
  if (isLoading) {
    return <LoadingElement></LoadingElement>;
  }
  if (isLogIn) {
    return <LogInElem></LogInElem>;
  }
  if (location.pathname === '/registration') {
    return (
      <Panel id="new-user">
        <PanelHeader>Регистрация</PanelHeader>
        <Group mode="card">
          <form onSubmit={(e) => e.preventDefault()}>
            <FormItem
              bottom={login ? 'Логин введён' : 'Введите логин!'}
              status={login ? 'valid' : 'error'}
              top="Логин">
              <Input value={login} onChange={onChangeValueLogin} />
            </FormItem>
            <FormItem
              htmlFor="email"
              top="E-mail"
              status={isEmailCorrect ? 'valid' : 'error'}
              bottom={
                email ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'
              }
              bottomId="email-type">
              <Input
                aria-labelledby="email-type"
                id="email"
                type="email"
                name="email"
                value={email}
                required
                onChange={onChangeValueEmail}
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
              <Input
                onChange={onChangeValuePassword}
                value={password}
                id="pass"
                type="password"
                placeholder="Введите пароль"
              />
            </FormItem>
            <FormItem
              status={passwordCorrect ? (isPasswordCorrect ? 'valid' : 'error') : 'error'}
              bottom={
                passwordCorrect
                  ? isPasswordCorrect
                    ? 'Пароли совпадают'
                    : 'Пароли не совпадают'
                  : 'Пароль может содержать только латинские буквы и цифры.'
              }
              bottomId="passwordDescription">
              <Input
                type="password"
                value={passwordCorrect}
                onChange={onChangeValuePasswordCorrect}
                placeholder="Повторите пароль"
                aria-labelledby="passwordDescription"
              />
            </FormItem>
            {isCorrect ? (
              ''
            ) : (
              <FormItem status="error" bottom={'Данные введены неправильно!'}></FormItem>
            )}

            <FormItem>
              <Button onClick={onClickRegistration} size="l">
                Зарегистрироваться
              </Button>
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
          <form onSubmit={(e) => e.preventDefault()}>
            <FormItem
              htmlFor="email"
              top="E-mail"
              status={email ? 'valid' : 'error'}
              bottom={
                email ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'
              }
              bottomId="email-type">
              <Input
                aria-labelledby="email-type"
                id="email"
                type="email"
                name="email"
                value={email}
                required
                onChange={onChangeValueEmail}
              />
            </FormItem>
            <FormItem top="Пароль" htmlFor="pass">
              <Input
                onChange={onChangeValuePassword}
                value={password}
                id="pass"
                type="password"
                placeholder="Введите пароль"
              />
            </FormItem>
            {isCorrect ? (
              ''
            ) : (
              <FormItem
                status="error"
                bottom={'Вы неправильно ввели имя пользователя или пароль'}></FormItem>
            )}
            <FormItem>
              <Button onClick={onClickAuth} size="l">
                Войти
              </Button>
            </FormItem>
          </form>
        </Group>
      </Panel>
    );
  }
};

export default RegistrationPage;
