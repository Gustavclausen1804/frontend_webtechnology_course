import React, { useState, useEffect } from 'react';

interface Postnummer {
  href: string;
  nr: string;
  navn: string;
  stormodtageradresser: any;
  bbox: number[];
  visueltcenter: number[];
  kommuner: {
    href: string;
    kode: string;
    navn: string;
  }[];
  ændret: string;
  geo_ændret: string;
  geo_version: number;
  dagi_id: string;
}

function ZipCodeSearch({ zipCode }: { zipCode: string }) {
  const [searchResult, setSearchResult] = useState<Postnummer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.dataforsyningen.dk/postnumre/he');
        
        const data: Postnummer[] = await response.json();

        // Convert zip code to string for comparison
        const zipCodeString = zipCode.toString();

        // Filter the results based on the entered zip code
        const filteredResults = data.filter((item: Postnummer) => item.nr === zipCodeString);

        // Update the state with the search result
        setSearchResult(filteredResults.length > 0 ? filteredResults[0] : null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Only fetch data when zipCode changes
    if (zipCode) {
      fetchData();
    }
  }, [zipCode]);

  return (
    <div>
      {searchResult ? (
        <p>{zipCode} is a valid zip code for {searchResult.navn}</p>
      ) : (
        <p>{zipCode} is not a valid zip code</p>
      )}
    </div>
  );
}

export function MyForm() {
  const [zipCode, setZipCode] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
  };

  return (
    <div>
      <form>
        <label>
          Enter your zip code:
          <input
            type="text"
            value={zipCode}
            onChange={handleInputChange}
          />
        </label>
        <p>Your zipCode is: {zipCode}</p>
      </form>
      <ZipCodeSearch zipCode={zipCode} />
    </div>
  );
}

// Parent component that manages the state
export function App() {
  return (
    <div>
      <MyForm />
    </div>
  );
}


/* v2
import React, { useState, useEffect } from 'react';

interface Postnummer {
  href: string;
  nr: string;
  navn: string;
  stormodtageradresser: any;
  bbox: number[];
  visueltcenter: number[];
  kommuner: {
    href: string;
    kode: string;
    navn: string;
  }[];
  ændret: string;
  geo_ændret: string;
  geo_version: number;
  dagi_id: string;
}

function ZipCodeSearch() {
  const [zipCode, setZipCode] = useState('');
  console.log(zipCode);
  const [searchResult, setSearchResult] = useState<Postnummer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('htps://api.dataforsyningen.dk/postnumre');
        
        const data: Postnummer[] = await response.json();
        console.log(data[0] + " " + data[1] + " " + data[2]);

        // Convert zip code to string for comparison
        const zipCodeString = zipCode.toString();

        // Filter the results based on the entered zip code
        const filteredResults = data.filter((item: Postnummer) => item.nr === zipCodeString);

        // Update the state with the search result
        setSearchResult(filteredResults.length > 0 ? filteredResults[0] : null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Only fetch data when zipCode changes
    if (zipCode) {
        console.log("zipChange")
      fetchData();
    }
  }, [zipCode]);

  return (
    <div>
      {searchResult ? (
        <p>{zipCode} is a valid zip code for {searchResult.navn}</p>
      ) : (
        <p>{zipCode} is not a valid zip code</p>
      )}
    </div>
  );
}

export function MyForm() {
  const [zipCode, setName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    ZipCodeSearch();
  };

  return (
    <div>
      <form>
        <label>
          Enter your name:
          <input
            type="text"
            value={zipCode}
            onChange={handleInputChange}
          />
        </label>
        <p>Your zipCode is: {zipCode}</p>
      </form>
      <ZipCodeSearch />
    </div>
  );
}
*/





/*
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

export function MyForm() {
    const [name, setName] = useState("");
  
    return (
      <form>
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <p>Your name is: {name}</p>
      </form>
    );
  }
*/