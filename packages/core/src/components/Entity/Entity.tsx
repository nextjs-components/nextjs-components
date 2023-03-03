import clsx from "clsx";
import { Children } from "react";
import { isFragment } from "react-is";

import { Container } from "../../components/Container";
import Skeleton from "../../components/Skeleton";
import { Text } from "../../components/Text";
import styles from "./Entity.module.css";
import EntityField from "./EntityField";
import { PlaceHolderContext } from "./index";

interface Props {
  placeholder?: boolean;
  thumbnail?: React.ReactElement;
  checkbox?: React.ReactElement;
  actions?: React.ReactElement;
  menuItems?: React.ReactElement;
  footer?: React.ReactElement;
}

const Entity: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  placeholder,
  thumbnail,
  menuItems,
  checkbox,
  actions,
  footer,
}) => {
  const thumbnailWrapOnMobile = thumbnail?.props.wrap;
  return (
    <PlaceHolderContext.Provider value={placeholder}>
      <div className={styles.entity}>
        <Container direction={["column", "row"]} gap={2 / 3}>
          {Children.map(
            // Children might be a fragment, in the event of a
            // function-as-children. If so, map through a the
            // fragment's children.
            isFragment(children) ? (children as any).props.children : children,
            (child: React.ReactElement, index) => {
              const isFirstItem = index === 0;
              const isLastItem = index === Children.count(children) - 1;
              // inject thumbnail into first entityfield

              // console.log("child.props", child.props);

              return (
                <EntityField
                  {...child.props}
                  //
                  {...{ isFirstItem }}
                  {...(isFirstItem ? { thumbnail, thumbnailWrapOnMobile } : {})}
                  {...(isFirstItem ? { checkbox } : {})}
                  //
                  {...{ isLastItem }}
                  {...(isLastItem ? { menuItems } : {})}
                  {...(isLastItem ? { actions } : {})}
                ></EntityField>
              );
            },
          )}
        </Container>

        {footer && (
          <Container
            row
            className={clsx(styles.footer)}
            style={{
              // @ts-ignore
              "--indent": thumbnail ? "48px" : 0,
              "--height": "24px",
            }}
          >
            {placeholder ? (
              <Skeleton
                {...{
                  vcenter: true,
                  height: 16,
                  width: 100,
                  boxHeight: 24,
                }}
              />
            ) : (
              <Text
                className="geist-themed geist-secondary"
                style={{ width: "100%" }}
                color={"geist-secondary"}
              >
                {footer}
              </Text>
            )}
          </Container>
        )}
      </div>
    </PlaceHolderContext.Provider>
  );
};

export default Entity;
