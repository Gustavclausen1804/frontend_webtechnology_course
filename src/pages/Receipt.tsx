import { Link } from 'react-router-dom'
import Header from '../components/Header'



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