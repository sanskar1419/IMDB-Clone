let popularPlaylistContainer = document.getElementById("playlist-container");
const searchInput = document.getElementById("Search-Bar");
const searchMenu = document.getElementById("Search-Menu");
const aboutMovie = document.getElementById("About-movie");

// ---------------------------------------------------------------------------------------------
// Handeling click using Event deligation
document.addEventListener("click", handleClickOnScreen);

// Function to handel click all over the screen
function handleClickOnScreen(event) {
  const target = event.target;
  console.log(target);
  if (target.className === "fa-solid fa-arrow-right") {
    popularPlaylistContainer.scrollLeft += 140;
  } else if (target.className === "fa-solid fa-arrow-left") {
    popularPlaylistContainer.scrollLeft -= 140;
  } else if (target.className === "movie") {
    popularPlaylistContainer.innerHTML = "";
    getMovies(trendingMovie);
  } else if (target.className === "tv-series") {
    popularPlaylistContainer.innerHTML = "";
    getMovies(trendingTVSeries);
  }
  // } else if (target.className === "card") {
  //   console.log("you have clicked");
  //   loadMovieDetails();
  // }
}

// ----------------------------------------------------------------------------------------------------------------------
// Using TMBD API Only for Latest Section

const baseUrl = `https://api.themoviedb.org/3`;
const apiKey_tmdb = `82e6289d5c2670f1feda8b202668b540`;
const trendingMovie = `${baseUrl}/trending/all/week?api_key=${apiKey_tmdb}`;
const trendingTVSeries = `${baseUrl}/tv/top_rated?language=en-US&page=1&api_key=${apiKey_tmdb}`;
const imgUrl = `https://image.tmdb.org/t/p/w200`;

// Function for fetching data for TMBD Server based on the URL Above Mentioned
async function getMovies(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response.results);
      showMovies(response.results);
    });
}

// Function to display the list on Latest section
function showMovies(result) {
  console.log(result);
  result.forEach((element, i) => {
    let {
      title,
      release_date,
      vote_average,
      poster_path,
      original_name,
      first_air_date,
    } = element;
    let card = document.createElement("a");
    card.classList.add("individual-card");
    card.innerHTML = `
            <img src="${imgUrl + poster_path}" alt="poster" class="poster" />
                  <div class="Popular-movie-content">
                    <h5>${title || original_name}</h5>
                    <h5>${release_date || first_air_date}</h5>
                    <h4><span>IMBD</span> <i class="fa-solid fa-star"></i> ${vote_average}</h4>
                  </div>
                  `;
    popularPlaylistContainer.appendChild(card);
  });
}

// Calling get movies
getMovies(trendingMovie);

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Using OMBD API for Search Section

// Function for fetching data through OMBD API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=86dc0ebb`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

// Function for Finding the movie related to to input
function findMovies() {
  let searchTerm = searchInput.value.trim();
  if (searchTerm.length > 0) {
    searchMenu.classList.remove("card-dispay");
    loadMovies(searchTerm);
  } else {
    searchMenu.classList.add("card-dispay");
  }
}

// Function to display the individual movie bellow search bar
function displayMovieList(movies) {
  searchMenu.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieElement = document.createElement("div");
    movieElement.dataset.id = movies[i].imdbID; // setting movie id in  data-id
    movieElement.classList.add("list-item");
    // If the poster that we get through API is not available the mention image will be shown
    if (movies[i].Poster != "N/A") moviePoster = movies[i].Poster;
    else moviePoster = "Images/pxfuel.jpg";

    movieElement.innerHTML = `
      <a href="#" class="card" id="CardIndividualContent">
                    <img src="${moviePoster}" alt="Movie image" />
                    <div class="content">
                      <h3>${movies[i].Title}</h3>
                      <p>${movies[i].Type}</p>
                      <p>
                      ${movies[i].Year} , <span>IMBD</span>
                        <i class="fa-solid fa-star"></i> 9.6}
                      </p>
                    </div>
                  </a>
      `;
    searchMenu.appendChild(movieElement);
  }
  // console.log("you have clicked");
  loadMovieDetails();
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// It is being used to load the content information in Movie Page(MoviePage.html)
function loadMovieDetails() {
  const searchListMovies = searchMenu.querySelectorAll(".list-item");
  // console.log(searchListMovies);
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      console.log(movie.dataset.id);
      searchMenu.classList.add("card-dispay");
      searchInput.value = "";
      const Movieurl = `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=86dc0ebb`;
      const result = await fetch(`${Movieurl}`);
      const movieDetails = await result.json();
      console.log(movieDetails);

      sessionStorage.setItem("MovieDetails", JSON.stringify(movieDetails));
      window.location.href = "MoviePage.html";
    });
  });
}

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
