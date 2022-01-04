import React from "react";
import { useContext } from "react";
import clsx from "clsx";
import Skeleton from "@material-ui/lab/Skeleton";

import { Container } from "../Container";
import { Text } from "../Text";

import { PlaceHolderContext } from "./index";
import styles from "./Entity.module.css";

const EntityActions = ({ children }) => {
  const placeholder = useContext(PlaceHolderContext);
  if (placeholder)
    return (
      <div className={styles.actions}>
        <Skeleton
          animation="wave"
          style={{
            minHeight: 32,
          }}
        >
          {children}
        </Skeleton>
      </div>
    );
  return <div className={styles.actions}>{children}</div>;
};

interface EntityFieldProps {
  children?: React.ReactNode;
  description?: React.ReactNode;
  label?: boolean;
  right?: boolean;
  thumbnail?: React.ReactNode;
  title?: React.ReactNode;
  width?: React.CSSProperties["width"];
  isFirstItem?: boolean;
  isLastItem?: boolean;
  actions?: React.ReactNode;
}
export const EntityField = ({
  thumbnail,
  actions,
  description,
  label,
  right,
  title,
  width,
  isLastItem,
  isFirstItem,
}: EntityFieldProps) => {
  const placeholder = useContext(PlaceHolderContext);
  return (
    <Container
      gap={2 / 3}
      row
      className={clsx(styles.field, {
        [styles.last]: isLastItem,
        [styles.first]: isFirstItem, //???
      })}
      style={
        width && {
          flexShrink: 0,
          flexGrow: 0,
          flexBasis: width,
        }
      }
    >
      {thumbnail}
      <Container
        className={clsx(styles.content, {
          [styles.rightAligned]: right,
        })}
      >
        {placeholder ? (
          <TitlePlaceholder />
        ) : (
          <Text
            p
            noMargin
            className={clsx(
              "geist-themed",
              "geist-ellipsis",
              "body-2",
              label ? "label" : "w-600",
              {
                [styles.title]: !label,
                [styles.label]: label,
                ["geist-secondary"]: label,
              }
            )}
          >
            {title}
          </Text>
        )}
        {placeholder ? (
          <DescriptionPlacehohlder />
        ) : (
          <Text
            p
            noMargin
            className={clsx(
              styles.description,
              "geist-themed",
              "geist-ellipsis",
              "geist-secondary",
              "body-2"
            )}
          >
            {description}
          </Text>
        )}
      </Container>
      {actions && <EntityActions>{actions}</EntityActions>}
    </Container>
  );
};
export default EntityField;

const AvatarPlaceholder = () => (
  <Skeleton
    animation="wave"
    variant="circle"
    style={{
      width: "36px",
      minHeight: "36px",
      marginBottom: "calc(0px)",
    }}
  />
);
const TitlePlaceholder = () => (
  <Skeleton
    animation="wave"
    variant="rect"
    style={{
      width: "40%",
      minHeight: "16px",
      height: 0,
      marginBottom: "calc(2px)",
      marginTop: "calc(2px)",
    }}
  />
);
const DescriptionPlacehohlder = () => (
  <Skeleton
    animation="wave"
    variant="rect"
    style={{
      width: "60%",
      minHeight: "16px",
      height: 0,
      marginBottom: "calc(2px)",
      marginTop: "calc(2px)",
    }}
  />
);
