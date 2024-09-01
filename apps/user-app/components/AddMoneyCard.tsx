"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
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
            <Select onSelect={(val) => {
                setRedirect_url(SUPPORTED_BANKS.find(x => x.name === val)?.redirectUrl || "")
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="flex justify-center pt-4">
                <Button onClick={() => {
                    window.location.href = redirect_url || "";
                }}>Add Money</Button>
            </div>
        </div>
    </Card>

}