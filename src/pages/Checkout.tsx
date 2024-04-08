import Header from '../components/Header'
import { useLocation } from 'react-router-dom';

//import PostcodeInput from '../components/PostCodeInput';
import CheckoutForm from '../components/CheckoutForm';



export default function Checkout() {
    let state = useLocation();
    return (
        <>
            <Header/>
            <h2>Registrering</h2>
            <CheckoutForm itemList={state.state}/>
        </>
    )
}