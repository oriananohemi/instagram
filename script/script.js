const next = document.getElementById("next");

const previous = document.getElementById("previous");

const modal = document.getElementById("modal");

const loadJSON = callback => {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "./images.json", true);
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
    img.addEventListener("click", show);
    img.setAttribute("data-id", container.childNodes.length);
    img.setAttribute("alt", name);
    container.appendChild(img);
  }
};

const nextId = id => {
  if (id + 1 !== 10) {
    next.style.display = "block";
    return id + 1;
  } else {
    next.style.display = "none";
  }
};

const previousId = id => {
  if (id - 1 !== 0) {
    previous.style.display = "block";
    return id - 1;
  } else {
    previous.style.display = "none";
  }
};

function show(evento) {
  const id = Number(evento.target.getAttribute("data-id"));
  addImageToModalById(id);
  next.setAttribute("data-id", nextId(id));
  previous.setAttribute("data-id", previousId(id));
}

function addImageToModalById(id) {
  const images = document.querySelectorAll("img[data-id]");
  const image = Array.from(images).find(
    image => image.getAttribute("data-id") == id
  );
  const copyimg = image.cloneNode(true);
  modal.appendChild(copyimg);
  modal.classList.remove("hidden");
}

document.getElementById("close").addEventListener("click", hidden);

function hidden() {
  modal.classList.add("hidden");
  deleteModalImg();
}

function deleteModalImg() {
  let copyimg = modal.getElementsByClassName("img")[0];
  modal.removeChild(copyimg);
}

next.addEventListener("click", showNextImg);

function showNextImg(evento) {
  deleteModalImg();
  show(evento);
}

previous.addEventListener("click", showPreviousImg);

function showPreviousImg(evento) {
  deleteModalImg();
  show(evento);
}
