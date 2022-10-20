import { act, renderHook } from "@testing-library/react";

import ToastsProvider from "./ToastsProvider";
import useToasts from "./useToasts";

jest.useFakeTimers();

describe("useToasts", () => {
  const wrapper = ({ children }) => <ToastsProvider>{children}</ToastsProvider>;

  // GIVEN
  it("should pop n-number of toasts up", () => {
    // WHEN
    const { result } = renderHook(useToasts, { wrapper });

    act(() => {
      result.current.current.message("This is a toast");
      result.current.current.message("This is another toast");
    });

    // THEN
    expect(result.current.current.messages.length).toBe(2);
  });

  describe("message", () => {
    it("should display toasts, given a string", () => {
      // WHEN
      const { result } = renderHook(useToasts, { wrapper });

      act(() => {
        result.current.current.message("This is a toast");
      });

      // THEN
      const message = result.current.current.messages[0];
      expect(message).not.toHaveProperty("type");
    });

    it("should display toasts, given an object", () => {
      // WHEN
      const { result } = renderHook(useToasts, { wrapper });

      act(() => {
        result.current.current.message({
          text: "This is a toast",
          preserve: true,
        });
      });

      // THEN
      const message = result.current.current.messages[0];
      expect(message).not.toHaveProperty("type");
      expect(message).toHaveProperty("preserve", true);
    });
  });

  // GIVEN
  describe("success", () => {
    it("should display success toasts, given a string", () => {
      // WHEN
      const { result } = renderHook(useToasts, { wrapper });

      act(() => {
        result.current.current.success("This is a toast");
      });

      // THEN
      const message = result.current.current.messages[0];
      expect(message).toHaveProperty("type", "success");
    });

    it("should display success toasts, given an object", () => {
      // WHEN
      const { result } = renderHook(useToasts, { wrapper });

      act(() => {
        result.current.current.success({
          text: "This is a toast",
          preserve: true,
        });
      });

      // THEN
      const message = result.current.current.messages[0];
      expect(message).toHaveProperty("type", "success");
      expect(message).toHaveProperty("preserve", true);
    });
  });

  describe("error", () => {
    // GIVEN
    it("should display error toasts, given a string", () => {
      // WHEN
      const { result } = renderHook(useToasts, { wrapper });

      act(() => {
        result.current.current.error("This is a toast");
      });

      // THEN
      const message = result.current.current.messages[0];
      expect(message).toHaveProperty("type", "error");
    });

    // GIVEN
    it("should display error toasts, given an object", () => {
      // WHEN
      const { result } = renderHook(useToasts, { wrapper });

      act(() => {
        result.current.current.error({
          text: "This is a toast",
          preserve: true,
        });
      });

      // THEN
      const message = result.current.current.messages[0];
      expect(message).toHaveProperty("type", "error");
      expect(message).toHaveProperty("preserve", true);
    });
  });

  // GIVEN
  it("should remove toasts", () => {
    // WHEN
    const { result } = renderHook(useToasts, { wrapper });

    act(() => {
      result.current.current.message("This is a toast");
      jest.advanceTimersByTime(10);
      result.current.current.message("This is another toast");
      jest.advanceTimersByTime(10);
      result.current.current.message("This is yet another toast");
    });

    const key = result.current.current.messages[0].key;

    act(() => {
      result.current.current.removeToastByKey(key);
    });

    // THEN
    expect(result.current.current.messages).toHaveLength(2);
  });

  // GIVEN
  it("should throw if there's no context present", () => {
    // WHEN
    const { result } = renderHook(useToasts);

    // THEN
    act(() => {
      expect(() =>
        result.current.current.message("This is a toast"),
      ).toThrowError("Missing a ToastsProvider");
    });
  });

  describe("when providing an action", () => {
    // GIVEN
    it("should display toasts with proper height", () => {
      // WHEN
      const { result } = renderHook(useToasts, { wrapper });

      act(() => {
        result.current.current.message({
          text: "This is a toast",
          action: "Butter me up",
        });
      });

      let message = result.current.current.messages[0];
      expect(message).toHaveProperty("height", 72);

      act(() => {
        result.current.current.success({
          text: "This is a toast",
          action: "Butter me up",
        });
      });

      message = result.current.current.messages[1];
      expect(message).toHaveProperty("height", 72);
      expect(message).toHaveProperty("type", "success");

      act(() => {
        result.current.current.error({
          text: "This is a toast",
          action: "Butter me up",
        });
      });

      message = result.current.current.messages[2];
      expect(message).toHaveProperty("height", 72);
      expect(message).toHaveProperty("type", "error");
    });
  });
});
