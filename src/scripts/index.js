import fetchData from "./fetchData";
import "../styles/index.scss";
const target = document.getElementById("app");

const API_KEY = process.env.API_KEY;
const apiURL =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&text=watercolor&api_key=";
let imagesForGallery = [];

const prepareArray = (photos = [], target) => {
  try {
    if (photos.length > 0) {
      photos.forEach(el => {
        const farm = el.farm;
        const server = el.server;
        const id = el.id;
        const secret = el.secret;
        const title = el.title;
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        imagesForGallery.push({
          title,
          url
        });
      });
      target.innerHTML = "";
      if (imagesForGallery.length > 1) {
        imagesForGallery.forEach((el, i) => {
          const container = document.createElement("div");
          const loader = document.createElement("div");
          container.setAttribute("class", `gallery__container image-${i}`);
          container.setAttribute("ref", i);
          loader.setAttribute("class", "image-loading");
          container.appendChild(loader);
          target.appendChild(container);
        });
      }
    } else {
      target.innerHTML = "";
      const message = document.createElement("p");
      message.innerText = "No images found for the current keyword";
      target.appendChild(message);
    }
  } catch (err) {
    console.log("Error on PrepareObj", err);
  }
};

const createElements = (array = []) => {
  try {
    array.forEach((el, i) => {
      const image = new Image();
      const title = document.createElement("p");
      image.setAttribute("class", "gallery__image");
      image.src = el.url;
      image.alt = el.title;
      title.innerText = el.title;
      title.setAttribute("class", "gallery__text");
      let itemToInject = document.querySelector(`.image-${i}`);
      let loaderToRemove = document
        .querySelector(`.image-${i}`)
        .querySelector(".image-loading");
      itemToInject.appendChild(image);
      itemToInject.appendChild(title);

      image.onload = () => {
        //removing loader after the image has loaded correctly
        itemToInject.removeChild(loaderToRemove);
        image.setAttribute("data-cy", "image");
      };

      image.onerror = () => {
        //removing container and spinner if the image has problems loading or 404 on the server
        document.querySelectorAll(".gallery__container")[i].remove();
        console.log(
          `WARNING: The image ${el.url} is not available, removing from the DOM...`
        );
      };
    });
  } catch (err) {
    console.log("Error from createElements", err);
  }
};

const init = async () => {
  const data = await fetchData(apiURL + API_KEY);
  await prepareArray(data.photos.photo, target);
  await createElements(imagesForGallery);
  generateLightBox();
};

const generateLightBox = () => {
  const lightWrapper = document.getElementById("lightbox");
  const elToClick = document.querySelectorAll(".gallery__container");
  const lightbox = document.querySelector(".lightbox__container");

  lightWrapper.addEventListener("click", () => {
    lightWrapper.style.display = "none";
  });

  elToClick.forEach(el => {
    const elAttr = el.getAttribute("ref");
    const elUrl = document
      .querySelector(`[ref="${elAttr}"]`)
      .querySelector("img")
      .cloneNode();
    console.log(elUrl);
    el.addEventListener("click", () => {
      console.log(el);
      lightbox.innerHTML = "";
      lightbox.appendChild(elUrl);
      lightWrapper.style.display = "flex";
    });
  });
};

init();
