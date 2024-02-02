import { Button, Input, Panel } from '@vkontakte/vkui';
import React from 'react';
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const database = getDatabase();
const auth = getAuth();
const ContentPanel = () => {
  const [message, setMessage] = React.useState('');
  const [isAuth, setIsAuth] = React.useState(false);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const writeUserData = () => {
    set(ref(database, 'message'), message);
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
    const dbRef = ref(getDatabase());
    get(child(dbRef, `message`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMessage(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
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
      </Panel>
    </>
  );
};
export default ContentPanel;
