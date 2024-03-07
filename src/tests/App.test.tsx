import { render,  } from "@testing-library/react";
import { describe,  it } from "vitest";
import App from "../App";

describe(App.name, () => {
  it("should render", () => {
    render(<App />);
   // expect(screen.getByLabelText("Slet")).toBeInTheDocument();
  });
});

