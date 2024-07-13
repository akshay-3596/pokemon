import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Pokemon.css"

const Pokemon = () => {
    
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState([]);
  
    useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(response => {
          setPokemons(response.data.results);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    useEffect(() => {
      const filtered = pokemons.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()));
      setFilteredPokemons(filtered);
    }, [searchTerm, pokemons]);
  
    const handleSearch = event => {
      setSearchTerm(event.target.value);
    };
  return (
    <div>
      <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search Your Pokemon" className='search' />
      <div className="pokemon-cards">
        {filteredPokemons.length>0 ?'':'not found'}{filteredPokemons.map(pokemon => (
          <div key={pokemon.name} className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)[0]}.png`} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pokemon



