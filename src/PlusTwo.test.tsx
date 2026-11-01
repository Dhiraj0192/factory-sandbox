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

describe("Plus Two", () => {
  it("renders a button named Plus Two right after the count button", () => {
    render(<App />);

    const buttons = screen.getAllByRole("button");
    const plusTwo = screen.getByRole("button", { name: "Plus Two" });

    expect(buttons[0]).toHaveAccessibleName("count is 0");
    expect(buttons[1]).toBe(plusTwo);
  });

  it("adds two to the count on each click", async () => {
    render(<App />);
    const plusTwo = screen.getByRole("button", { name: "Plus Two" });

    await userEvent.click(plusTwo);
    expect(
      screen.getByRole("button", { name: "count is 2" }),
    ).toBeInTheDocument();

    await userEvent.click(plusTwo);
    expect(
      screen.getByRole("button", { name: "count is 4" }),
    ).toBeInTheDocument();
  });

  it("adds two to a non-zero count", async () => {
    await renderAtTwo();

    await userEvent.click(screen.getByRole("button", { name: "Plus Two" }));

    expect(
      screen.getByRole("button", { name: "count is 4" }),
    ).toBeInTheDocument();
  });

  it("adds two to a negative count", async () => {
    await renderAtTwo();
    await userEvent.click(screen.getByRole("button", { name: "Negate" }));
    expect(
      screen.getByRole("button", { name: "count is -2" }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Plus Two" }));

    expect(
      screen.getByRole("button", { name: "count is 0" }),
    ).toBeInTheDocument();
  });
});
