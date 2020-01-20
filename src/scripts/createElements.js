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

export default createElements;
