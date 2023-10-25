const favouriteSection = document.getElementById("Fav-container-for-card");

// Handeling click on all over the page using event deligation
document.addEventListener("click", handleClickOnfavroitePage);

// Function to deciede which one is clicked
function handleClickOnfavroitePage(event) {
  const target = event.target;
  console.log(target);
  if (target.className === "fa-solid fa-arrow-right-long") {
    favouriteSection.scrollLeft += 160;
  } else if (target.className === "fa-solid fa-arrow-left-long") {
    favouriteSection.scrollLeft -= 160;
  }
}
// var favMovieDetail = sessionStorage.getItem("fav-item");
// var favDisplay = JSON.parse(favMovieDetail);

// calling show list
showFavroiteList();

// function to load the individual content
async function showFavroiteList() {
  for (i in localStorage) {
    var output = "";
    var obj = JSON.parse(localStorage.getItem(i));
    if (obj != null) {
      console.log(obj);
      console.log(obj.Title);
      let favElement = document.createElement("a");
      favElement.classList.add("Individual-favroite-list");
      favElement.innerHTML = `
    <a
            href="#"
            class="Individual-favroite-list"
            id="Individual-Favroite-List"
          >
            <img src="${
              obj.Poster != "N/A" ? obj.Poster : "Images/pxfuel.jpg"
            }" alt="" class="favroite-image" />
            <div class="Favroit-content">
              <h5>${obj.Title}</h5>
              <h5>
                <i class="fa-solid fa-calendar-days"></i> ${obj.Released}
                <i class="fa-solid fa-clock"></i> ${obj.Runtime}
              </h5>
              <h4><span>IMBD</span> <i class="fa-solid fa-star"></i> ${
                obj.imdbRating
              }</h4>
            </div>
          </a>
    `;
      favouriteSection.appendChild(favElement);
    }
    //
  }
}
