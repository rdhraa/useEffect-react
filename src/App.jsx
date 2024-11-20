import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  
  const [dataType, setDataType] = useState('characters');
  const [items, setItems] = useState([]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '';
        
        
        if (dataType === 'characters') {
          url = 'https://rickandmortyapi.com/api/character';
        } else if (dataType === 'episodes') {
          url = 'https://rickandmortyapi.com/api/episode';
        } else if (dataType === 'locations') {
          url = 'https://rickandmortyapi.com/api/location';
        }
        
        
        const response = await fetch(url);
        
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        
        const data = await response.json();
        
        
        setItems(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [dataType]); 

  return (
    <div>
      <select onChange={(e) => setDataType(e.target.value)} value={dataType}>
        <option value="characters">Characters</option>
        <option value="episodes">Episodes</option>
        <option value="locations">Locations</option>
      </select>
      
     
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>ID:</strong> {item.id}, <strong>Name:</strong> {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
