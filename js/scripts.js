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
      
      return pokemonList.push(pokemon);
    }
    // return the new array with new items
    return {
      add: add,
      getAll, getAll
    };
  })();

                  //looping through pokemon array and show the names an height
  document.write("<h3>Foor loop</h3>")
  for (var i = 0; i < pokemonRepository.getAll().length; i++) {
  document.write(pokemonRepository.getAll()[i].name + " (height: "  + pokemonRepository.getAll()[i].height + ") " + "<br>"  );
  //make a condition to check if pokemon is equal or greater than 20
  if(pokemonRepository.getAll()[i].height >= 20) {
    document.write(pokemonRepository.getAll()[i].name + " is realy big");
  }
  }
  //looping through array using ForEach
  document.write("<h3>ForEach loop</h3>")
  pokemonRepository.getAll().forEach(function(item){
    document.write(item.name + " (height: "  + item.height + ") " + "<br>"  );
    if(item.height >= 20 ) {
      document.write(item.name + " is realy big");
    }


  })
