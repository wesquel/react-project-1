/** @jest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("<Button/>", () => {
  it("should render the button with the text 'LoadMore'", () => {
    render(<Button text="load more" />);
    expect.assertions(1);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toHaveAttribute("class", "button");
  });
});
