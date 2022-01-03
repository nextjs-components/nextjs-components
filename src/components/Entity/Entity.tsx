import React from "react";
import { Children, useContext } from "react";
import { isFragment } from "react-is";
import Skeleton from "@material-ui/lab/Skeleton";

import { Container } from "../../components/Container";

import styles from "./Entity.module.css";

import { PlaceHolderContext } from "./index";
import EntityField from "./EntityField";

interface Props {
  children?: React.ReactNode;
  placeholder?: boolean;
  thumbnail?: React.ReactNode;
  actions?: React.ReactNode;
}

const Entity = ({ children, placeholder, thumbnail, actions }: Props) => {
  return (
    <PlaceHolderContext.Provider value={placeholder}>
      <div className={styles.entity}>
        <Container direction={["column", "row"]}>
          {Children.map(
            // Children might be a fragment, in the event of a
            // function-as-children. If so, map through a the
            // fragment's children.
            isFragment(children) ? (children as any).props.children : children,
            (child: React.ReactElement, index) => {
              // inject thumbnail into first entityfield
              if (index === 0) {
                return (
                  <EntityField
                    {...child.props}
                    {...{ thumbnail }}
                    isFirstItem
                  ></EntityField>
                );
              } // inject actions into last entityfield
              else if (index === Children.count(children) - 1) {
                return (
                  <EntityField
                    {...child.props}
                    {...{ actions }}
                    isLastItem
                  ></EntityField>
                );
              } else {
                return child;
              }
            }
          )}
        </Container>
      </div>
    </PlaceHolderContext.Provider>
  );
};

export default Entity;

interface EntityThumbnailProps {
  /** defaults to `32` */
  size?: number;
  children?: React.ReactNode;
}
export const EntityThumbnail = ({
  size = 32,
  children,
}: EntityThumbnailProps) => {
  const placeholder = useContext(PlaceHolderContext);

  return (
    <div className={styles.avatar}>
      {placeholder ? (
        <Skeleton
          animation="wave"
          variant="circle"
          style={{
            width: size,
            minHeight: size,
            marginBottom: "calc(0px)",
          }}
        />
      ) : (
        children
      )}
    </div>
  );
};
