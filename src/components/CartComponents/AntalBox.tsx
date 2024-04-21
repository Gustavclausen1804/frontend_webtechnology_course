import '../../styles/App.css'
import { useState, useEffect } from 'react';

export default function Adress(){
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [validMes, setValidMes] = useState("");
    const [validZipCodes, setValidZipCodes] = useState<string[]>([]);

    useEffect(() => {
        getValidZipCodes();
    }, []);
    
    
    function zipCodeChanged(e : any){
        var value = e.target.value;
        console.log(value.length)
        if( /^\d{0,4}$/.test(value)){
            setValidMes("")
            setZipCode(value);
            if (value.length == 4){
                if (validZipCodes.includes(value) || value.length == 4){getCity(value)}
                else {
                    setCity("");
                    setValidMes("Not Valid Zip Code")
                }
            }  
        }    
    }

    function cityChange(e : any){
        setCity(e.target.value);
    }

    async function getValidZipCodes(){
        try {
            const url = `https://api.dataforsyningen.dk/postnumre`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`zip code ikke fundet. Status: ${response.status}`);
            }

            const zipCodes = (await response.json()) as [{
                nr: string;
            }];
            setValidZipCodes(zipCodes.map(({ nr }) => nr));
        } catch (error) {
            console.error('zip code ikke fundet.');
            // Handle error: display error message to the user, retry, etc.
        }
    }

    async function getCity(zipCode: string){
        const url = `https://api.dataforsyningen.dk/postnumre/${zipCode}`;
        const response = await fetch(url);
        const city = (await response.json()) as {
            navn: string;
        };
        setCity(city.navn);
    }

    return(
        <form>

<div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <label>ZipCode</label>
              </div>
              <div style={{ width: '50%' }}>
                <label>City</label>
              </div>
            </div>


        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <input type="text" className="antal" value={zipCode} onChange={zipCodeChanged} style={{ width: '64%' }}></input>
          </div>
          <div style={{ width: '50%' }}>
            <input type="text" className="antal" value={city} onChange={cityChange} style={{ width: '64%' }}></input>
            </div>
          <div>{validMes}</div>
          </div>

        </form>
          
    )
}