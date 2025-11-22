import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

beforeAll(() => {
  jest.spyOn(axios, "get").mockImplementation((url) => {
    if (url.includes("/")) {
      return Promise.resolve({
        data: [],
      });
    }
    return Promise.reject(new Error("Not Found"));
  });
});

beforeEach(() => {
  jest.clearAllMocks();
});
