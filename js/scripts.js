  // Creating Array with three pokemon all pokemon detail from https://pokedex.org/
  // wraping pokemonList array in an IIFE to avoid accidentally accessing the global state. creating pokeminRepository
  let pokemonList = [
                      {name: 'Bulbasaur',height: 7, types: ['grass', 'poison'] },
                      {name: 'Ivysaur',height: 10, types: ['grass', 'poison']  },
                      {name: 'Venusaur',height: 20, types: ['grass', 'poison']  }
                    ];

                  //looping through pokemon array and show the names an height
  document.write("<h3>Foor loop</h3>")
  for (var i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + " (height: "  + pokemonList[i].height + ") " + "<br>"  );
  //make a condition to check if pokemon is equal or greater than 20
  if(pokemonList[i].height >= 20) {
    document.write(pokemonList[i].name + " is realy big");
  }
  }
  //looping through array using ForEach
  document.write("<h3>ForEach loop</h3>")
  pokemonList.forEach(function(item){
    document.write(item.name + " (height: "  + item.height + ") " + "<br>"  );
  })
