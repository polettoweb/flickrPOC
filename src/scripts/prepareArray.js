export const prepareArray = (photos = [], target, page = 1) => {
  try {
    let array = [];
    if (photos.length > 0) {
      photos.forEach(el => {
        const farm = el.farm;
        const server = el.server;
        const id = el.id;
        const secret = el.secret;
        const title = el.title;

        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        array.push({
          title,
          url
        });
      });
      if (page == 1) {
        target.innerHTML = "";
      }
      if (array.length > 1) {
        array.forEach((el, i) => {
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
    return array;
  } catch (err) {
    console.log("Error on PrepareObj", err);
  }
};

export default prepareArray;
