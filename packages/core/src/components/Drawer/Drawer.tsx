import React from "react";
import clsx from "clsx";
import { useRef } from "react";
import useMeasure from "react-use-measure";
import {
  useOverlay,
  usePreventScroll,
  OverlayContainer,
  OverlayProvider,
} from "@react-aria/overlays";
// import { FocusScope } from "@react-aria/focus";

interface Props {
  show: boolean;
  onDismiss?: () => void;
}

const isBrowser = typeof window !== "undefined";

const Drawer: React.ComponentType<Props> = ({ children, show, onDismiss }) => {
  usePreventScroll({ isDisabled: !show });

  // This ref needs to be attached to the modal
  let ref = useRef();
  let { overlayProps } = useOverlay(
    { isDismissable: true, isOpen: show, onClose: onDismiss },
    ref
  );

  // useMeasure will update through window resize
  const [ref2, bounds] = useMeasure();

  return isBrowser ? (
    <OverlayProvider>
      <OverlayContainer>
        <div className={clsx("geist-drawer", { show: show })}>
          <div className={clsx("geist-drawer-overlay")} {...overlayProps} />
          <div
            className={clsx("geist-drawer-container")}
            style={{
              height: bounds.height + 20,
              transform: `translate3d(0px, ${show ? "0px" : "100%"}, 102px)`,
            }}
          >
            <div ref={ref}>
              <div ref={ref2}>{children}</div>
            </div>
          </div>
        </div>
      </OverlayContainer>
    </OverlayProvider>
  ) : null;
};

export default Drawer;
