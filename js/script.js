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
        const shinyImgSrc = pokemon.sprites.front_shiny;
        const types = pokemon.types.map(t => t.type.name).join(", ");
        const height = (pokemon.height / 10).toFixed(1); // in meters
        const weight = (pokemon.weight / 10).toFixed(1); // in kilograms
        const encounterUrl = pokemon.location_area_encounters;

        // Display basic info immediately
        pokeCard.innerHTML = `
  <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
  <div class="sprite-row">
    <div>
      <p><strong>Normal</strong></p>
      <img src="${imgSrc}" alt="${name}">
    </div>
    <div>
      <p><strong>Shiny</strong></p>
      <img src="${shinyImgSrc}" alt="Shiny ${name}">
    </div>
  </div>
  <p><strong>Type:</strong> ${types}</p>
  <p><strong>Height:</strong> ${height} m</p>
  <p><strong>Weight:</strong> ${weight} kg</p>
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
          return;
        }

        // Group locations by game version
        const versionMap = {};
        locations.forEach(loc => {
          loc.version_details.forEach(v => {
            const version = v.version.name;
            if (!versionMap[version]) versionMap[version] = new Set();
            versionMap[version].add(loc.location_area.name.replace(/-/g, " "));
          });
        });

        // Create collapsible UI
        locationContainer.innerHTML = `<p><strong>Found in:</strong></p>`;
        for (const version in versionMap) {
          const details = document.createElement("details");
          const summary = document.createElement("summary");
          summary.textContent = version.toUpperCase();
          details.appendChild(summary);

          const ul = document.createElement("ul");
          [...versionMap[version]].forEach(location => {
            const li = document.createElement("li");
            li.textContent = location;
            ul.appendChild(li);
          });

          details.appendChild(ul);
          locationContainer.appendChild(details);
        }
      })
      .catch(error => {
        pokeCard.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});
