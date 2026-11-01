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

describe("Triple", () => {
  it("renders a button named Triple", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "Triple" })).toBeInTheDocument();
  });

  it("multiplies the current count by three on each click", async () => {
    await renderAtTwo();
    const triple = screen.getByRole("button", { name: "Triple" });

    await userEvent.click(triple);
    expect(
      screen.getByRole("button", { name: /count is 6/i }),
    ).toBeInTheDocument();

    await userEvent.click(triple);
    expect(
      screen.getByRole("button", { name: /count is 18/i }),
    ).toBeInTheDocument();
  });

  it("keeps the counter at 0 when tripling 0", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "Triple" }));

    expect(
      screen.getByRole("button", { name: /count is 0/i }),
    ).toBeInTheDocument();
  });
});
