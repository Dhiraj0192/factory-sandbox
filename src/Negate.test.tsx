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

async function renderAtMinusTwo() {
  await renderAtTwo();
  await userEvent.click(screen.getByRole("button", { name: "Negate" }));
  expect(
    screen.getByRole("button", { name: "count is -2" }),
  ).toBeInTheDocument();
}

describe("Negate", () => {
  it("renders a button named Negate", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "Negate" })).toBeInTheDocument();
  });

  it("flips the sign of the count on each click", async () => {
    await renderAtTwo();
    const negate = screen.getByRole("button", { name: "Negate" });

    await userEvent.click(negate);
    expect(
      screen.getByRole("button", { name: "count is -2" }),
    ).toBeInTheDocument();

    await userEvent.click(negate);
    expect(
      screen.getByRole("button", { name: "count is 2" }),
    ).toBeInTheDocument();
  });

  it("keeps the counter at 0 when negating 0", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "Negate" }));

    expect(
      screen.getByRole("button", { name: "count is 0" }),
    ).toBeInTheDocument();
  });

  it("lets the count button increment a negative count", async () => {
    await renderAtMinusTwo();

    await userEvent.click(screen.getByRole("button", { name: "count is -2" }));

    expect(
      screen.getByRole("button", { name: "count is -1" }),
    ).toBeInTheDocument();
  });

  it("lets Triple multiply a negative count", async () => {
    await renderAtMinusTwo();

    await userEvent.click(screen.getByRole("button", { name: "Triple" }));

    expect(
      screen.getByRole("button", { name: "count is -6" }),
    ).toBeInTheDocument();
  });

  it("lets Reset clear a negative count", async () => {
    await renderAtMinusTwo();

    await userEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(
      screen.getByRole("button", { name: "count is 0" }),
    ).toBeInTheDocument();
  });

  it("jumps to 0 when decrementing a negative count", async () => {
    await renderAtMinusTwo();

    await userEvent.click(screen.getByRole("button", { name: "Decrement" }));

    expect(
      screen.getByRole("button", { name: "count is 0" }),
    ).toBeInTheDocument();
  });
});
