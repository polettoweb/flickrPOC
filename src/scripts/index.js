import fetchData from "./fetchData";
import prepareArray from "./prepareArray";
import createElements from "./createElements";
import "../styles/index.scss";
const target = document.getElementById("app");
const button = document.querySelector("button");

const API_KEY = process.env.API_KEY;
let searchTerm = "watercolor";
let page = 1;
let apiURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&per_page=12&page=${page}&text=${searchTerm}&api_key=${API_KEY}`;

const init = async (api, page) => {
  const data = await fetchData(api);
  await createElements(prepareArray(data.photos.photo, target, page));
};

button.addEventListener("click", () => {
  searchTerm = document.querySelector(".form__field").value;

  if (searchTerm) {
    apiURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&per_page=12&page=${page}&text=${searchTerm}&api_key=${API_KEY}`;

    init(apiURL, page);
  }
});

init(apiURL);

window.addEventListener("scroll", () => {
  let item = document.querySelector(".gallery__container:last-child");
  //   let options = {
  //     root: document,
  //     rootMargin: "0px",
  //     threshold: 1.0
  //   };

  //   let observer = new IntersectionObserver(console.log("HERE"), options);
  //   observer.observe(item);

  //   // console.log(...window.IntersectionObserver);
  //   // let treshold = window.innerHeight + window.scrollY + 100;
  //   // let pageHeight = document.documentElement.scrollHeight;
  //   // console.log(treshold, pageHeight);
  //   // if (treshold === pageHeight) {
  //   //   page++;
  //   // }
  //   // if (treshold >= pageHeight) {
  //   //   console.log(page)
  //   //   apiURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&per_page=12&page=${page}&text=${searchTerm}&api_key=${API_KEY}`;
  //   //   init(apiURL, page);
  //   // }
  if (!!window.IntersectionObserver) {
    console.log("YES");
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          /* Here's where we deal with every intersection */
          if (item.isIntersecting) console.log("YUP");
        });
      },
      { rootMargin: "0px 0px -200px 0px" }
    );

    observer.observe(item);
  }
});
