import clsx from "clsx";
import { useContext } from "react";

import { Container } from "../../components/Container";
import Skeleton from "../../components/Skeleton";
import MoreVertical from "../../icons/more-vertical";
import reset from "../../styles/reset/reset.module.css";
import button from "../Button/button.module.css";
import { Spacer } from "../Spacer";
import styles from "./Entity.module.css";
import dotsMenu from "./dots-menu.module.css";
import { PlaceHolderContext } from "./index";

interface EntityFieldProps {
  children?: React.ReactNode;
  description?: React.ReactNode;
  label?: boolean;
  right?: boolean;
  active?: boolean;
  thumbnail?: React.ReactNode;
  thumbnailSize?: number;
  thumbnailWrapOnMobile?: boolean;
  title?: React.ReactNode;
  width?: React.CSSProperties["width"];
  isFirstItem?: boolean;
  isLastItem?: boolean;
  actions?: React.ReactNode;
  avatar?: React.ReactNode;
  menuItems?: React.ReactNode;
  checkbox?: React.ReactNode;
  checkboxSize?: number;
  //
  titleSkeletonWidth?: string;
  descriptionSkeletonWidth?: string;
}

const EntityField = ({
  thumbnail,
  thumbnailSize = 36,
  thumbnailWrapOnMobile,
  actions,
  active,
  description,
  label,
  right,
  title,
  width,
  isLastItem,
  isFirstItem,
  avatar,
  menuItems,
  checkbox,
  titleSkeletonWidth,
  descriptionSkeletonWidth,
}: EntityFieldProps) => {
  const placeholder = useContext(PlaceHolderContext);

  const _description = (
    <p
      className={clsx(
        styles.description,
        "geist-text",
        "geist-themed",
        "geist-ellipsis",
        "geist-secondary",
        "geist-text-no-margin",
        "body-2",
      )}
    >
      {description}
    </p>
  );

  return (
    <Container
      gap={2 / 3}
      row
      vcenter
      className={clsx(styles.field, {
        [styles.last]: isLastItem,
        [styles.first]: isFirstItem,
        [styles.avatarWrap]: thumbnailWrapOnMobile,
      })}
      style={
        width && {
          flexShrink: 0,
          flexGrow: 0,
          flexBasis: width,
        }
      }
    >
      {checkbox && (
        <div className={styles.checkbox}>
          {placeholder ? (
            <Skeleton
              {...{
                vcenter: true,
                height: 16,
                width: 16,
              }}
            />
          ) : (
            checkbox
          )}
        </div>
      )}

      {thumbnail}

      {/* entity_content */}

      <Container
        className={clsx(styles.content, {
          [styles.rightAligned]: right,
        })}
        style={undefined}
        vcenter
      >
        {/* Title */}
        {title &&
          (placeholder ? (
            <Skeleton
              vcenter
              height={16}
              boxHeight={20}
              width={titleSkeletonWidth || "40%"}
            />
          ) : (
            <p
              className={clsx(
                "geist-text",
                "geist-themed",
                {
                  ["geist-default"]: !label && active !== false,
                  ["geist-secondary"]: label || active === false,
                },
                "geist-ellipsis",
                "geist-text-no-margin",
                "body-2",
                label ? "label" : "w-600",
                {
                  [styles.title]: !label,
                  [styles.label]: label,
                },
              )}
            >
              {title}
            </p>
          ))}

        {/* Description */}

        {description &&
          (placeholder ? (
            <Skeleton
              vcenter
              height={16}
              boxHeight={20}
              width={descriptionSkeletonWidth || "60%"}
            />
          ) : avatar ? (
            <div className={clsx(styles.descriptionWithAvatar)}>
              {_description}
              <Spacer x={0.5} />
              {avatar}
            </div>
          ) : (
            _description
          ))}
      </Container>

      {/* menuitems */}
      {menuItems && (
        <div className={styles.menu}>
          {placeholder ? (
            <Skeleton width={20} height={20} />
          ) : (
            <button
              className={clsx([button.base, reset.reset, dotsMenu.button])}
              onClick={() => alert("TODO: implement me")}
            >
              <span className={button.content}>
                <span className={dotsMenu.container}>
                  <span className={dotsMenu.menu}>
                    <MoreVertical size={18} />
                  </span>
                </span>
              </span>
            </button>
          )}
        </div>
      )}

      {actions && (
        <div className={styles.actions}>
          {placeholder ? <Skeleton show>{actions}</Skeleton> : actions}
        </div>
      )}
    </Container>
  );
};

export default EntityField;
