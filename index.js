

 const apiKey = "aMbVJDoXPX65BXL0AGebfpTLUdP93U8Wnxk-jtyIrCA"; // Correct API Key

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  
  if (!inputData) {
    alert("Please enter a search term!");
    return;
  }
  
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch results');
    }

    const data = await response.json();

    if (page === 1) {
      searchResultsEl.innerHTML = ""; // Clear previous results for new search
    }

    const results = data.results;

    if (results.length === 0) {
      searchResultsEl.innerHTML = "<p>No results found. Please try another search.</p>";
      return;
    }

    results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResultsEl.appendChild(imageWrapper);
    });

    page++; // Increment page for next search

    if (page > 1) {
      showMoreButtonEl.style.display = "block"; // Show "Show More" button if on page > 1
    }

  } catch (error) {
    console.error("Error fetching data: ", error);
    alert("Something went wrong, please try again.");
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission and page refresh
  page = 1; // Reset page number for new search
  searchImages(); // Trigger image search
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages(); // Trigger next page of search results
});
