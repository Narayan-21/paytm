"use client"

import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirect_url: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}]

export const AddMoney = () => {
    const [redirect_url, setRedirect_url] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    return <Card title="Add money">
        <div className="w-full">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={() => {
            }} />
            <div className="py-4 text-left">
                Bank
            </div>
        </div>
    </Card>

}