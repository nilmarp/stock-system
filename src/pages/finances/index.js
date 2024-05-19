import React from "react";
import { ResumedRents } from "./ResumedRents";
import { RentsPerDay } from "./RentsPerDay";
import { PaymentsPrev } from "./PaymentsPrev";

export default function Finances(params) {
    return (
        <div className="column">
            <ResumedRents />
            <RentsPerDay />
            <PaymentsPrev />
        </div>
    )
}