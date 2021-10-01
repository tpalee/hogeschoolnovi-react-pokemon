import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import PokemonInfo from "./components/PokemonInfo";
import Button from "./components/Button";
import pokemonlogo from "./assets/pokemonlogo.svg"

function App() {
    //Store the data in the state
    const [allPokeData, setAllPokeData] = useState();
    //Store the url in the state
    const [pokeUrl, setPokeUrl] = useState(`https://pokeapi.co/api/v2/pokemon`);
    //Store the disabled-state of the next-button
    const [nextDisabled, setNextDisabled] = useState(false);
    //Store the disabled-state of the previous-button
    const [prevDisabled, setPrevDisabled] = useState(false);
    //store the error-state
    const [error, setError] = useState();

    //nextbutton triggers nextclick function, previousbutton set to disabled
    function nextClick() {
        setPokeUrl(allPokeData.next);
        setPrevDisabled(false);
    }

//prevbutton triggers prevClick Button, nextbutton set to disabled
    function prevClick() {
        setPokeUrl(allPokeData.previous);
        setNextDisabled(false);
    }


//fetch data when pokeUrl changes
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(pokeUrl);
                console.log("data is fetched");
                setAllPokeData(result.data);

            } catch (e) {
                console.error(e);
                setError(true);
            }
        }

        fetchData();
    }, [pokeUrl]);


    return (
        <>
            <div className="wrappingcontainer">
                {allPokeData && (
                    <header>
                        <img src={pokemonlogo} alt="pokemonlogo"/>
                        <nav>
                            <Button
                                name="previous"
                                disabled={!allPokeData.previous}
                                onClick={prevClick}
                            />
                            <Button
                                name="next"
                                disabled={!allPokeData.next}
                                onClick={nextClick}
                            />
                        </nav>
                    </header>
                )}
                <main>
                    {/*map the results and create for each result an PokemonInfo component, add it to the DOM*/}
                    {allPokeData && allPokeData.results.map((result) => {
                        return <PokemonInfo key={result.name} pokemon={result.name}/>
                    })}
                </main>
                {/* log error in the dom*/}
                {error && (
                    <span className="error">
                  Oh dear, data can't be fetched, please try again later!
                </span>

                )}
            </div>
        </>
    )
}

export default App;
