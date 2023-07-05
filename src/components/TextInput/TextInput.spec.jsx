/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { TextInput } from ".";
import userEvent from "@testing-library/user-event";

describe("<Posts />", () => {
  it("should call handleChange function on each key pressed", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="o valor" />);

    const input = screen.getByPlaceholderText(/Buscar/i);
    expect(input).toBeInTheDocument();
  });

  it("should call handleChange function on each key pressed", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="o valor" />);

    const input = screen.getByPlaceholderText(/Buscar/i);
    const value = "o valor";

    userEvent.type(input, value);
    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue="o valor" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
