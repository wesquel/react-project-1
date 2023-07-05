/** @jest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("<Button/>", () => {
  it("should render the button with the text 'LoadMore'", () => {
    const fn = jest.fn();
    render(<Button text="load more" disabled={false} onClick={fn} />);
    expect.assertions(1);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toHaveAttribute("class", "button");
  });
  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(<Button text="load more" disabled={false} onClick={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
