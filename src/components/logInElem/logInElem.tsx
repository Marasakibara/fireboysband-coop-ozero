import styles from './logInElem.module.css';
import kittyIcon from '../../assets/kittyIcon.jpg';
import { Link } from 'react-router-dom';
const LogInEmel = () => {
  return (
    <div className={styles.logInEmel}>
      <div className={styles.textElem}> Вы уже вошли в аккаунт</div>
      <Link to="/">
        <img className={styles.ImageIcon} src={kittyIcon} alt="kittyIcon"></img>
      </Link>
    </div>
  );
};
export default LogInEmel;
