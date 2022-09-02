import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import ToastArea from "./ToastArea";
import ToastsProvider from "./ToastsProvider";
import useToasts from "./useToasts";

jest.useFakeTimers();

jest.mock("components/Button", () => ({
  __esModule: true,
  Button: (props) => <button {...props} />,
}));

describe("ToastConsumer", () => {
  let ToastConsumer: React.ComponentType;

  const wrapper = ({ children }) => (
    <ToastsProvider>
      {children}
      <ToastArea />
    </ToastsProvider>
  );

  beforeEach(() => {
    ToastConsumer = () => {
      const toasts = useToasts();
      return (
        <button onClick={() => toasts.current?.message("This is a toast")}>
          Show toast
        </button>
      );
    };
  });

  // GIVEN
  it("should render without any errors", () => {
    // WHEN
    const { asFragment } = render(<ToastConsumer />, { wrapper });
    // THEN
    expect(asFragment()).toMatchSnapshot();
  });

  // GIVEN
  it("should open a toast", () => {
    // WHEN
    const { baseElement } = render(<ToastConsumer />, { wrapper });
    const button = screen.getByRole("button");
    const toastArea = baseElement.getElementsByClassName("toast-area")[0];

    // THEN
    expect(toastArea.children).toHaveLength(0);

    // WHEN
    act(() => {
      userEvent.click(button);
      jest.advanceTimersByTime(10);
      userEvent.click(button);
      jest.advanceTimersByTime(10);
    });

    // THEN
    expect(toastArea.children).toHaveLength(2);
  });

  // GIVEN
  it("should auto clear toasts", () => {
    // WHEN
    const { baseElement } = render(<ToastConsumer />, { wrapper });
    const button = screen.getByRole("button");
    const toastArea = baseElement.getElementsByClassName("toast-area")[0];

    act(() => {
      userEvent.click(button);
      jest.advanceTimersByTime(10);
      userEvent.click(button);
      jest.advanceTimersByTime(5000);
    });

    // THEN
    expect(toastArea.children).toHaveLength(0);
  });

  // GIVEN
  it("should preserve toasts", () => {
    // WHEN
    const ToastConsumer = () => {
      const toasts = useToasts();
      return (
        <button
          onClick={() =>
            toasts.current?.message({
              text: "This is a toast",
              preserve: true,
            })
          }
        >
          Show persistent toast
        </button>
      );
    };
    const { baseElement } = render(<ToastConsumer />, { wrapper });
    const button = screen.getByRole("button");
    const toastArea = baseElement.getElementsByClassName("toast-area")[0];

    // WHEN
    act(() => {
      userEvent.click(button);
      jest.advanceTimersByTime(10);
      userEvent.click(button);
      jest.advanceTimersByTime(10000);
    });

    // THEN
    expect(toastArea.children).toHaveLength(2);
  });

  // GIVEN
  it("should render action buttons", () => {
    // WHEN
    const ToastConsumer = () => {
      const toasts = useToasts();
      return (
        <button
          onClick={() =>
            toasts.current?.message({
              text: "This is a toast",
              action: "An action button!",
              cancelAction: "A cancel button!",
            })
          }
        >
          Show toast
        </button>
      );
    };
    render(<ToastConsumer />, { wrapper });
    const button = screen.getByRole("button");

    // WHEN
    act(() => {
      userEvent.click(button);
    });

    // THEN
    expect(screen.getByText("An action button!")).toBeInTheDocument();
    expect(screen.getByText("A cancel button!")).toBeInTheDocument();
  });
});
