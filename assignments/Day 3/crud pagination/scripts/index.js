// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const stateURL = `${baseServerURL}/states`;
let mainSection = document.getElementById("data-list-wrapper");
let paginationWrapper = document.getElementById("pagination-wrapper");

// state
let stateNameInput = document.getElementById("state-Name");
let stateImageInput = document.getElementById("state-image");
let statecapitalInput = document.getElementById("state-capital");
let statepopulationInput = document.getElementById("state-population");
let statelanguageInput = document.getElementById("state-language");
let stateGDPRankingInput = document.getElementById("state-GDPRanking");
let stateRegionInput = document.getElementById("state-region");
let statetourismPlacesInput = document.getElementById("state-tourismPlaces");
let stateCreateBtn = document.getElementById("add-state");

// Update state
let updateStateIdInput = document.getElementById("update-state-id");
let updatestateNameInput = document.getElementById("update-state-Name");
let updateStateImageInput = document.getElementById("update-state-image");
let updateStatecapitalInput = document.getElementById("update-state-capital");
let updateStatepopulationInput = document.getElementById(
  "update-state-population"
);
let updateStatelanguageInput = document.getElementById("update-state-language");
let updateStateGDPRankingInput = document.getElementById(
  "update-state-GDPRanking"
);
let updateStateRegionInput = document.getElementById("update-state-region");

let updateStatetourismPlacesInput = document.getElementById(
  "update-state-tourismPlaces"
);
let updateStateBtn = document.getElementById("update-state");

//Update GDPRanking
let updateGDPStateId = document.getElementById("update-GDP-state-id");
let updateGDPRankingStateGDPRanking = document.getElementById(
  "update-GDP-state-GDPRanking"
);
let updateGDPRankingStateBtn = document.getElementById("update-GDP-stateBtn");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterNortheast = document.getElementById("filter-North-East-India");
let filterWest = document.getElementById("filter-West-India");
let filterNorth = document.getElementById("filter-North-India");

//Search by name/language
let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

//States Data
let statesData = [];
let queryParamString = null;
let pageNumber = 1;

// Function to fetch and display states with pagination
async function fetchAndDisplayStates() {
  try {
    const response = await fetch(`${stateURL}?_page=${pageNumber}&_limit=5`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const totalCount = response.headers.get("X-Total-Count");
    updatePaginationButtons(totalCount);

    const data = await response.json();
    statesData = data;

    // Clear existing cards
    mainSection.innerHTML = "";

    // Create the card-list container
    const cardListContainer = document.createElement("div");
    cardListContainer.classList.add("card-list");

    // Loop through the fetched data and create cards
    data.forEach((state) => {
      const card = createCard(state);
      cardListContainer.appendChild(card);
    });

    // Append the card-list container to the mainSection
    mainSection.appendChild(cardListContainer);
  } catch (error) {
    console.error("Error fetching and displaying states:", error.message);
  }
}

// Function to create a single card element
function createCard(state) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = state.id;

  const cardImg = document.createElement("div");
  cardImg.classList.add("card-img");
  const img = document.createElement("img");
  img.src = state.image;
  cardImg.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const h5 = document.createElement("h5");
  h5.classList.add("card-stateName");
  h5.textContent = state.stateName;

  const pCapital = document.createElement("p");
  pCapital.classList.add("card-capital");
  pCapital.textContent = `Capital: ${state.capital}`;

  const pPopulation = document.createElement("p");
  pPopulation.classList.add("card-population");
  pPopulation.textContent = `Population: ${state.population}`;

  const pRegion = document.createElement("p");
  pRegion.classList.add("card-region");
  pRegion.textContent = `Region: ${state.region}`;

  const pLanguage = document.createElement("p");
  pLanguage.classList.add("card-language");
  pLanguage.textContent = `Language: ${state.language}`;

  const pGDPRanking = document.createElement("p");
  pGDPRanking.classList.add("card-GDPRanking");
  pGDPRanking.textContent = `GDPRanking: ${state.GDPRanking}`;

  const pTourismPlaces = document.createElement("p");
  pTourismPlaces.classList.add("card-tourismPlaces");
  pTourismPlaces.textContent = `Tourism Places: ${state.tourismPlaces.join(
    ", "
  )}`;

  const aEdit = document.createElement("a");
  aEdit.classList.add("card-link");
  aEdit.href = "#";
  aEdit.textContent = "Edit";
  aEdit.dataset.id = state.id;
  aEdit.addEventListener("click", (event) => {
    event.preventDefault();
    // Populate the update fields with the current state data
    populateUpdateFields(state);
  });

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("card-button");
  buttonDelete.textContent = "Delete";
  buttonDelete.dataset.id = state.id;
  buttonDelete.addEventListener("click", () => {
    // Call the function to delete the state
    deleteState(state.id);
  });

  // Append all elements to cardBody
  cardBody.appendChild(h5);
  cardBody.appendChild(pCapital);
  cardBody.appendChild(pPopulation);
  cardBody.appendChild(pRegion);
  cardBody.appendChild(pLanguage);
  cardBody.appendChild(pGDPRanking);
  cardBody.appendChild(pTourismPlaces);
  cardBody.appendChild(aEdit);
  cardBody.appendChild(buttonDelete);

  // Append cardImg and cardBody to the card
  card.appendChild(cardImg);
  card.appendChild(cardBody);

  return card;
}

function updatePaginationButtons(totalCount) {
  const totalPages = Math.ceil(totalCount / 5);
  paginationWrapper.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      pageNumber = i;
      fetchAndDisplayStates();
    });
    paginationWrapper.appendChild(button);
  }
}

// Function to handle the addition of a new state
function addNewState() {
  const newState = {
    stateName: stateNameInput.value,
    population: parseInt(statepopulationInput.value),
    GDPRanking: stateGDPRankingInput.value,
    image: stateImageInput.value,
    language: statelanguageInput.value,
    capital: statecapitalInput.value,
    region: stateRegionInput.value,
    tourismPlaces: statetourismPlacesInput.value
      .split(",")
      .map((place) => place.trim()),
  };

  fetch(stateURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newState),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      fetchAndDisplayStates();
    })
    .catch((error) => {
      console.error("Error adding new state:", error.message);
    });
}

// Function to handle edit action when clicking on card-link
function editState(stateId) {
  // Fetch the state details based on the stateId
  const stateToEdit = statesData.find((state) => state.id === stateId);

  // Populate the update fields with the state details
  updateStateIdInput.value = stateToEdit.id;
  updatestateNameInput.value = stateToEdit.stateName;
  updateStateImageInput.value = stateToEdit.image;
  updateStatecapitalInput.value = stateToEdit.capital;
  updateStatepopulationInput.value = stateToEdit.population;
  updateStatelanguageInput.value = stateToEdit.language;
  updateStateGDPRankingInput.value = stateToEdit.GDPRanking;
  updateStateRegionInput.value = stateToEdit.region;
  updateStatetourismPlacesInput.value = stateToEdit.tourismPlaces.join(", ");

  // Scroll to the update section for better visibility
  document
    .getElementById("update-state-id")
    .scrollIntoView({ behavior: "smooth" });
}

// Event delegation: Add click event listener to the mainSection and check if the target is the 'Delete' button
mainSection.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("card-button")) {
    const stateId = target.dataset.id;
    deleteState(stateId);
  }
});

// Event listener for card-link click
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("card-link")) {
    event.preventDefault();
    const stateId = event.target.dataset.id;
    editState(stateId);
  }
});

// Function to handle the deletion of a state
function deleteState(stateId) {
  fetch(`${stateURL}/${stateId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      fetchAndDisplayStates();
    })
    .catch((error) => {
      console.error("Error deleting state:", error.message);
    });
}

// Function to handle update action when clicking on update-state button
async function updateState() {
  try {
    const stateId = updateStateIdInput.value;

    // Fetch existing state data
    const response = await fetch(`${baseServerURL}/states/${stateId}`);
    const existingStateData = await response.json();

    // Update only the non-empty fields
    const updatedStateData = {
      stateName: updatestateNameInput.value || existingStateData.stateName,
      image: updateStateImageInput.value || existingStateData.image,
      capital: updateStatecapitalInput.value || existingStateData.capital,
      population:
        updateStatepopulationInput.value || existingStateData.population,
      language: updateStatelanguageInput.value || existingStateData.language,
      GDPRanking:
        updateStateGDPRankingInput.value || existingStateData.GDPRanking,
      region: updateStateRegionInput.value || existingStateData.region,
      tourismPlaces: updateStatetourismPlacesInput.value
        ? updateStatetourismPlacesInput.value
            .split(",")
            .map((place) => place.trim())
        : existingStateData.tourismPlaces,
    };

    // Make PATCH request to update state data
    await fetch(`${baseServerURL}/states/${stateId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStateData),
    });

    // Fetch and display updated states data
    await fetchAndDisplayStates();
  } catch (error) {
    console.error("Error updating state:", error.message);
  }
}


// Function to handle update action when clicking on update-GDP-stateBtn button
async function updateGDPRankingState() {
  try {
    const stateId = updateGDPStateId.value;
    const updatedGDPRanking = updateGDPRankingStateGDPRanking.value;

    // Check if GDPRanking is not blank
    if (!updatedGDPRanking.trim()) {
      console.log("GDPRanking cannot be empty");
      return;
    }

    // Make GET request to get existing state data
    const response = await fetch(`${baseServerURL}/states/${stateId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const existingStateData = await response.json();

    // Update only the GDPRanking field
    const updatedStateData = {
      ...existingStateData,
      GDPRanking: updatedGDPRanking,
    };

    // Make PATCH request to update only GDPRanking
    await fetch(`${baseServerURL}/states/${stateId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStateData),
    });

    // Fetch and display updated states data
    await fetchAndDisplayStates();
  } catch (error) {
    console.error("Error updating GDPRanking:", error.message);
  }
}

function populateUpdateFields(state) {
  updateGDPStateId.value = state.id;
  updateGDPRankingStateGDPRanking.value = state.GDPRanking;
}

// Event listener for update-GDP-stateBtn button click
updateGDPRankingStateBtn.addEventListener("click", updateGDPRankingState);

// Event listener for update-state button click
updateStateBtn.addEventListener("click", updateState);

// Add click event listener to the 'Add States' button
stateCreateBtn.addEventListener("click", addNewState);

// Call the fetchAndDisplayStates function on page load
document.addEventListener("DOMContentLoaded", fetchAndDisplayStates);

// Event listener for Sort Low To High button
sortAtoZBtn.addEventListener("click", async () => {
  try {
    // Fetch the states and sort based on GDPRanking in ascending order
    const sortedStates = await fetchAndSortStates("GDPRanking", "asc");

    // Display the sorted states
    displayStates(sortedStates);
  } catch (error) {
    console.error("Error sorting states:", error.message);
  }
});

// Event listener for Sort High To Low button
sortZtoABtn.addEventListener("click", async () => {
  try {
    // Fetch the states and sort based on GDPRanking in descending order
    const sortedStates = await fetchAndSortStates("GDPRanking", "desc");

    // Display the sorted states
    displayStates(sortedStates);
  } catch (error) {
    console.error("Error sorting states:", error.message);
  }
});

// Function to fetch and sort states based on a specified key and order
async function fetchAndSortStates(key, order) {
  try {
    const response = await fetch(
      `${stateURL}?_sort=${key}&_order=${order}&_page=${pageNumber}&_limit=5`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    statesData = data;
    return data;
  } catch (error) {
    throw new Error("Error fetching and sorting states:", error.message);
  }
}

// Function to display states
function displayStates(states) {
  // Clear existing cards
  mainSection.innerHTML = "";

  // Loop through the fetched data and create cards
  states.forEach((state) => {
    const card = createCard(state);
    mainSection.appendChild(card);
  });
}

// Event listener for North East India filter button
filterNortheast.addEventListener("click", async () => {
  try {
    // Fetch the states and filter based on region (North East India)
    const filteredStates = await fetchAndFilterStates(
      "region",
      "North East India"
    );

    // Display the filtered states
    displayStates(filteredStates);
  } catch (error) {
    console.error("Error filtering states:", error.message);
  }
});

// Event listener for West India filter button
filterWest.addEventListener("click", async () => {
  try {
    // Fetch the states and filter based on region (West India)
    const filteredStates = await fetchAndFilterStates("region", "West India");

    // Display the filtered states
    displayStates(filteredStates);
  } catch (error) {
    console.error("Error filtering states:", error.message);
  }
});

// Event listener for North India filter button
filterNorth.addEventListener("click", async () => {
  try {
    // Fetch the states and filter based on region (North India)
    const filteredStates = await fetchAndFilterStates("region", "North India");

    // Display the filtered states
    displayStates(filteredStates);
  } catch (error) {
    console.error("Error filtering states:", error.message);
  }
});

// Function to fetch and filter states based on a specified key and value
async function fetchAndFilterStates(key, value) {
  try {
    const response = await fetch(
      `${stateURL}?${key}=${value}&_page=${pageNumber}&_limit=5`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    statesData = data;
    return data;
  } catch (error) {
    throw new Error("Error fetching and filtering states:", error.message);
  }
}



// Function to handle search functionality
function handleSearch() {
  const searchBySelect = document.getElementById("search-by-select");
  const searchByInput = document.getElementById("search-by-input").value.toLowerCase();
  const searchBy = searchBySelect.value;

  // Filter states based on the selected search criteria and query
  const filteredStates = statesData.filter(state => {
    if (searchBy === "stateName") {
      return state.stateName.toLowerCase().includes(searchByInput);
    } else if (searchBy === "language") {
      return state.language.toLowerCase().includes(searchByInput);
    }
  });

  // Display filtered states
  displayStates(filteredStates);
}

// Event listener for search button click
searchByButton.addEventListener("click", handleSearch);
