import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Snippet from "./Snippet";

const mockMessage = jest.fn();
const mockError = jest.fn();

jest.mock("../Toast", () => ({
  useToasts: () => ({
    current: { message: mockMessage, error: mockError },
  }),
}));

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

it("reports success only after the clipboard write completes", async () => {
  const user = userEvent.setup();
  let completeCopy: () => void;
  const pendingCopy = new Promise<void>((resolve) => {
    completeCopy = resolve;
  });
  const writeText = jest
    .spyOn(navigator.clipboard, "writeText")
    .mockReturnValue(pendingCopy);

  render(<Snippet text={["first line", "second line"]} />);
  await user.click(
    screen.getByRole("button", { name: "Copy text to clipboard" }),
  );

  expect(writeText).toHaveBeenCalledWith("first line\nsecond line");
  expect(mockMessage).not.toHaveBeenCalled();

  await act(async () => {
    completeCopy();
    await pendingCopy;
  });

  expect(mockMessage).toHaveBeenCalledWith({ text: "Copied to clipboard!" });
  expect(mockError).not.toHaveBeenCalled();
});

it("reports a clipboard failure without a success message", async () => {
  const user = userEvent.setup();
  jest
    .spyOn(navigator.clipboard, "writeText")
    .mockRejectedValue(new Error("Clipboard access denied"));

  render(<Snippet text="copy this" />);
  await user.click(
    screen.getByRole("button", { name: "Copy text to clipboard" }),
  );

  await waitFor(() => {
    expect(mockError).toHaveBeenCalledWith({
      text: "Could not copy to clipboard.",
    });
  });
  expect(mockMessage).not.toHaveBeenCalled();
});
