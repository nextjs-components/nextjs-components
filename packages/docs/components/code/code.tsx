import styles from "./code.module.css";

const Code = ({ children }) => {
  return (
    <pre className={styles.pre}>
      <code>{children}</code>
    </pre>
  );
};

export default Code;
