import prepareArray from "./_prepareArray";

const mockArray = [
  {
    id: "49392086867",
    owner: "53025731@N05",
    secret: "218d63f6d8",
    server: "65535",
    farm: 66,
    title: "WaterColor - Impressionism - waterfall 1",
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  }
];

test("Passing array and expecting array", () => {
  const result = prepareArray(mockArray, global.document.body, 1);
  global.window.console.log(result);
  const output = [
    {
      title: mockArray.title,
      url: `https://farm${mockArray.farm}.staticflickr.com/${mockArray.server}/${mockArray.id}_${mockArray.secret}.jpg`
    }
  ];
  expect(result.toString()).toBe(output.toString());
});
