import styles from "./example.module.css";

const Example = ({ children }) => {
  return (
    <div className={styles.example} style={{ "--width": "50%" }}>
      {children}
    </div>
  );
};

export default Example;
