/** @jest-environment jsdom */
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Home } from ".";
import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  rest.get("*jsonplaceholder.typicode.com*", async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "title1",
          body: "body1",
          url: "img3.jpg",
        },
        {
          userId: 2,
          id: 2,
          title: "title2",
          body: "body2",
          url: "img3.jpg",
        },
        {
          userId: 3,
          id: 3,
          title: "title3",
          body: "body3",
          url: "img3.jpg",
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe("<Home/>", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render search, posts and load more", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Nada encontrado");
    expect.assertions(3);
    await waitForElementToBeRemoved(noMorePosts);
    const search = screen.getByPlaceholderText(/Buscar/i);
    expect(search).toBeInTheDocument();
    const images = screen.getAllByRole("img", { name: /title/i });
    expect(images).toHaveLength(3);

    const button = screen.getByRole("button", { name: /Load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it("should search for posts", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Nada encontrado");
    // expect.assertions(3);
    await waitForElementToBeRemoved(noMorePosts);
    const search = screen.getByPlaceholderText(/Buscar/i);
    expect(search).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "title1" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "title2" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "title3" })).toBeInTheDocument();
  });
});
