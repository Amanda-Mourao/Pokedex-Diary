//Pokemon Fetch 150

// Referenz zum Container-Element, in dem die Pokemon-Karten angezeigt werden
const pokemonContainer = document.getElementById("pokemon-container");
const abilityListe = document.getElementById("liste");
let allPokemons = [];
/**
 * Asynchrone Funktion zum Abrufen von Pokemon-Daten von der PokeAPI
 * id - Die ID des abzurufenden Pokemons
 */
const fetchPokemon = async (id) => {
  try {
    // API-Anfrage an die PokeAPI mit der angegebenen Pokemon-ID
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    // Überprüfen, ob die Anfrage erfolgreich war
    if (!response.ok) {
      throw new Error(`Etwas ist schiefgelaufen. Status: ${response.status}`);
    }

    // Umwandlung der Antwort in JSON-Format
    const pokemon = await response.json();
    console.log(pokemon);
    return pokemon; //Daten Weiterverarbeiten
  } catch (error) {
    //7Wenn try nicht klappt dann hier weietr
    // Fehlerbehandlung: Ausgabe in der Konsole
    console.error(error);
  }
};

/**
 * Asynchrone Funktion zum Anzeigen der ersten 10 Pokemon
 * Erstellt für jedes Pokemon eine Karte mit Bild, Name und Typen
 */
const displayPokemons = async () => {
  // Schleife durch die ersten 10 Pokemon-IDs
  for (let i = 1; i <= 150; i++) {
    // Abrufen der Pokemon-Daten für die aktuelle ID
    const pokemon = await fetchPokemon(i);

    if (pokemon) {
      allPokemons.push(pokemon);
      // Erstellen einer Karte für das Pokemon
      createPokemonCard(pokemon)
    }
  }
};

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredPokemons = allPokemons.filter(pokemon => {
    return (
      pokemon.name.toLowerCase().includes(searchTerm) ||
      pokemon.id.toString() === searchTerm
    );
  });

  // Aktuelle Karten löschen
  pokemonContainer.innerHTML = "";

  // Gefilterte neu anzeigen
  filteredPokemons.forEach(pokemon => {
    createPokemonCard(pokemon);
  });
});



function createPokemonCard(pokemon) {


  
  const header = document.createElement("div");
  header.classList.add("w-full", "flex", "justify-between", "items-center", "mb-2");

  const pokemonName = document.createElement("h2");
  pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  pokemonName.classList.add("text-xl", "font-bold", "mb-2");

  const pokemonHP = document.createElement("p");
  pokemonHP.textContent = `HP: ${pokemon.stats[0].base_stat}`;
  pokemonHP.classList.add("text-red-600");

  header.appendChild(pokemonName);
  header.appendChild(pokemonHP);

  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add(
    "bg-white", "rounded-lg", "shadow-md", "p-4", "flex", "flex-col", "items-center", "text-center"
  );




  
  pokemonCard.appendChild(header);

 // --- Typen-Wrapper (Type + Stern in einer Zeile) ---
const typenWrapper = document.createElement("div");
typenWrapper.classList.add("w-full", "flex", "justify-between", "items-center", "text-left", "mb-2");

// Typen-Text
const typenText = document.createElement("p");
typenText.textContent = `Type: ${pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")}`;
typenText.classList.add("text-gray-600");

// Favoriten-Stern
const favStar = document.createElement("span");
favStar.textContent = "★";
favStar.classList.add("cursor-pointer", "text-xl");

// Favoriten-Logik
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
if (favorites.includes(pokemon.id)) {
  favStar.classList.add("text-yellow-500");
} else {
  favStar.classList.add("text-gray-400");
}

favStar.addEventListener("click", () => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(pokemon.id)) {
    favorites = favorites.filter(id => id !== pokemon.id);
    favStar.classList.replace("text-yellow-500", "text-gray-400");
  } else {
    favorites.push(pokemon.id);
    favStar.classList.replace("text-gray-400", "text-yellow-500");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
});

// Zusammenbauen
typenWrapper.appendChild(typenText);
typenWrapper.appendChild(favStar);

// In die Karte einfügen




  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonImage.alt = pokemon.name;
  pokemonImage.classList.add("mb-4");

  const atde = document.createElement("div");
  atde.classList.add("w-full", "flex", "justify-center", "gap-1", "items-center", "mb-2", "text-xs");

  const pokemonAt = document.createElement("p");
  pokemonAt.textContent = `Attack: ${pokemon.stats[1].base_stat}`;
  pokemonAt.classList.add("text-gray-600");

  const pokemonDe = document.createElement("p");
  pokemonDe.textContent = `| Defense: ${pokemon.stats[2].base_stat}`;
  pokemonDe.classList.add("text-gray-600");

  atde.appendChild(pokemonAt);
  atde.appendChild(pokemonDe);

  const hewe = document.createElement("div");
  hewe.classList.add("w-full", "flex", "justify-center", "gap-1", "items-center", "mb-5", "text-xs");

  const pokemonHeight = document.createElement("h2");
  pokemonHeight.textContent = `Height: ${pokemon.height / 10}m`;
  pokemonHeight.classList.add("text-gray-600");

  const pokemonWeight = document.createElement("h2");
  pokemonWeight.textContent = `| Weight: ${pokemon.weight / 10}kg`;
  pokemonWeight.classList.add("text-gray-600");

  hewe.appendChild(pokemonHeight);
  hewe.appendChild(pokemonWeight);

  const abilityWrapper = document.createElement("div");
  abilityWrapper.classList.add("w-full", "text-left", "mt-2");

  const titel = document.createElement("span");
  titel.classList.add("font-bold", "block", "mb-1", "text-left", "w-full");
  titel.textContent = "Abilities:";

  const abilityListe = document.createElement("ul");
  abilityListe.classList.add("text-gray-600", "list-none", "text-left");

  pokemon.abilities.forEach((abilityInfo) => {
    const li = document.createElement("li");
    li.textContent = `- ${abilityInfo.ability.name}`;
    li.classList.add("mb-1");
    abilityListe.appendChild(li);
  });

  abilityWrapper.appendChild(titel);
  abilityWrapper.appendChild(abilityListe);

  pokemonCard.appendChild(typenWrapper);
  pokemonCard.appendChild(pokemonImage);
  pokemonCard.appendChild(atde);
  pokemonCard.appendChild(hewe);
  pokemonCard.appendChild(abilityWrapper);

  pokemonContainer.appendChild(pokemonCard);
}

displayPokemons();
