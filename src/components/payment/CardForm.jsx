import { useState } from "react";
import "./CardForm.css";

<<<<<<< HEAD
function CardForm({ onPay, disabled }) {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    holderName: "",
    expiryDate: "",
    cvv: "",
  });

  function cardHandler(e) {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
=======
function CardForm({ submitPayment }) {

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        holderName: "",
        expiryDate: "",
        cvv: "",
        amount: ""
>>>>>>> 118b66c (Payment and Review completed done with all endpoints)
    });
  }

<<<<<<< HEAD
  function payHandler() {
    const { cardNumber, holderName, expiryDate, cvv } = cardDetails;
    if (
      !cardNumber.trim() ||
      !holderName.trim() ||
      !expiryDate.trim() ||
      !cvv.trim()
    )
      return;
    onPay?.();
  }

  return (
    <div className="card-form">
      <h2 className="card-title">Card Payment</h2>
      <div>
        <label className="card-label"> Card Number </label>
        <input
          name="cardNumber"
          type="text"
          value={cardDetails.cardNumber}
          onChange={cardHandler}
          placeholder="1234 5678 9012 3456"
          className="card-input"
        />
      </div>

      <div>
        <label className="card-label"> Card Holder Name </label>
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
          <label className="card-label"> Expiry Date </label>
          <input
            name="expiryDate"
            type="text"
            value={cardDetails.expiryDate}
            onChange={cardHandler}
            placeholder="MM/YY"
            className="card-input"
          />
=======
    function cardHandler(e) {

        const { name, value } = e.target;

        setCardDetails({
            ...cardDetails,
            [name]: value
        });

    }

    function payHandler() {

        const {
            cardNumber,
            holderName,
            expiryDate,
            cvv,
            amount
        } = cardDetails;

        // Empty field validation
        if (
            !cardNumber ||
            !holderName ||
            !expiryDate ||
            !cvv ||
            !amount
        ) {
            alert("Please fill all fields.");
            return;
        }

        // Card Number Validation
        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Card Number must contain exactly 16 digits.");
            return;
        }

        // Card Holder Name Validation
        if (!/^[A-Za-z ]+$/.test(holderName)) {
            alert("Card Holder Name should contain only alphabets.");
            return;
        }

        // Expiry Date Validation
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            alert("Expiry Date must be in MM/YY format.");
            return;
        }

        // CVV Validation
        if (!/^\d{3}$/.test(cvv)) {
            alert("CVV must contain exactly 3 digits.");
            return;
        }

        // Amount Validation
        if (Number(amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const payment = {
            reservation_id: 1,
            amount: Number(amount),
            payment_date: new Date().toISOString().split("T")[0],
            payment_status: "Paid"
        };

        submitPayment(payment);

        // Optional: Clear the form after successful payment
        setCardDetails({
            cardNumber: "",
            holderName: "",
            expiryDate: "",
            cvv: "",
            amount: ""
        });

    }

    return (
        <div className="card-form">

            <h2 className="card-title">
                Card Payment
            </h2>

            <div>
                <label className="card-label">
                    Card Number
                </label>

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
                <label className="card-label">
                    Card Holder Name
                </label>

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
                    <label className="card-label">
                        Expiry Date
                    </label>

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
                    <label className="card-label">
                        CVV
                    </label>

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

            <div>

                <label className="card-label">
                    Amount to Pay
                </label>

                <input
                    name="amount"
                    type="number"
                    min="1"
                    value={cardDetails.amount}
                    onChange={cardHandler}
                    placeholder="Enter amount"
                    className="card-input"
                />

            </div>

            <button
                onClick={payHandler}
                className="card-button"
            >
                Pay Now
            </button>

>>>>>>> 118b66c (Payment and Review completed done with all endpoints)
        </div>

        <div>
          <label className="card-label"> CVV </label>
          <input
            name="cvv"
            type="password"
            value={cardDetails.cvv}
            onChange={cardHandler}
            placeholder="***"
            className="card-input"
          />
        </div>
      </div>

      <button onClick={payHandler} className="card-button" disabled={disabled}>
        Pay Now
      </button>
    </div>
  );
}

export default CardForm;
