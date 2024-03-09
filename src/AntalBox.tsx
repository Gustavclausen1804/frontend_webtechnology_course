import './App.css'
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
                if (validZipCodes.includes(value)){
                    getCity(value)
                }
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
        const url = `https://api.dataforsyningen.dk/postnumre`;
        const response = await fetch(url);
        const zipCodes = (await response.json()) as [{
            nr: string;
        }];
        setValidZipCodes(zipCodes.map(({ nr }) => nr));
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
        <>
            <input type="text" className="antal" value={zipCode} onChange={zipCodeChanged}></input>

            <input type="text" className="antal" value={city} onChange={cityChange}></input>

            <div>{validMes}</div>

        </>
    )
}