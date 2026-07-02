import { useState } from "react";
import "./UPIForm.css";

function UPIForm() {

    const [upiId, setUpiId] = useState("");

    function upiHandler(e) {
        setUpiId(e.target.value);
    }

    function payHandler() {
        // <Receipt />
    }

    return (
        <div className="upi-form">
            <h2 className="upi-title">UPI Payment</h2>

            <div>
                <label className="upi-label">Enter your UPI ID</label>
                <input type="text" value={upiId} onChange={upiHandler} placeholder="example@oksbi" className="upi-input" />
            </div>
            <button onClick={payHandler} className="upi-button"> Pay Now </button>
        </div>
    );
}

export default UPIForm;