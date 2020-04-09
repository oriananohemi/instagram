const loadJSON = callback => {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "../images.json", true);
  xobj.onreadystatechange = () => {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
};

loadJSON(res => {
  const data = JSON.parse(res);
  loadImg(data);
});

const loadImg = data => {
  const pathRoot = data.path_root;
  const image = data.images;
  const container = document.getElementById("collection");
  for (i = 0; i < image.length; i++) {
    const img = document.createElement("img");
    const name = image[i].title;
    const path = `${pathRoot}${image[i].name}`;
    img.setAttribute("src", path);
    img.setAttribute("class", "img");
    container.appendChild(img);
  }
};

function cargar() {
  const collections = document.querySelectorAll("#collection > img");
  collections.forEach(collection => collection.addEventListener("click", show));
}

cargar();

let modal = document.getElementById("modal");

function show(evento) {
  let image = evento.target;
  let copyimg = image.cloneNode(true);
  modal.appendChild(copyimg);
  modal.classList.remove("hidden");
}

document.getElementById("close").addEventListener("click", hidden);

function hidden() {
  let copyimg = modal.getElementsByClassName("img")[0];
  modal.removeChild(copyimg);
  modal.classList.add("hidden");
}

document.getElementById("behind").addEventListener("click", behind);

function behind(evento) {
  console.log(evento.target);
}
