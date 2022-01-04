import { render, RenderResult, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ToastArea from "./ToastArea";
import { IToastsContext } from "./ToastsProvider";

import { mocked } from "ts-jest/utils";
import useToasts from "./useToasts";
jest.mock("./useToasts");
const useToastsMock = mocked(useToasts);

import ToastContainer from "./ToastContainer";
jest.mock("./ToastContainer");
const ToastContainerMock = mocked(ToastContainer);

import { useHover } from "@react-aria/interactions";
jest.mock("@react-aria/interactions");
const useHoverMock = mocked(useHover);

jest.useFakeTimers();
jest.mock("@react-aria/overlays", () => ({
  __esModule: true,
  OverlayContainer: ({ children }) => <>{children}</>,
  OverlayProvider: ({ children }) => <>{children}</>,
}));
jest.mock("components/Button", () => ({
  __esModule: true,
  Button: (props) => <button {...props} />,
}));

const ToastContainerFn = jest.fn(() => <div>test</div>);

describe("ToastArea", () => {
  beforeEach(() => {
    // TODO This appears that it should work, but doesn't
    // - useHover.isHovered should be `false` but is `undefined`
    // useHoverMock.mockImplementation(() => {
    //   const originalModule = jest.requireActual("@react-aria/interactions");
    //   return originalModule.useHover;
    // });
    useHoverMock.mockImplementation(() => ({
      hoverProps: {},
      isHovered: false,
    }));
    useToastsMock.mockImplementation(() => jest.requireActual("./useToasts"));
    ToastContainerMock.mockImplementation(ToastContainerFn as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // GIVEN
  it("should render without any errors", () => {
    // WHEN
    const { container } = render(<ToastArea />);
    // THEN
    expect(container).toMatchSnapshot();
  });

  // GIVEN
  it("should be styled correctly, when there are multiple messages", () => {
    // WHEN
    useToastsMock.mockImplementationOnce(() => {
      return ({
        current: { messages: [{ key: 1 }, { key: 2 }] },
      } as unknown) as IToastsContext;
    });

    const { container } = render(<ToastArea />);
    const toastArea = container.firstChild;

    // THEN
    expect(toastArea).toHaveClass("multiple");
  });

  // GIVEN
  it("should render ToastContainer children in the correct positions", () => {
    // WHEN
    useToastsMock.mockImplementation(() => {
      return ({
        current: { messages: [{ key: 1 }, { key: 2 }, { key: 3 }] },
      } as unknown) as IToastsContext;
    });

    render(<ToastArea />);

    // THEN
    expect(ToastContainerFn).toBeCalledTimes(3);

    // @ts-ignore
    expect(ToastContainerFn.mock.calls[2][0]).toMatchObject({
      hovering: false,
      id: 3,
      position: 0,
    });
    // @ts-ignore
    expect(ToastContainerFn.mock.calls[0][0]).toMatchObject({
      hovering: false,
      id: 1,
      position: 2,
    });
  });

  // GIVEN;
  describe("hovering", () => {
    it("should result in ToastContainer children having hovered styles", () => {
      useHoverMock.mockImplementation(() => ({
        hoverProps: {},
        isHovered: true,
      }));
      useToastsMock.mockImplementation(() => {
        return ({
          current: { messages: [{ key: 1 }] },
        } as unknown) as IToastsContext;
      });

      const { container } = render(<ToastArea />);

      act(() => {
        userEvent.hover(container);
      });

      // @ts-ignore
      expect(ToastContainerFn.mock.calls[0][0]).toMatchObject({
        hovering: true,
      });
    });
  });
});
