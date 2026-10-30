import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Decrement", () => {
  it("decreases the counter by 1", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: /decrement/i }));

    expect(
      screen.getByRole("button", { name: /count is -1/i }),
    ).toBeInTheDocument();
  });
});
