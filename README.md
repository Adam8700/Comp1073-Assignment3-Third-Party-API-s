Pokémon Info Viewer (Assignment 3 – Third-Party APIs)

My web application uses the [PokéAPI](https://pokeapi.co/) (https://pokeapi.co/docs/v2) to fetch and display information about any Pokémon by name or ID.

- Search for any Pokémon by name or number
- Display:
  - Name
  - Normal sprite
  - Shiny sprite
  - Type(s)
  - Height (in meters)
  - Weight (in kilograms)
  - Wild encounter locations grouped by game version
  - Collapsible encounter lists

- PokéAPI
  - Official Docs: https://pokeapi.co/docs/v2
  - Main Endpoint: https://pokeapi.co/api/v2/pokemon/{id or name}
  - Additional Endpoints:
    - Encounter locations: /pokemon/{id}/encounters


Enter a Pokémon name (e.g. bulbasaur) or ID (e.g. 1) into the input field.
Click “Search” to load information about the Pokémon.
Expand the collapsible game versions under "Found in" to view wild encounter locations.

