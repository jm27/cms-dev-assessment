// Select cards div for display and set variable for end point url
// const cardsDiv = document.querySelector(".cards");
const baseEndPoint = `https://sv-reqres.now.sh/api`;
const itemsPerPage = `?per_page=15`;
const slideContent = document.querySelectorAll(".slide-content");
// Select Nav Buttons
// const navBtns = document.querySelectorAll(".nav-btns");
// Get data from end point set listings as default query
async function getData(query = "listings") {
  // cardsDiv.innerHTML = `<h1>loading..</h1>`;
  const response = await fetch(`${baseEndPoint}/${query}/${itemsPerPage}`);
  const data = await response.json();
  return data.data;
}

// Display data
async function fetchAndDisplay(query) {
  const data = await getData(query);

  slideContent.forEach(
    (div, index) =>
      (div.innerHTML = `
      <img onerror='this.src="../../comps/fallback.jpg"' 
      src=${data[index].mediaurl} 
      alt="item photo" 
      class="card-img img-${index}">
      </img>
      <div class="container">
          <h3><b>${data[index].title}</b></h3>
          <p class="description d-${index}">${data[index].description}</p>
      </div>`)
  );

  // const html = data
  //   .map(
  //     (item, index) => `
  //     <div class="card data-card-${index} slide">
  //             <img onerror='this.src="../../comps/fallback.jpg"' src=${item.mediaurl} alt="item photo" class="card-img img-${index}"></img>
  //         <div class="container c-${index}">
  //               <h3><b>${item.title}</b></h3>
  //               <p class="description d-${index}">${item.description}</p>
  //         </div>
  //      </div>
  //     `
  //   )
  //   .join("");
  // cardsDiv.innerHTML = html;
}

// Handle Error
function handleError(err) {
  console.log(`Looks like there was an error: ${err}`);
}

// Handle Nav Buttons click
// function handleClick(event) {
//   console.log(event.target.value);
//   // cardsDiv.innerHTML = "";
//   slideContent.forEach((div) => (div.innerHTML = ""));
//   fetchAndDisplay(event.target.value).catch(handleError);
// }

// Add on click Event listener to all Nav Buttons
// navBtns.forEach((btn) => btn.addEventListener("mousedown", handleClick));
// navBtns.forEach((btn) => btn.addEventListener("keyup", handleClick));
// On load get data and populate cards
fetchAndDisplay().catch(handleError);
