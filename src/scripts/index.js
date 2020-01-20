import fetchData from "./fetchData";
import prepareArray from "./prepareArray";
import createElements from "./createElements";
// import generateLightBox from "./generateLightBox";
import "../styles/index.scss";
const target = document.getElementById("app");
const button = document.querySelector("button");

const API_KEY = process.env.API_KEY;
let searchTerm = "watercolor";
let apiURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&text=${searchTerm}&api_key=`;

const init = async api => {
  const data = await fetchData(api + API_KEY);
  await createElements(prepareArray(data.photos.photo, target));
};

button.addEventListener("click", () => {
  searchTerm = document.querySelector(".form__field").value;

  if (searchTerm) {
    apiURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&text=${searchTerm}&api_key=`;

    init(apiURL);
  }
});

init(apiURL);
