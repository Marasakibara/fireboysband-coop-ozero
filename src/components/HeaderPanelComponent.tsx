import { Link } from '@vkontakte/vkui/dist/components/Link/Link';
import { PanelHeader } from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import kittyIcon from '../assets/kittyIcon.jpg';
import { Button, Image } from '@vkontakte/vkui';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState } from 'react';
import React from 'react';
const auth = getAuth();

const HeaderPanelComponent = () => {
  const [Login, setLogin] = useState('' as string | null);
  const onSignOut = () => {
    signOut(auth).then(() => {
      setLogin(null);
    });
  };
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setLogin(user.displayName);
      } else {
        // User is signed out
        // ...
      }
    });
  });
  return (
    <PanelHeader
      after={
        Login ? (
          <>
            {Login}
            <Button onClick={onSignOut}>Выход</Button>
          </>
        ) : (
          <>
            <Link href="/registration" target="_blank">
              <Button>Зарегистрироваться</Button>
            </Link>
            <Link href="/auth" target="_blank">
              <Button>Вход</Button>
            </Link>
          </>
        )
      }
      before={
        <Link href="/">
          <Image src={kittyIcon} size={48} />
        </Link>
      }></PanelHeader>
  );
};

export default HeaderPanelComponent;
