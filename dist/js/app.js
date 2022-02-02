"use strict"
//Get elements
const key = "563492ad6f917000010000016a80b9c70d15412ba67a3c00072cd368";
const galleryOfPhotos = document.querySelector(".photos");
const form = document.querySelector(".form");
const more = document.querySelector(".more__btn");
let searchInput = document.querySelector(".form__input");
let searchValue;
let numberOfPages = 1;
let presentSearch;
let getLink;

//Functions
async function loadPhotos() {
    numberOfPages++;
    if (presentSearch) {
        getLink = `https://api.pexels.com/v1/search?query=${presentSearch}+query&per_page=${numberOfPages}`;
    } else {
        getLink = `https://api.pexels.com/v1/curated?page=1&per_page=${page}`;
    }
    const data = await getApi(getLink);
    generateNew(data);
}
async function curatedPhotos() {
    getLink = "https://api.pexels.com/v1/curated?page=1&per_page=10";
    const data = await getApi(getLink);
    generateNew(data);
}
async function getApi(url) {
    const getData = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: key,
        },
    });
    const data = await getData.json();
    return data;
}

async function searchPhotos(query) {
    empty();
    getLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=10`;
    const data = await getApi(getLink);
    generateNew(data);
}

function empty() {
    galleryOfPhotos.innerHTML = "";
    searchInput.value = "";
}

function generateNew(data) {
    data.photos.forEach((photo) => {
        const galleryBlock = document.createElement("div");
        galleryBlock.classList.add("gallery__image");
        galleryBlock.innerHTML = `
    <img src=${photo.src.large}>
    <div class="gallery__info">
      <p class="gallery__info-name">${photo.photographer}</p>
      <a class="gallery__info-link" href=${photo.src.original} target="_blank">Original size</a>
      <a class="gallery__info-link" href=${photo.src.large} target="_blank">Large size</a>
    </div>
    `;
        galleryOfPhotos.appendChild(galleryBlock);
    });
}

function renovateValue(e) {
    searchValue = e.target.value;
}

//Event Listeners
searchInput.addEventListener("input", renovateValue);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    presentSearch = searchValue;
    searchPhotos(searchValue);
});
more.addEventListener("click", loadPhotos);