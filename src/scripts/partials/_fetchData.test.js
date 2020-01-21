import fetchData from "./fetchData";

describe("testing api", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls fetchData and returns data", () => {
    fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));

    //assert on the response
    fetchData("https://jsonplaceholder.typicode.com/posts").then(res => {
      expect(res.data).toEqual("12345");
    });

    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      "https://jsonplaceholder.typicode.com/posts"
    );
  });
});
