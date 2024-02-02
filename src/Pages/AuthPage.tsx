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

const RegistrationPage = () => {
  const [isLogIn, setIsLogIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const auth = getAuth(app);
  const location = useLocation();
  const onChangeValueEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangeValuePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onChangeValueLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const registation = (email: string, password: string) => {
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
  };
  const authAcc = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;

        window.location.href = '/';
      })
      .catch((error) => {
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
      } else {
        setIsLogIn(false);
        //console.log('not authorized');
      }
    });
  }, [auth]);
  if (location.pathname === '/registration') {
    return !isLogIn ? (
      <Panel id="new-user">
        <PanelHeader>Регистрация</PanelHeader>
        <Group mode="card">
          <form onSubmit={(e) => e.preventDefault()}>
            <FormItem top="Логин">
              <Input value={login} onChange={onChangeValueLogin} />
            </FormItem>
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
            <FormItem
              bottom="Пароль может содержать только латинские буквы и цифры."
              bottomId="passwordDescription">
              <Input
                type="password"
                placeholder="Повторите пароль"
                aria-labelledby="passwordDescription"
              />
            </FormItem>
            <FormItem>
              <Button onClick={onClickRegistration} size="l">
                Зарегистрироваться
              </Button>
            </FormItem>
          </form>
        </Group>
      </Panel>
    ) : (
      <>{'Вы уже вошли в систему'}</>
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
