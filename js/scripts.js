// Creating Array with three pokemon all pokemon detail from https://pokedex.org/
let pokemonList = [
                    {name: 'Bulbasaur',height: 7, types: ['grass', 'poison'] },
                    {name: 'Ivysaur',height: 10, types: ['grass', 'poison']  },
                    {name: 'Venusaur',height: 20, types: ['grass', 'poison']  }
                  ];
                  //looping through pokemon array and show the names an height
for (var i = 0; i < pokemonList.length; i++) {
document.write(pokemonList[i].name + " (height: "  + pokemonList[i].height + ") " + "<br>"  );
//make a condition to check if pokemon is equal or greater than 20
if(pokemonList[i].height >= 20) {
  document.write(pokemonList[i].name + " is realy big");
}
}
