import fetchData from "./partials/_fetchData";
import prepareArray from "./partials/_prepareArray";
import createElements from "./partials/_createElements";
import "../styles/index.scss";

const target = document.getElementById("app");
const button = document.querySelector("button");
const COMMON_URL = process.env.COMMON_URL;
const API_KEY = process.env.API_KEY;

let page = 1;
let searchTerm = "watercolor";
let apiURL = `${COMMON_URL}&page=${page}&text=${searchTerm}&api_key=${API_KEY}`;

const init = async (api, page) => {
  const data = await fetchData(api);
  createElements(prepareArray(data.photos.photo, target, page), page);
  infiniteScroll(page);
};

const infiniteScroll = page => {
  try {
    const options = {};
    const lastGalleryItem = document.querySelector(
      ".gallery__container:last-child"
    );
    if (lastGalleryItem) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            page++;
            apiURL = `${COMMON_URL}&page=${page}&text=${searchTerm}&api_key=${API_KEY}`;
            init(apiURL, page);
            observer.unobserve(lastGalleryItem);
          }
        });
      }, options);

      observer.observe(lastGalleryItem);
    }
  } catch (err) {
    console.log("Error from observer:", err);
  }
};

button.addEventListener("click", () => {
  searchTerm = document.querySelector(".form__field").value;
  if (searchTerm) {
    apiURL = `${COMMON_URL}&page=${page}&text=${searchTerm}&api_key=${API_KEY}`;

    init(apiURL, page);
  }
});

document.body.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.querySelector(".form__submit").click();
  }
});

init(apiURL, page);
