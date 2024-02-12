import { Link } from '@vkontakte/vkui/dist/components/Link/Link';
import { PanelHeader } from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import kittyIcon from '../assets/kittyIcon.jpg';
import { Button, Image } from '@vkontakte/vkui';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import React from 'react';
import { useAuthContext } from '../AuthContext';

const HeaderPanelComponent = () => {
  const [Login, setLogin] = useState('' as string | null);
  const { auth, isAuth } = useAuthContext();
  const onSignOut = () => {
    signOut(auth).then(() => {
      setLogin(null);
    });
  };
  React.useEffect(() => {
    if (isAuth) {
      const user = auth.currentUser;
      if (user !== null) {
        setLogin(user.displayName);
      }
    }
  }, [auth.currentUser, isAuth]);
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
