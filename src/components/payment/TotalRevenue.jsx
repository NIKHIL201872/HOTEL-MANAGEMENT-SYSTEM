import { useMemo } from "react";

function TotalRevenue({ payments }) {

    const totalRevenue = useMemo(() => {

        return payments.reduce(
            (total, payment) => total + Number(payment.amount),
            0
        );

    }, [payments]);

    return (
        <div className="payment-summary">
            <h2>
                Total Revenue : $ {totalRevenue}
            </h2>
        </div>
    );
}

export default TotalRevenue;