import React,{useEffect,useState} from 'react';
import './App.css';
import axios from "axios";

function App() {
    const[pokeData,setPokeData]=useState(null);


    useEffect(() => {
        async function fetchData() {

            try {
                const result = await axios.get('https://pokeapi.co/api/v2/pokemon/jigglypuff');
                setPokeData(result.data);
                console.log(result.data);
            } catch (e) {
                console.error(e);
            }
        }


            fetchData();


    }, []);




    return (
                    <div>
                        <p>hoi</p>
                        {pokeData &&
                        <>
                            <h3>{pokeData.name}</h3>
                            <img src={pokeData.sprites.back_default} alt="pokeimage"/>
                            <p>Moves: {pokeData.moves.length}</p>
                            <p>weight: {pokeData.weight}</p>
                            <p>abilities</p>
                            {pokeData.abilities.map((ability)=>{
                                return  <p key={ability.ability.name}>{ability.ability.name}</p>
                            })}
                        </>}

                    </div>

  )
}

export default App;
