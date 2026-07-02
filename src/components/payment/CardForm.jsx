import { useState } from "react";
import "./CardForm.css";

function CardForm() {

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        holderName: "",
        expiryDate: "",
        cvv: ""
    });

    function cardHandler(e) {
        setCardDetails({
            ...cardDetails,
            [e.target.name]: e.target.value
        });
    }

    function payHandler() {
        <Receipt />
    }

    return (
        <div className="card-form">
            <h2 className="card-title">Card Payment</h2>
            <div>
                <label className="card-label"> Card Number </label>
                <input name="cardNumber" type="text" value={cardDetails.cardNumber} onChange={cardHandler} placeholder="1234 5678 9012 3456" className="card-input"/>
            </div>

            <div>
                <label className="card-label"> Card Holder Name </label>
                <input name="holderName" type="text" value={cardDetails.holderName} onChange={cardHandler} placeholder="Enter card holder name" className="card-input" />
            </div>

            <div className="card-grid">
                <div>
                    <label className="card-label"> Expiry Date </label>
                    <input name="expiryDate" type="text" value={cardDetails.expiryDate} onChange={cardHandler} placeholder="MM/YY" className="card-input" />
                </div>

                <div>
                    <label className="card-label">  CVV </label>
                    <input name="cvv" type="password" value={cardDetails.cvv} onChange={cardHandler} placeholder="***" className="card-input"/>
                </div>

            </div>

            <button onClick={payHandler} className="card-button">Pay Now</button>
        </div>
    );
}

export default CardForm;