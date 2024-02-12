import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './userVariables';
interface dataType {
  email: string;
  message?: string;
}
export const setMessageFB = async (data: dataType) => {
  try {
    const docRef = await setDoc(doc(db, 'messages', data.email), {
      message: data.message,
    });
    console.log('Set message: ', data.message);
  } catch (e) {
    console.error('Error set document: ', e);
  }
};
export const getMessageFB = async (data: dataType) => {
  const docRef = doc(db, 'messages', data.email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const message = docSnap.data()?.message as string;
    return message;
  } else {
    return 'Добро пожаловать!';
  }
};
