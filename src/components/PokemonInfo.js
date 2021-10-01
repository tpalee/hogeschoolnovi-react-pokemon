import React, {useEffect, useState} from 'react';
import axios from "axios";
import './PokemonInfo.css'

function PokemonInfo({pokemon}) {
    //store the data of the Pokemon in the state
    const [pokeData, setPokeData] = useState(null);

//fetch the data of the Pokemon and store the data in pokeData
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                setPokeData(result.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);


    return (
        /*Create the pokemon component*/
        <div>
            {pokeData &&
            <article>
                <h2>{pokeData.name}</h2>
                <img className="pokemon-image" src={pokeData.sprites.back_default} alt="pokeimage"/>
                <p>Moves: <span className="light">{pokeData.moves.length}</span></p>
                <p>weight: <span className="light">{pokeData.weight}</span></p>
                <p>abilities</p>
                {pokeData.abilities.map((ability) => {
                    return <p key={ability.ability.name}> <span className=" blue light">{ability.ability.name}</span></p>
                })}
            </article>}
        </div>

    )
}

export default PokemonInfo;
