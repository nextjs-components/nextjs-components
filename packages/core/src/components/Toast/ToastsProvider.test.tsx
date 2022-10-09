import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { UserEvent } from "@testing-library/user-event/setup/setup";
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
  let user: UserEvent;
  let ToastConsumer: React.ComponentType;
  let wrapper: React.ComponentType<React.PropsWithChildren>;

  beforeEach(() => {
    user = userEvent.setup({
      // https://testing-library.com/docs/user-event/options#advancetimers
      advanceTimers: jest.advanceTimersByTime,
    });
    wrapper = ({ children }) => (
      <ToastsProvider>
        {children}
        <ToastArea />
      </ToastsProvider>
    );
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
  it("should open a toast", async () => {
    // WHEN
    const { baseElement, getByRole } = render(<ToastConsumer />, { wrapper });
    const button = getByRole("button");
    const toastArea = baseElement.getElementsByClassName("toast-area")[0];

    // THEN
    expect(toastArea.children).toHaveLength(0);

    // WHEN
    await act(async () => {
      await user.click(button);
      // advance timer so toasts can have unique IDs
      jest.advanceTimersByTime(10);
      await user.click(button);
    });

    // THEN
    expect(toastArea.children).toHaveLength(2);
  });

  // GIVEN
  it("should auto clear toasts", async () => {
    // WHEN
    const { baseElement } = render(<ToastConsumer />, { wrapper });
    const button = screen.getByRole("button");
    const toastArea = baseElement.getElementsByClassName("toast-area")[0];

    await act(async () => {
      await user.click(button);
    });

    // For some reason, this timer run needs to exist in a
    // separate act block for the `setTimeout` to actually
    // call its callback.
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // THEN
    expect(toastArea.children).toHaveLength(0);
  });

  // GIVEN
  it("should preserve toasts", async () => {
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
    await act(async () => {
      await user.click(button);
      jest.advanceTimersByTime(10);
      await user.click(button);
    });

    // Run timers to clear non-preserve toasts
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // THEN
    expect(toastArea.children).toHaveLength(2);
  });

  // GIVEN
  it("should render action buttons", async () => {
    // WHEN
    const ToastConsumer = () => {
      const toasts = useToasts();
      return (
        <button
          onClick={() =>
            toasts.current.message({
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
    await act(async () => {
      await user.click(button);
    });

    // THEN
    expect(screen.getByText("An action button!")).toBeInTheDocument();
    expect(screen.getByText("A cancel button!")).toBeInTheDocument();
  });
});
