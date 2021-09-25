// This is openlibrary.org api end point.
const END_POINT = "http://openlibrary.org/search.json?q=";

const main2 = document.getElementById("main-2");

const searchBook = (query) => {
  url = `http://openlibrary.org/search.json?q=${query}`;
  fetch(url)
    .then((response) => response.json())

    .then((data) => data.docs)
    .then((docs) => {
      const titles = docs.map((element) => element.title);
      const link = docs.map((element) => element.key);
      const cover_edition_key = docs.map(
        (element) => element.cover_edition_key
      );

      cardGen(titles, link, cover_edition_key);
    })
    .catch((error) => console.log(error));
};
const cardGen = (titles, link, cover_edition_key) => {
  main2.innerHTML = "";
  let i = 0;
  while (i < titles.length) {
    const cardPrep = document.createElement("div");
    cardPrep.innerHTML = `<div class="bookCard"><img class="card-img" src="https://covers.openlibrary.org/b/olid/${cover_edition_key[i]}-L.jpg"  alt="${titles[i]} cover"/><div class="container"><h3>${titles[i]}</h3><a class="card-btn"href="http://openlibrary.org/${link[i]}" target="_blank">Library</a></div>`;
    main2.appendChild(cardPrep);

    i++;
  }
};

window.onload = () => {
  const searchTextElemenet = document.getElementById("searchText");

  searchTextElemenet.addEventListener("keydown", (event) => {
    if ("Enter" === event.key) {
      searchBook(searchTextElemenet.value);
    }
  });
};

const searchButton = document
  .getElementById("searchButton")
  .addEventListener("click", () => {
    const searchTextElemenet = document.getElementById("searchText");
    searchBook(searchTextElemenet.value);
  });
