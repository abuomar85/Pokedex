  // Creating Array with three pokemon all pokemon detail from https://pokedex.org/
  // wraping pokemonList array in an IIFE to avoid accidentally accessing the global state. creating pokeminRepository
  let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    // return the pokemonList array
    function getAll() {
      return pokemonList;
    }
    //adding new pokemon to the array
    function add(pokemon) {
      //check if  the input has the right type
      if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) { pokemonList.push(pokemon)}
    else {
      console.log("pokemon is not correct");
    }
    }

    // adding new function to show pokemon details from the api
    function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }
    // adding new items
    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class')
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);

      //showing the pokemon details when button is clicked
      button.addEventListener('click', function(event) {
        showDetails(pokemon);
      });
    }

    //GET the complete list of Pokémon from api
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        //  console.log(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
    //GET the Pokémon details using the URL

    function loadDetails(item) {
   let url = item.detailsUrl;
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     // Now we add the details to the item
     item.imageUrl = details.sprites.front_default;
     item.height = details.height;
     item.types = details.types;
   }).catch(function (e) {
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
      showDetails: showDetails
    };
  })();

  //looping through array using ForEach

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
