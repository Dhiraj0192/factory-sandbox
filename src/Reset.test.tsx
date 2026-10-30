import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Reset", () => {
  it("sets the counter back to 0", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: /count is 0/i }));
    await userEvent.click(screen.getByRole("button", { name: /count is 1/i }));
    expect(
      screen.getByRole("button", { name: /count is 2/i }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(
      screen.getByRole("button", { name: /count is 0/i }),
    ).toBeInTheDocument();
  });
});
