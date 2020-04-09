function cargar() {
  const collections = document.querySelectorAll("#collection > img");
  collections.forEach(collection => collection.addEventListener("click", show));
}

cargar();

let modal = document.getElementById("modal");

function show(evento) {
  let img = evento.target;
  let copyimg = img.cloneNode(true);
  modal.appendChild(copyimg);
  modal.classList.remove("hidden");
}

document.getElementById("close").addEventListener("click", hidden);

function hidden() {
  let copyimg = modal.getElementsByClassName("img")[0];
  modal.removeChild(copyimg);
  modal.classList.add("hidden");
}
