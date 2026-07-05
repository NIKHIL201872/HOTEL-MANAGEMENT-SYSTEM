import { useState } from "react";
import "./CardForm.css";

function CardForm({ onPay, disabled }) {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        holderName: "",
        expiryDate: "",
        cvv: "",
    });

    function cardHandler(e) {
        const { name, value } = e.target;

        setCardDetails({
            ...cardDetails,
            [name]: value,
        });
    }

    function payHandler() {
        const { cardNumber, holderName, expiryDate, cvv } = cardDetails;

        // Empty validation
        if (
            !cardNumber ||
            !holderName ||
            !expiryDate ||
            !cvv
        ) {
            alert("Please fill all fields.");
            return;
        }

        // Card Number Validation
        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Card Number must contain exactly 16 digits.");
            return;
        }

        // Holder Name Validation
        if (!/^[A-Za-z ]+$/.test(holderName)) {
            alert("Card Holder Name should contain only alphabets.");
            return;
        }

        // Expiry Validation
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            alert("Expiry Date must be in MM/YY format.");
            return;
        }

        // CVV Validation
        if (!/^\d{3}$/.test(cvv)) {
            alert("CVV must contain exactly 3 digits.");
            return;
        }

        onPay?.();

        setCardDetails({
            cardNumber: "",
            holderName: "",
            expiryDate: "",
            cvv: "",
        });
    }

    return (
        <div className="card-form">
            <h2 className="card-title">Card Payment</h2>

            <div>
                <label className="card-label">Card Number</label>

                <input
                    name="cardNumber"
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={cardHandler}
                    placeholder="1234567812345678"
                    className="card-input"
                    maxLength={16}
                />
            </div>

            <div>
                <label className="card-label">Card Holder Name</label>

                <input
                    name="holderName"
                    type="text"
                    value={cardDetails.holderName}
                    onChange={cardHandler}
                    placeholder="Enter card holder name"
                    className="card-input"
                />
            </div>

            <div className="card-grid">
                <div>
                    <label className="card-label">Expiry Date</label>

                    <input
                        name="expiryDate"
                        type="text"
                        value={cardDetails.expiryDate}
                        onChange={cardHandler}
                        placeholder="MM/YY"
                        className="card-input"
                        maxLength={5}
                    />
                </div>

                <div>
                    <label className="card-label">CVV</label>

                    <input
                        name="cvv"
                        type="password"
                        value={cardDetails.cvv}
                        onChange={cardHandler}
                        placeholder="***"
                        className="card-input"
                        maxLength={3}
                    />
                </div>
            </div>

            <button
                onClick={payHandler}
                className="card-button"
                disabled={disabled}
            >
                Pay Now
            </button>
        </div>
    );
}

export default CardForm;