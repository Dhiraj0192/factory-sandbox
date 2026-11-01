import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

async function renderAtTwo() {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /count is 0/i }));
  await userEvent.click(screen.getByRole("button", { name: /count is 1/i }));
  expect(
    screen.getByRole("button", { name: /count is 2/i }),
  ).toBeInTheDocument();
}

describe("Decrement", () => {
  it("renders a button named Decrement", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: "Decrement" }),
    ).toBeInTheDocument();
  });

  it("takes the counter from 2 to 0 in two clicks", async () => {
    await renderAtTwo();
    const decrement = screen.getByRole("button", { name: "Decrement" });

    await userEvent.click(decrement);
    await userEvent.click(decrement);

    expect(
      screen.getByRole("button", { name: /count is 0/i }),
    ).toBeInTheDocument();
  });

  it("does not go below 0 on a third click", async () => {
    await renderAtTwo();
    const decrement = screen.getByRole("button", { name: "Decrement" });

    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);

    expect(
      screen.getByRole("button", { name: /count is 0/i }),
    ).toBeInTheDocument();
  });
});
