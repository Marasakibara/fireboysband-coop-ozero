import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyAeF7oISUJdFK7mnleDG8ZHMr5XWNrNWn4',
  authDomain: 'secator-fireband.firebaseapp.com',
  databaseURL: 'https://secator-fireband-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'secator-fireband',
  storageBucket: 'secator-fireband.appspot.com',
  messagingSenderId: '237068071499',
  appId: '1:237068071499:web:8a23e3d4057758fe9213ce',
  measurementId: 'G-R96XMZTMTN',
};
export const app = initializeApp(firebaseConfig);
