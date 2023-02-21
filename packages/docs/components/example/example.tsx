import styles from "./example.module.css";

const Example = ({ children, style }) => {
  return (
    <div className={styles.example} style={style}>
      {children}
    </div>
  );
};

export default Example;
