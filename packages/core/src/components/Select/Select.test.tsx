import { render } from "@testing-library/react";

import Select from "./Select";

describe("Select", () => {
  it("should render a disabled input", () => {
    const { container } = render(<Select disabled />);
    expect(container.querySelector("select")).toBeDisabled();
  });

  it("should render a label", () => {
    const { container } = render(<Select label="My Label" />);
    expect(container.querySelector("label")).toHaveTextContent("My Label");
  });

  it.each([["foo"], [undefined]])("should be labelled correctly", (label) => {
    const { container } = render(<Select label={label} />);
    const labelFor = container.querySelector("label").getAttribute("for");
    const selectId = container.querySelector("select").getAttribute("id");

    expect(labelFor).toEqual(selectId);
  });

  it("should render a placeholder", () => {
    const { container } = render(<Select placeholder="My Placeholder" />);
    expect(container.querySelector("option")).toHaveTextContent(
      "My Placeholder",
    );
  });

  it("should render a custom prefix", () => {
    const { container } = render(<Select prefix="My Prefix" />);
    expect(container.querySelector(".prefix")).toHaveTextContent("My Prefix");
  });

  it("should render a default suffix", () => {
    const { container } = render(<Select />);
    expect(container.querySelector(".suffix")).toContainElement(
      document.querySelector("svg"),
    );
  });

  it("should render a custom suffix", () => {
    const { container } = render(<Select suffix={"My Suffix"} />);
    expect(container.querySelector(".suffix")).toHaveTextContent("My Suffix");
  });

  it("should render a custom size", () => {
    {
      const { container } = render(<Select size="small" />);
      expect(container.querySelector(".select")).toHaveClass("small");
    }

    {
      const { container } = render(<Select size="large" />);
      expect(container.querySelector(".select")).toHaveClass("large");
    }
  });
});
