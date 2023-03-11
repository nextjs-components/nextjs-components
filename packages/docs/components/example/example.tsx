import styles from "./example.module.css";

interface ExampleProps extends React.PropsWithChildren {
  style?: React.CSSProperties;
}
const Example = ({ children, style }: ExampleProps) => {
  return (
    <div className={styles.example} style={style}>
      {children}
    </div>
  );
};

export default Example;
