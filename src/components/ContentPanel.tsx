import { Button, FormItem, Input, Panel } from '@vkontakte/vkui';
import React from 'react';
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const database = getDatabase();
const auth = getAuth();
const ContentPanel = () => {
  const [message, setMessage] = React.useState('Войдите в аккаунт');
  const [Login, setLogin] = React.useState('' as string | null);
  const [isAuth, setIsAuth] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setIsSaved(false);
  };
  const writeUserData = () => {
    set(ref(database, `${Login}`), message);
    setIsSaved(true);
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `${user.displayName}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setMessage(snapshot.val());
            } else {
              setMessage('Добро пожаловать');
            }
          })
          .catch((error) => {
            console.error(error);
          });
        setLogin(user.displayName);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);
  return (
    <>
      <Panel>
        <Input
          placeholder="Отправьте сообщение всем кабанятам"
          onChange={onChangeInput}
          value={message}
          type="text"
          disabled={!isAuth}
        />
        {isAuth && <Button onClick={writeUserData}>Сохранить</Button>}
        {isSaved && <FormItem status="valid" bottom={'Сохранено'}></FormItem>}
      </Panel>
    </>
  );
};
export default ContentPanel;
