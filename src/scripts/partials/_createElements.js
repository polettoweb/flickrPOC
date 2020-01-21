const createElements = (array = [], page = 1) => {
  try {
    array.forEach((el, i) => {
      const image = new Image();
      const title = document.createElement("p");
      const selector = i + 1 + 12 * (page - 1);

      let itemToInject = document.querySelector(`.image-${selector}`);
      let loaderToRemove = document
        .querySelector(`.image-${selector}`)
        .querySelector(".image-loading");

      image.setAttribute("class", "gallery__image");
      image.src = el.url;
      image.alt = el.title;
      title.innerText = el.title;
      title.setAttribute("class", "gallery__text");
      itemToInject.appendChild(image);
      itemToInject.appendChild(title);

      image.onload = () => {
        //removing loader after the image has loaded correctly
        itemToInject.removeChild(loaderToRemove);
        image.setAttribute("data-cy", "image");
      };

      image.onerror = () => {
        //removing container and spinner if the image has problems loading or 404 on the server
        document.querySelector(`.image-${selector}`).remove();
        console.warn(
          `WARNING: IMAGE-${selector} (${el.url}) is not available, removing from the DOM...`
        );
      };
    });
  } catch (err) {
    console.log("Error from createElements", err);
  }
};

export default createElements;
