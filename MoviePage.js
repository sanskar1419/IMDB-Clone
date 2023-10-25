// Storing the object containg details to session Storage in variable result
var movieDetailsgot = sessionStorage.getItem("MovieDetails");
var result = JSON.parse(movieDetailsgot);

// Calling display Movie detaile
displayMovieDetails(result);
const favButton = document.getElementById("Fav-btn");

// Appling click event to to favrouite Button
favButton.addEventListener("click", addToFavroite);

// Fuction to to store the object containg detail to fav-item
function addToFavroite() {
  sessionStorage.setItem("fav-item", JSON.stringify(result));
  addMovieToFavList();
  return;
}

// Function to Store the every object containg detail with different id and value pair local storage
async function addMovieToFavList() {
  localStorage.setItem(
    Math.random().toString(36).slice(2, 7),
    JSON.stringify(result)
  );
  alert("Movie Added to Watchlist!");
}

// function to display the movie deatils in the page based on the clicked Item
function displayMovieDetails(details) {
  // window.location.href = "MoviePage.html";
  aboutMovie.innerHTML = `
  <div class="aboutMovieImageContainer">
  <img src="${
    details.Poster != "N/A" ? details.Poster : "Images/pxfuel.jpg"
  }" alt="" />
  <button class="Go-back">
    <a href="IMDBClone.html">Go-back</a>
  </button>
</div>
<div class="aboutMovieContentContainer">
  <h1>${details.Title}</h1>
  <div class="movieTitle">
    <ul>
      <li class="HQ">High Quality</li>
      <li class="HD">HD</li>
      <li class="MovieType">${details.Genre}</li>
    </ul>
  </div>
  <div class="movieRelease">
    <ul>
      <li><i class="fa-solid fa-calendar-days"></i> ${details.Released}</li>
      <li><i class="fa-solid fa-clock"></i> ${details.Runtime}</li>
    </ul>
  </div>
  <p>
  ${details.Plot}
  </p>
  <div class="ButtonAndCastContainer">
    <div class="castDetails">
      <h5>Director: <span>${details.Director}</span></h5>
      <hr />
      <h5>
        Writers:
        <span>${details.Writer}</span>
      </h5>
      <hr />
      <h5>
        Stars:
        <span>${details.Actors}</span>
      </h5>
    </div>
    <div class="buttonAndRating">
      <i class="fa-solid fa-star"></i>
      <span>${details.imdbRating}/10</span>
      <br />
      <h4>Collection : ${details.BoxOffice}</h4>
      <div class="buttonContainer" id="Fav-btn">
        <button type="submit">Add to favourite</button>
      </div>
    </div>
  </div>
</div>
  `;
}
