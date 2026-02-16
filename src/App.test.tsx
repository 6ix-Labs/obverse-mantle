import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("exports the root component", () => {
    expect(App).toBeTypeOf("function");
  });
});
