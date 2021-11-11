// Creating Array with three pokemon all pokemon detail from https://pokedex.org/
// wraping pokemonList array in an IIFE to avoid accidentally accessing the global state. creating pokeminRepository
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  // return the pokemonList array
  function getAll() {
    return pokemonList;
  }
  //adding new pokemon to the array
  function add(pokemon) {
    //check if  the input has the right type
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    }
  }

  // adding new function to show pokemon details from the api
  function showDetails(pokemon) {
    // now we using the modal to shwo the details
    showModal(pokemon);
  }

  // creating modal using bootstrap
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    modalTitle.empty();
    modalBody.empty();
    //looping through types and abilities
    pokemonRepository.loadDetails(pokemon).then(function () {
      let sTypes = "";
      for (let t of pokemon.types) {
        sTypes = t.type.name + ", " + sTypes;
      }
      let sAbilities = "";
      for (let a of pokemon.abilities) {
        sAbilities = a.ability.name + ", " + sAbilities;
      }

      // show the elements inside the modal
      let nameElement = $("<h1>" + pokemon.name + "</h1>");
      let imageElementFront = $('<img class="modal-img" style="width:50%">');
      imageElementFront.attr("src", pokemon.imageUrlFront);
      let imageElementBack = $('<img class="modal-img" style="width:50%">');
      imageElementBack.attr("src", pokemon.imageUrlBack);
      let heighElement = $("<p>" + "height : " + pokemon.height + "</p>");
      let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
      let typesElement = $("<p>" + "types : " + sTypes + "</p>");
      let abilitiesElement = $("<p>" + "abilities : " + sAbilities + "</p>");

      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack);
      modalBody.append(heighElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
      modalBody.append(abilitiesElement);
    });
  }

  // adding new items
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.classList.add("button-class");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    listItem.classList.add("group-list-item");

    // class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >
    button.innerHTML =
      pokemon.name +
      ' <br> <button type="button" class="btn btn-primary " data-toggle="modal" data-target="#exampleModal" >\n' +
      "  Profile\n" +
      "</button>";

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    //showing the pokemon details when button is clicked
    button.addEventListener("click", function (event) {
      // showDetails(pokemon);
      showModal(pokemon);
      console.log(event);
    });
  }

  //GET the complete list of Pokémon from api
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          //  console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  //GET the Pokémon details using the URL

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  // return the new array with new items
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

//looping through array using ForEach

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
