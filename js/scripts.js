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
    function showDetails(pokemon) {
      //create modal container to hold the items and show the details
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');
      //add close button
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      //hide the modal when the close button is clicked
      closeButtonElement.addEventListener('click', hideModal);
      //show the pokemond details in the modal

    pokemonRepository.loadDetails(pokemon).then(function () {
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
      let contentElement = document.createElement('p');
      contentElement.innerText = 'height: '+  pokemon.height;
      let contentImage = document.createElement('img');
      contentImage.src = pokemon.imageUrl;
      modal.appendChild(contentImage);
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
      modalContainer.classList.add('is-visible');
      console.log(pokemon);
    });
    // function to hide the modal
    function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  // hide the modal if escape button pressed
  window.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
     hideModal();
   }
 });
// hide the modal if user clicked outside the modal
 modalContainer.addEventListener('click', (e) => {
   let target = e.target;
   if (target === modalContainer) {
     hideModal();
   }
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
