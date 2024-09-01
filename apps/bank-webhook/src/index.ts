import express from "express";
import db from "@repo/db/client";

const app = express();

app.post("/bankWebhook", async function (req,res){

    // Use webhook secret to check if the req really came from the bank
    const paymentInfo = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInfo.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount)
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInfo.token,
                },
                data: {
                    status: "Success"
                }
            })
        ])
        res.status(200).json({
            message: "captured!"
        })
    } catch(err) {
        console.log(err);
        res.status(411).json({
            message: "Error while processing webhook!"
        })
    }
});

app.listen(3003);