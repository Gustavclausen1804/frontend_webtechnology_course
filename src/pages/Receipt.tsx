import { Link } from 'react-router-dom'
import Header from '../components/Header'
import CheckoutForm from '../components/CheckoutForm'

 

async function postData(url = '', data = {}) {
    // Defaultindstillingerne er indstillet til en POST-anmodning
    
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // ingen 'cors', 'same-origin'
      cache: 'no-cache', // *default, ingen-cache, genindlæs, force-cache, only-if-cached
      credentials: 'same-origin', // inkluder, *same-origin, udeluk
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *følg, fejl
      referrerPolicy: 'no-referrer', // ingen-referrer, *client
      body: JSON.stringify(data) // body data type skal matche "Content-Type" headeren
    });
    

  
  function postkommentar() {
  postData('http://dtu62597.eduhost.dk:10331/api', CheckoutForm)
    .then(data => {
      console.log(data); // JSON data, der blev returneret af serveren
    });

    
  }

  export default function Receipt() {
    return (
        <>
            <Header/>
            <h2>Kviteringsside ikke fundet 404</h2>
            <Link to="/cart">
              <button>Tilbage til indkøbskurv</button>
            </Link>
        </>
        
    )
}
