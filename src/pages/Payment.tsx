import Header from '../components/Header'
import { Link } from 'react-router-dom';




export default function Payment() {
    return (
        <>
            <Header/>
            <h2>Din bestilling er modtaget</h2>
            <Link to="/cart">
              <button type="submit">Tilbage til indkøbskurv</button>
            </Link>
            
        </>
    )
}