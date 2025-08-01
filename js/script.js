// Wait for the DOM to be ready
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

        // Inject HTML
        pokeCard.innerHTML = `
          <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
          <img src="${imgSrc}" alt="${name}">
          <p><strong>Type:</strong> ${types}</p>
        `;
      })
      .catch(error => {
        pokeCard.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});
