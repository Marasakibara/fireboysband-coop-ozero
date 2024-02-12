import { Button, Div, FormItem, Input, Panel } from '@vkontakte/vkui';
import React from 'react';
import LoadingElement from './loading/loadingElement';
import { setMessageFB, getMessageFB } from '../firebase';
import { useAuthContext } from '../AuthContext';
import { Controller, useForm } from 'react-hook-form';
const ContentPanel = () => {
  const [email, setEmail] = React.useState('' as string | null);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [message, setMessage] = React.useState('' as string);
  const { control } = useForm({
    defaultValues: {
      message: 'Войдите в аккаунт',
    },
  });
  const { auth, isAuth } = useAuthContext();
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setIsSaved(false);
  };
  const writeUserData = () => {
    setMessageFB({ email: email as string, message });
    setIsSaved(true);
  };

  React.useEffect(() => {
    console.log(isAuth, 'content.tsx');
    if (isAuth) {
      const user = auth.currentUser;
      if (user !== null) {
        getMessageFB({ email: user.email as string }).then((resp) => {
          setMessage(resp);
          setEmail(user.email);
        });
      }
    }
    setIsLoading(false);
  }, [auth.currentUser, isAuth]);
  if (isLoading) {
    return <LoadingElement></LoadingElement>;
  }

  if (!isLoading) {
    return (
      <>
        <Panel>
          <form>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <>
                  <FormItem
                    bottom={isSaved ? 'Сохранено' : ''}
                    status={isSaved ? 'valid' : 'default'}
                    top="Сообщение">
                    <Input
                      {...field}
                      value={message}
                      onChange={onChangeMessage}
                      disabled={!isAuth}
                    />
                  </FormItem>
                </>
              )}
            />
          </form>
          <Div>{isAuth && <Button onClick={writeUserData}>Сохранить</Button>}</Div>
        </Panel>
      </>
    );
  }
};
export default ContentPanel;
