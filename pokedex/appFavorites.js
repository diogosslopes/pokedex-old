let pokemonsFavorites = JSON.parse(localStorage.getItem("pokemonsFavorites"))

if(pokemonsFavorites == null){
    localStorage.setItem("pokemonsFavorites", "[]")
    pokemonsFavorites = []
}

console.log(pokemonsFavorites)


let ulGrasss = document.querySelector('.pokedexGrass')
let ulFire = document.querySelector('.pokedexFire')
let ulWater = document.querySelector('.pokedexWater')
ulGrasss.innerHTML = ""
ulFire.innerHTML = ""
ulWater.innerHTML = ""
        pokemonsFavorites.forEach((pokemonsFavorites, index)=>{
            if(pokemonsFavorites.type == "grass"){
                ulGrasss.innerHTML += `<li class="card grass favorites">
                <div class="card"  )">
                <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonsFavorites.id}.png" alt="${pokemonsFavorites.name}">
                <h2 class="card-title" > ${pokemonsFavorites.name}</h2>
                </div>
                <div><img class = "card-image-info" src="img/icons8-informações-25.png" alt="info" onclick="efeito(${pokemonsFavorites.id})"></div>
                <div class="cardInfo" id = "G${pokemonsFavorites.id}" >
                <div class="type-close"><p class="card-class">Tipo: ${pokemonsFavorites.type}  </p> <img class = "card-image-close" src="img/icons8-macos-close-20.png" alt="info" onclick="efeito(${pokemonsFavorites.id})"></div>
                <p class="card-ability" id= "P${pokemonsFavorites.id}" >Habilidades:<br> </p>
                
                <div id="D${pokemonsFavorites.id}" class="card-ability-detail"></div>
                </div>
              
                
            </li>`
                for(cont=0;cont< pokemonsFavorites.pokemonabilities.length;cont++){
                    let Ability = pokemonsFavorites.pokemonabilities[cont].abilityname[0].toUpperCase() + pokemonsFavorites.pokemonabilities[cont].abilityname.substr(1)
                   
                    let pAbilities = document.querySelector(`#P${pokemonsFavorites.id}`)
                    pAbilities.innerHTML += `<strong id = "D" onmouseenter ="abilitiesDetails('${pokemonsFavorites.pokemonabilities[cont].abilityname}',${pokemonsFavorites.id})" class="card-ability">${cont + 1} - ${Ability}</strong><br>`
                    
                } 
            }else if(pokemonsFavorites.type == "fire"){
                ulFire.innerHTML += `<li class="card grass">
         
                <div class="card"  )">
                <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonsFavorites.id}.png" alt="${pokemonsFavorites.name}">
                <h2 class="card-title" > ${pokemonsFavorites.name}</h2>
                </div>
                <div><img class = "card-image-info" src="img/icons8-informações-25.png" alt="info" onclick="efeito(${pokemonsFavorites.id})"></div>
                <div class="cardInfo" id = "G${pokemonsFavorites.id}" >
                <div class="type-close"><p class="card-class">Tipo: ${pokemonsFavorites.type}  </p> <img class = "card-image-close" src="img/icons8-macos-close-20.png" alt="info" onclick="efeito(${pokemonsFavorites.id})"></div>
                <p class="card-ability" id= "P${pokemonsFavorites.id}" >Habilidades:<br> </p>
                
                <div id="D${pokemonsFavorites.id}" class="card-ability-detail"></div>
                </div>
              
                
            </li>`
                for(cont=0;cont< pokemonsFavorites.pokemonabilities.length;cont++){
                    let Ability = pokemonsFavorites.pokemonabilities[cont].abilityname[0].toUpperCase() + pokemonsFavorites.pokemonabilities[cont].abilityname.substr(1)
                   
                    let pAbilities = document.querySelector(`#P${pokemonsFavorites.id}`)
                    pAbilities.innerHTML += `<strong id = "D" onmouseenter ="abilitiesDetails('${pokemonsFavorites.pokemonabilities[cont].abilityname}',${pokemonsFavorites.id})" class="card-ability">${cont + 1} - ${Ability}</strong><br>`
                    
                }
            }else{
                ulWater.innerHTML += `<li class="card grass">
         
                <div class="card"  )">
                <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonsFavorites.id}.png" alt="${pokemonsFavorites.name}">
                <h2 class="card-title" > ${pokemonsFavorites.name}</h2>
                </div>
                <div><img class = "card-image-info" src="img/icons8-informações-25.png" alt="info" onclick="efeito(${pokemonsFavorites.id})"></div>
                <div class="cardInfo" id = "G${pokemonsFavorites.id}" >
                <div class="type-close"><p class="card-class">Tipo: ${pokemonsFavorites.type}  </p> <img class = "card-image-close" src="img/icons8-macos-close-20.png" alt="info" onclick="efeito(${pokemonsFavorites.id})"></div>
                <p class="card-ability" id= "P${pokemonsFavorites.id}" >Habilidades:<br> </p>
                
                <div id="D${pokemonsFavorites.id}" class="card-ability-detail"></div>
                </div>
              
                
            </li>`
                for(cont=0;cont< pokemonsFavorites.pokemonabilities.length;cont++){
                    let Ability = pokemonsFavorites.pokemonabilities[cont].abilityname[0].toUpperCase() + pokemonsFavorites.pokemonabilities[cont].abilityname.substr(1)
                   
                    let pAbilities = document.querySelector(`#P${pokemonsFavorites.id}`)
                    pAbilities.innerHTML += `<strong id = "D" onmouseenter ="abilitiesDetails('${pokemonsFavorites.pokemonabilities[cont].abilityname}',${pokemonsFavorites.id})" class="card-ability">${cont + 1} - ${Ability}</strong><br>`
                    
                }
            }
        })






function abilitiesDetails(abilityName, id){

    let urlDetail = `https://pokeapi.co/api/v2/ability/${abilityName}`

    fetch(urlDetail)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        let pDetail = document.getElementById(`D${id}`) 
        if(data.effect_entries[0].language.name == "en"){
            pDetail.innerHTML = ""
            pDetail.innerHTML = `<p class = "card-ability-detail" >${data.effect_entries[0].short_effect}</p>`
        }else{
            pDetail.innerHTML = ""
            pDetail.innerHTML = `<p class = "card-ability-detail" >${data.effect_entries[1].short_effect}</p>`
        }
        
    })
}

function efeito(id){
    let element = document.querySelector(`#G${id}`)

    if(element.classList[1] == "efeitoCardInfo"){
        element.classList.remove("efeitoCardInfo")
    }else{
        element.classList.add("efeitoCardInfo")
    }

}