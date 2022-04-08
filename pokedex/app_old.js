const fetchPokemon = () =>{
    const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for(i=1;i<=150;i++){
        pokemonPromises.push(fetch(getPokemonURL(i)).then((response) => response.json()))
     }

    Promise.all(pokemonPromises)
    .then(pokemons => {
        
        const grassFireWaterPokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "grass" || pokemons.types[0].type.name === "fire" || pokemons.types[0].type.name === "water")
        // const firePokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "fire")
        // const waterPokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "water")
 
        return grassFireWaterPokemons

    }).then((grassFireWaterPokemons)=>{
        
        let pokemonType = document.querySelector('.pokemonType').innerHTML
        console.log(pokemonType)

        const grassPokemons = grassFireWaterPokemons.filter((grass)=>grass.types[0].type.name === "grass")
        const firePokemons = grassFireWaterPokemons.filter((fire)=>fire.types[0].type.name === "fire")
        const waterPokemons = grassFireWaterPokemons.filter((water)=>water.types[0].type.name === "water")
        
        if(pokemonType == "Pokemons tipo Planta"){

            let ul = document.querySelector('.pokedexGrass')
            for(i=0;i<grassPokemons.length;i++){                
                ul.innerHTML += `<li class="card grass" onclick="select(${grassPokemons[i].id})">
                    <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${grassPokemons[i].id}.png" alt="${grassPokemons[i].name}">
                    <h2 class="card-title"> ${grassPokemons[i].name} </h2>
                    
                </li>`}
            console.log("Planta")
        }else if(pokemonType == "Pokemons tipo Fogo"){

            let ul = document.querySelector('.pokedexFire')
            for(i=0;i<firePokemons.length;i++){
            ul.innerHTML += `<li class="card grass" onclick="select(${firePokemons[i].id})">
                <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${firePokemons[i].id}.png" alt="${firePokemons[i].name}">
                <h2 class="card-title"> ${firePokemons[i].name} </h2>
                
            </li>`}
    
            console.log("Fogo")
        }else if(pokemonType == "Pokemons tipo Água"){

            let ul = document.querySelector('.pokedexWater')
            for(i=0;i<waterPokemons.length;i++){
            ul.innerHTML += `<li class="card grass" onclick="select(${waterPokemons[i].id})">
                <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${waterPokemons[i].id}.png" alt="${waterPokemons[i].name}">
                <h2 class="card-title"> ${waterPokemons[i].name} </h2>
                
            </li>`}
            console.log("Água")
        }
        
        
        // for(i=0;i<grassPokemons.length;i++){
        // ul.innerHTML += `<li class="card grass" onclick="select(${grassPokemons[i].id})">
        //     <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${grassPokemons[i].id}.png" alt="${grassPokemons[i].name}">
        //     <h2 class="card-title"> ${grassPokemons[i].name} </h2>
            
        // </li>`}

        
    //    return function add(index){
    //         console.log(index)
    //         console.log(grassPokemons)
    //     }
        // console.log(grassPokemons)
        // let div = document.querySelector('.container')
        // div.innerHTML = `<p>nome:  ${grassPokemons[0].name}</p>`
    })
}


let grassFavorites = []

function select(index){
    
    let url = `https://pokeapi.co/api/v2/pokemon/${index}`
 

    //grassFavorites.push = (fetch(url).then(response => response.json()))
  
    fetch(url)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        //console.log(data)
        if(grassFavorites.length <3){
            grassFavorites.push(data)
        }else{
        window.alert("Maximo de 3 pokemons atingidos")
    }
        
        console.log(grassFavorites)

    }).then(()=>{
        let ulFavorites = document.querySelector('.favorites')
        ulFavorites.innerHTML = ""
        grassFavorites.forEach((grassFavorites, index)=>{
            ulFavorites.innerHTML += `<li class="card grass" onclick="remove(${index})">
            <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${grassFavorites.id}.png" alt="${grassFavorites.name}">
            <h2 class="card-title"> ${grassFavorites.name} </h2>
            </li>` 

                        
        })
        
    
    })
       


}

function remove(index){

    console.log('cliquei no: ' + index)

    grassFavorites.splice(index,1)
    
    let ulFavorites = document.querySelector('.favorites')
    ulFavorites.innerHTML = ""
    console.log(grassFavorites)
    grassFavorites.forEach((grassFavorites, index)=>{
        ulFavorites.innerHTML += `<li class="card grass" onclick="remove(${index})">
        <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${grassFavorites.id}.png" alt="${grassFavorites.name}">
        <h2 class="card-title"> ${grassFavorites.name} </h2>
        </li>` 
        })

    }

    //export default grassPokemons
 
fetchPokemon()


