import { act, fireEvent, render } from "@testing-library/react";

import Modal from "./";

const Component = ({ active }: { active: boolean }) => {
  return (
    <Modal.Modal active={active}>
      <Modal.Body>
        <Modal.Header>
          <Modal.Title>Modal</Modal.Title>
          <Modal.Subtitle>This is a modal.</Modal.Subtitle>
        </Modal.Header>
      </Modal.Body>

      <Modal.Actions>
        <Modal.Action onClick={close}>Cancel</Modal.Action>

        <Modal.Action onClick={close}>Submit</Modal.Action>
      </Modal.Actions>
    </Modal.Modal>
  );
};

describe("Modal", () => {
  describe("scroll lock", () => {
    // GIVEN
    it.todo("should be enabled when the modal is active");
    // GIVEN
    it.todo("should be disabled when the modal is not active");
  });
});
