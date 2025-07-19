import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; 
import Footer from "../../components/common/Footer";

describe("Footer component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
  });

  it("displays the correct copyright text", () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© 2025 shoppify. All rights reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });
});