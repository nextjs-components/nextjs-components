import { render } from "@testing-library/react";
import clsx from "clsx";

import Container from "./Container";

describe("Container", () => {
  it("renders a default column", () => {
    // WHEN
    const { container } = render(<Container />);
    // THEN
    expect(container.firstElementChild.classList).toHaveLength(2);
    expect(container.firstChild).toHaveStyle("--flex: 1");
    expect(container.firstChild).toHaveStyle("--justify-content: flex-start");
    expect(container.firstChild).toHaveStyle("--align-items: stretch");
    // expect(container.firstChild).toHaveStyle("--gap-ratio: 0");
  });

  it("renders children properly", () => {
    // WHEN
    const { getByText } = render(
      <Container>
        <h1>Hello</h1>
        <h2>World</h2>
      </Container>,
    );
    // THEN
    expect(getByText("Hello")).toBeInTheDocument();
    expect(getByText("World")).toBeInTheDocument();
  });

  describe("given a `row` prop", () => {
    it("renders a row container", () => {
      // WHEN
      const { container } = render(<Container row />);
      // THEN
      expect(container.firstChild).toHaveClass(
        clsx(["sm-row", "md-row", "lg-row"]),
      );
      expect(container.firstElementChild.classList).toHaveLength(5);
    });
  });

  describe("given a `direction` prop", () => {
    it("renders a container in the correct orientation", () => {
      {
        // WHEN
        const { container } = render(<Container direction="row" />);
        // THEN
        expect(container.firstChild).toHaveClass(
          clsx(["sm-row", "md-row", "lg-row"]),
        );
        expect(container.firstElementChild.classList).toHaveLength(5);
      }

      {
        // WHEN
        const { container } = render(<Container direction={["row"]} />);
        // THEN
        expect(container.firstChild).toHaveClass(
          clsx(["sm-row", "md-row", "lg-row"]),
        );
        expect(container.firstElementChild.classList).toHaveLength(5);
      }

      {
        // WHEN
        const { container } = render(
          <Container direction={["column", "row"]} />,
        );
        // THEN
        expect(container.firstChild).toHaveClass(clsx(["md-row", "lg-row"]));
        expect(container.firstElementChild.classList).toHaveLength(4);
      }

      {
        // WHEN
        const { container } = render(
          <Container direction={["column", "column", "row"]} />,
        );
        // THEN
        expect(container.firstChild).toHaveClass(clsx(["lg-row"]));
        expect(container.firstElementChild.classList).toHaveLength(3);
      }
    });
  });

  describe("given a `noWrap` prop", () => {
    it("renders a container that doesn't wrap", () => {
      // WHEN
      const { container } = render(<Container noWrap />);
      // THEN
      expect(container.firstChild).toHaveClass(clsx(["nowrap"]));
      expect(container.firstElementChild.classList).toHaveLength(3);
    });
  });

  describe("given a `center` prop", () => {
    it("renders a container that centers its content", () => {
      // WHEN
      const { container } = render(<Container center />);
      // THEN
      expect(container.firstChild).toHaveStyle("--justify-content: center");
      expect(container.firstChild).toHaveStyle("--align-items: center");
    });
  });
});
