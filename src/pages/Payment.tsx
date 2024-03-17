import Header from '../components/Header'
import { Link } from 'react-router-dom';




export default function Payment() {
    return (
        <>
            <Header/>
            <h2>Payment Page not found 404</h2>
            <Link to="/cart">
              <button type="submit">Tilbage til cart</button>
            </Link>
            
        </>
    )
}