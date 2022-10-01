import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useHover } from "react-aria";
import { mocked } from "ts-jest/utils";

import ToastArea from "./ToastArea";
import ToastContainer from "./ToastContainer";
import { IToastsContext } from "./ToastsProvider";
import useToasts from "./useToasts";

jest.mock("./useToasts");
const useToastsMock = mocked(useToasts);

jest.mock("./ToastContainer");
const ToastContainerMock = mocked(ToastContainer);

jest.mock("react-aria");
const useHoverMock = mocked(useHover);

jest.useFakeTimers();
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
    //   const originalModule = jest.requireActual("react-aria");
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
    const { baseElement } = render(<ToastArea />);
    // THEN
    expect(baseElement).toMatchSnapshot();
  });

  // GIVEN
  it("should be styled correctly, when there are multiple messages", () => {
    // WHEN
    useToastsMock.mockImplementationOnce(() => {
      return {
        current: { messages: [{ key: 1 }, { key: 2 }] },
      } as unknown as IToastsContext;
    });

    const { baseElement } = render(<ToastArea />);
    const toastArea = baseElement.getElementsByClassName("toast-area")[0];

    // THEN
    expect(toastArea).toHaveClass("multiple");
  });

  // GIVEN
  it("should render ToastContainer children in the correct positions", () => {
    // WHEN
    useToastsMock.mockImplementation(() => {
      return {
        current: { messages: [{ key: 1 }, { key: 2 }, { key: 3 }] },
      } as unknown as IToastsContext;
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
        return {
          current: { messages: [{ key: 1 }] },
        } as unknown as IToastsContext;
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
