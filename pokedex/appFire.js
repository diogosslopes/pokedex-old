
const fetchPokemonFire = () =>{
    const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for(i=1;i<=150;i++){
        pokemonPromises.push(fetch(getPokemonURL(i)).then((response) => response.json()))
     }

    Promise.all(pokemonPromises)
    .then(pokemons => {
        
        const firePokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "fire")
 
        return firePokemons

    }).then((firePokemons)=>{
        let ul = document.querySelector('.pokedexFire')
        for(i=0;i<firePokemons.length;i++){
            ul.innerHTML += `<li class="card grass">
         
            <div class="card"  onclick="select(${firePokemons[i].id})" )">
            <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${firePokemons[i].id}.png" alt="${firePokemons[i].name}">
            <h2 class="card-title" > ${firePokemons[i].name}</h2>
            </div>
            <div><img class = "card-image-info" src="img/icons8-informações-25.png" alt="info" onclick="efeito(${firePokemons[i].id})"></div>
            <div class="cardInfo" id = "G${firePokemons[i].id}" >
            <div class="type-close"><p class="card-class">Tipo: ${firePokemons[i].types[0].type.name}  </p> <img class = "card-image-close" src="img/icons8-macos-close-20.png" alt="info" onclick="efeito(${firePokemons[i].id})"></div>
            <p class="card-ability" id= "P${firePokemons[i].id}" >Habilidades:<br> </p>
            
            <div id="F${firePokemons[i].id}" class="card-ability-detail"></div>
            </div>
            
        </li>`

            console.log(i + firePokemons[0].abilities.length)
            for(cont=0;cont< firePokemons[i].abilities.length;cont++){
                let Ability = firePokemons[i].abilities[cont].ability.name[0].toUpperCase() + firePokemons[i].abilities[cont].ability.name.substr(1)
            
                let pAbilities = document.querySelector(`#P${firePokemons[i].id}`)
                pAbilities.innerHTML += `<strong onmouseenter ="abilitiesDetails('${firePokemons[i].abilities[cont].ability.name}',${firePokemons[i].id})" class="card-ability">${cont + 1} - ${Ability}</strong><br>`
            
        }
    
        
    }
        

        return firePokemons

    }).then((firePokemons)=>{
        function search(){
            let searchField = document.getElementById('search').value
            console.log(searchField)
            const searchPokemon = firePokemons.filter((fire)=> {return fire.name.includes(searchField)} )
        
            console.log (searchPokemon)

            let ul = document.querySelector('.pokedexFire')
            ul.innerHTML = ""
            searchPokemon.forEach((searchPokemon, index)=>{
                ul.innerHTML += `<li class="card grass" >
                <div class="card"  onclick="select(${searchPokemon.id})" )">
                <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchPokemon.id}.png" alt="${searchPokemon.name}">
                <h2 class="card-title" > ${searchPokemon.name}</h2>
                </div>
                <div><img class = "card-image-info" src="img/icons8-informações-25.png" alt="info" onclick="efeito(${searchPokemon.id})"></div>
                <div class="cardInfo" id = "G${searchPokemon.id}" >
                <div class="type-close"><p class="card-class">Tipo: ${searchPokemon.types[0].type.name}  </p> <img class = "card-image-close" src="img/icons8-macos-close-20.png" alt="info" onclick="efeito(${searchPokemon.id})"></div>
                <p class="card-ability" id= "P${searchPokemon.id}">Habilidades:<br> </p>
                <div id="F${searchPokemon.id}" class="card-ability-detail"></div>
                </div>
                </li>` 

                for(cont=0;cont< searchPokemon.abilities.length;cont++){
                    let Ability = searchPokemon.abilities[cont].ability.name[0].toUpperCase() + searchPokemon.abilities[cont].ability.name.substr(1)
                    let pAbilities = document.querySelector(`#P${searchPokemon.id}`)
    
                    pAbilities.innerHTML += `<strong onmouseenter ="abilitiesDetails('${searchPokemon.abilities[cont].ability.name}',${searchPokemon.id})" class="card-ability" >${cont + 1} - ${Ability}</strong><br>`
                    
                }
            })
        }
            document.getElementById('search').addEventListener("keyup", search)

            return firePokemons
    })
}

let fireFavorites = []
let pokemonSelected =  {
    id: "",
    name: "",
    type: "",
    picture: "",
    pokemonabilities: []
}

let pokemonsFavorites = JSON.parse(localStorage.getItem("pokemonsFavorites"))

if(pokemonsFavorites == null){
    localStorage.setItem("pokemonsFavorites", "[]")
    pokemonsFavorites = []
}

function select(index){
    
    let url = `https://pokeapi.co/api/v2/pokemon/${index}`
 
    fetch(url)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        if(fireFavorites.length <3){
            let abilities = []
            for(cont=0;cont< data.abilities.length;cont++){
             
                ability = {
                    abilityname: data.abilities[cont].ability.name,
                    abilityurl: data.abilities[cont].ability.url,
                }
                abilities.push(ability)
            }
           
            pokemonSelected =  {
                id: data.id,
                name: data.name,
                type: data.types[0].type.name,
                picture: data.sprites.front_default,
                pokemonabilities: abilities
            }
            fireFavorites.push(pokemonSelected) 
        }else{
            window.alert("Maximo de 3 pokemons atingidos")
    }
        console.log(fireFavorites)
    }).then(()=>{
        let ulFavorites = document.querySelector('.fireFavorites')
        ulFavorites.innerHTML = ""
        fireFavorites.forEach((fireFavorites, index)=>{
            ulFavorites.innerHTML += `<li class="card fire" onclick="remove(${index})">
            <img class = "card-image" src="${fireFavorites.picture}" alt="${fireFavorites.name}">
            <h2 class="card-title"> ${fireFavorites.name} </h2>
            </li>` 
        })
    })
}

function remove(index){
  
    fireFavorites.splice(index,1)
  
    let ulFavorites = document.querySelector('.fireFavorites')
    ulFavorites.innerHTML = ""
    
    fireFavorites.forEach((fireFavorites, index)=>{
        ulFavorites.innerHTML += `<li class="card fire" onclick="remove(${index})">
        <img class = "card-image" src="${fireFavorites.picture}" alt="${fireFavorites.name}">
        <h2 class="card-title"> ${fireFavorites.name} </h2>
        </li>` 
    })

    }

function next(){

        if(fireFavorites.length == 3){
            fireFavorites.forEach((fireFavorites)=>{
            pokemonsFavorites.push(fireFavorites)
        })
       
        localStorage.setItem("pokemonsFavorites", JSON.stringify(pokemonsFavorites))
        window.location = 'waterpokemons.html'
        }else{
            window.alert('Escolha 3 pokemons')
        }
        
    }


function abilitiesDetails(abilityName, id){

        let urlDetail = `https://pokeapi.co/api/v2/ability/${abilityName}`
    
        fetch(urlDetail)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            let pDetail = document.getElementById(`F${id}`) 
            if(data.effect_entries[0].language.name == "en"){
                pDetail.innerHTML = ""
                pDetail.innerHTML = `<p class = "card-ability-detail" >${data.effect_entries[0].short_effect}</p>`
            }else{
                pDetail.innerHTML = ""
                pDetail.innerHTML = `<p class = "card-ability-detail" >${data.effect_entries[1].short_effect}</p>`
            }
            
        })
    }
    
fetchPokemonFire()


function efeito(id){
    let element = document.querySelector(`#G${id}`)

    if(element.classList[1] == "efeitoCardInfo"){
        element.classList.remove("efeitoCardInfo")
    }else{
        element.classList.add("efeitoCardInfo")
    }

}