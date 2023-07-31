import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Form from "../Form";

describe("Form", () => {
  it("renders and submits data correctly", async () => {
    const handleSubmit = jest.fn();
    render(
      <Form
        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit({ title: "Test Title" });
        }}
      >
        <input type="text" name="title" />
        <button type="submit">Submit</button>
      </Form>
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Test Title" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({ title: "Test Title" })
    );
  });
});
