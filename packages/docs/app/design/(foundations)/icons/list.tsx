import { Container } from "nextjs-components/src/components/Container";

import styles from "./list.module.css";

export const ListItem = ({ children }) => {
  return (
    <div className={styles.geistListItem}>
      <Container style={{ height: 100 }}>{children}</Container>
    </div>
  );
};
