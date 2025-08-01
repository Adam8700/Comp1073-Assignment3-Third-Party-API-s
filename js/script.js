document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const pokeInput = document.getElementById("pokeInput");
  const pokeCard = document.getElementById("pokeCard");

  searchBtn.addEventListener("click", () => {
    const query = pokeInput.value.toLowerCase().trim();
    if (!query) {
      pokeCard.innerHTML = `<p>Please enter a Pokémon name or ID.</p>`;
      return;
    }

    // First fetch: Pokémon data
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
        return response.json();
      })
      .then(pokemon => {
        // Extract data
        const name = pokemon.name;
        const imgSrc = pokemon.sprites.front_default;
        const types = pokemon.types.map(t => t.type.name).join(", ");
        const height = pokemon.height;
        const weight = pokemon.weight;
        const encounterUrl = pokemon.location_area_encounters;

        // Display basic info immediately
        pokeCard.innerHTML = `
          <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
          <img src="${imgSrc}" alt="${name}">
          <p><strong>Type:</strong> ${types}</p>
          <p><strong>Height:</strong> ${height}</p>
          <p><strong>Weight:</strong> ${weight}</p>
          <div id="locations"><p><em>Loading locations...</em></p></div>
        `;

        // Second fetch: Encounter locations
        return fetch(encounterUrl);
      })
      .then(res => res.json())
      .then(locations => {
        const locationContainer = document.getElementById("locations");
        if (locations.length === 0) {
          locationContainer.innerHTML = `<p><strong>Found in:</strong> Not available in the wild.</p>`;
        } else {
          const locationList = locations
            .map(loc => `<li>${loc.location_area.name.replace(/-/g, " ")}</li>`)
            .join("");
          locationContainer.innerHTML = `
            <p><strong>Found in:</strong></p>
            <ul>${locationList}</ul>
          `;
        }
      })
      .catch(error => {
        pokeCard.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});
