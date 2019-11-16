//const pokemonData = POKEMON.pokemon;
const main = document.getElementById("content");
const btnType = document.getElementById("btn-type");
const btnOrder = document.getElementById("btn-order");
const calc = document.getElementById("result");
const searchText = document.getElementById("searchtxt");
const searchBtn = document.getElementById("btn-search");
const filterOdr = document.getElementsByClassName("filterOrder");


// searchText.addEventListener("keydown", (event) => {
//   if (event.keyCode !== 13) {
//     main.innerHTML = "";
//     return template(window.app.filterName(pokemonData, searchText.value));
//   }
// });

// searchBtn.addEventListener("click", () => {
//   main.innerHTML = "";
//   template(window.app.filterName(pokemonData, searchText.value));
// });

// btnOrder.addEventListener("change", () => {
//   if (btnOrder.value === "ascendingOrder" || btnOrder.value === "descendingOrder") {
//     main.innerHTML = "";
//     return template(window.app.sortData(pokemonData, "name", btnOrder.value));

//   } else {
//     main.innerHTML = "";
//     return template(window.app.sortData(window.app.filterData(pokemonData, btnType.value), "name", btnOrder.value));
//   }
// });

btnType.addEventListener("change", () => {
  fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
  .then(response => response.json())
  .then((data) => {
    const pokemonDataArray = data.results;
    main.innerHTML = "";
    main.innerHTML += window.app.filterData(pokemonDataArray, btnType.value);
    // pokemonDataArray.forEach( (pokemonInfo) => fetch(pokemonInfo.url)
    //   .then(response => response.json())
    //   .then( (data) => {
    //     main.innerHTML = "";
    //     const pokemonData = data;
    //     // calc.innerHTML = `There are ${window.app.computers(window.app.filterData(pokemonData, btnType.value))}% ${btnType.value} type among 151 pokemons.`;
    //     //template(window.app.filterData(pokemonData, btnType.value));
    //    }
    //   )
    // )
  }
)
})

const urlApi = fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151');

const fetchedData = (urlApi) => {
  urlApi.then(response => response.json())
    .then((data) => {
      const pokemonDataArray = data.results;
      pokemonDataArray.forEach( (pokemonInfo) => fetch(pokemonInfo.url)
        .then(response => response.json())
        .then( (data) => {
          const pokemonData = data;
          const pokemonImage = data.sprites.front_default;
          const pokemonPokedex = data.id;
          const pokemonName = data.name;
          const pokemonType = data.types.map(type=>type.type.name);
          //template(pokemonImage, pokemonName, pokemonPokedex, pokemonType);
          template(pokemonData);
          }
        )
      )
    }
  )
}

const menuTypes = () => {
    let opt = "";
    let typesArray = [];

  fetch('https://pokeapi.co/api/v2/type/?offset=0&limit=151')
    .then(response => response.json())
    .then((data) => {
      const pokemonTypeArray = data.results;
      pokemonTypeArray.map(type=> {
        opt += `<option class="${type.name}" value="${type.name}">${type.name}</option>`;
        btnType.innerHTML = `<option value=\"none\">Filter</option>`;
        btnType.innerHTML += opt;
      })
    }
  )
}

window.onload = () => {
  menuTypes();
  fetchedData(urlApi);
};

function template(data) {
  let template = "";
    template += `
      <div class ="card"> 
        <img class="image" src="${data.sprites.front_default}"/>
        <p class="nameOf">${data.name}<p>
        <div class="info card">
          <p><strong>Pokedex:</strong> ${data.id}</p>
          <p><strong>Type:</strong> ${data.types.map(type=>type.type.name)}</p>
          <p><strong>Weaknesses:</strong> </p>
        </div>
      </div>`;
  main.innerHTML += template;
}

window.template = template;