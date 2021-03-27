// (function Carousel(ratingElement) {
//   // const stars = ratingElement.querySelectorAll('.star');
//   console.log("testtt ", ratingElement);
// })();

class Carousel extends HTMLElement {
  constructor() {
    super();
    console.log("component created");
    this.addEventListener("click", () => {
      this.style.color === "red"
        ? (this.style.color = "blue")
        : (this.style.color = "red");
    });
  }
  connectedCallback() {
    console.log("component created 2");

    /*called when the element is
            connected to the page
       */
    this.style.color = "blue";
    const template = document.querySelector("template");

    const clone = document.importNode(template.content, true);

    // this.appendChild(clone);
  }
}
customElements.define("my-carousel", Carousel);
