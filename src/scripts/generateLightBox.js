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
    el.addEventListener("click", () => {
      console.log(el);
      lightbox.innerHTML = "";
      lightbox.appendChild(elUrl);
      lightWrapper.style.display = "flex";
    });
  });
};

export default generateLightBox;
