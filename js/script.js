var annotation = new Annotation(154, 27, 250, 100, "The median temperature rise in March has increased over years", "#area")
var loadC = document.getElementsByClassName("load-container")[0];
let show = () => {
    setTimeout(() => {
      loadC.style.display = "none";
    },2000)
  }