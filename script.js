//Pokemon Fetch 150

// Referenz zum Container-Element, in dem die Pokemon-Karten angezeigt werden
const pokemonContainer = document.getElementById("pokemon-container");

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
      // Erstellen einer Karte für das Pokemon
      const pokemonCard = document.createElement("div");
      // Hinzufügen von Tailwind CSS-Klassen für das Styling der Karte in dem Div Container
      pokemonCard.classList.add(
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "p-4",
        "flex",
        "flex-col",
        "items-center",
        "text-center"
      );

      // Erstellen und Konfigurieren des Bild-Elements
      const pokemonImage = document.createElement("img");
      pokemonImage.src = pokemon.sprites.front_default;
      // Alternative Bildquelle (auskommentiert)
      // pokemonImage.src = pokemon.sprites.other.showdown.front_default;
      pokemonImage.alt = pokemon.name;
      pokemonImage.classList.add("mb-4");

      // Erstellen und Konfigurieren des Namens-Elements mit Großschreibung des ersten Buchstabens
      const pokemonName = document.createElement("h2");
      pokemonName.textContent =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      pokemonName.classList.add("text-xl", "font-bold", "mb-2");

      // Erstellen und Konfigurieren des Typen-Elements
      // Extrahiert alle Typen des Pokemons und verbindet sie mit Komma
      const pokemonInfo = document.createElement("p");
      pokemonInfo.textContent = `Types: ${pokemon.types
        .map((typeInfo) => typeInfo.type.name)
        .join(", ")}`;
      pokemonInfo.classList.add("text-gray-600");

      // Hinzufügen aller Elemente zur Pokemon-Karte
      pokemonCard.appendChild(pokemonImage);
      pokemonCard.appendChild(pokemonName);
      pokemonCard.appendChild(pokemonInfo);

      // Hinzufügen der fertigen Karte zum Container
      pokemonContainer.appendChild(pokemonCard);
    }
  }
};

displayPokemons();
