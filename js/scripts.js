  // Creating Array with three pokemon all pokemon detail from https://pokedex.org/
  // wraping pokemonList array in an IIFE to avoid accidentally accessing the global state. creating pokeminRepository
  let pokemonRepository = (function () {
    let pokemonList = [
                        {name: 'Bulbasaur',height: 7, types: ['grass', 'poison'] },
                        {name: 'Ivysaur',height: 10, types: ['grass', 'poison']  },
                        {name: 'Venusaur',height: 20, types: ['grass', 'poison']  }
                      ];
    // return the pokemonList array
    function getAll() {
      return pokemonList;
    }
    //adding new pokemon to the array
    function add(pokemon) {
      //check if  the input has the right type
      if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) { pokemonList.push(pokemon)}
    else {
      console.log("pokemon is not correct");
    }
    }

    // adding new function to show pokemon details
    function showDetails(event) {

       console.log(event.target.innerText);
    }
    // new function
    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class')
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);

      //showing the pokemon details when button is clicked
      button.addEventListener('click', showDetails);
    }


    // return the new array with new items
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();
  //adding new pokemon
  pokemonRepository.add({ name: "Pikachu", height: 3, types: ["electric"] });
  //console.log(pokemonRepository.getAll());

  //looping through array using ForEach

  pokemonRepository.getAll().forEach(function(item){
    pokemonRepository.addListItem(item);
  })
