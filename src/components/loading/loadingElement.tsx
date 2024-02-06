import styles from './loadingElement.module.css';
const LoadingElement = () => {
  return (
    <div className={styles.loadingElem}>
      <div className={styles.spinner}>
        <span>Loading...</span>
        <div className={styles.half}></div>
      </div>
    </div>
  );
};
export default LoadingElement;
