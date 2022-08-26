import express, { application } from "express";
import cors from "cors";

const app = express()
app.options('*', cors())
const port = 80

const transactions = [{
    id: 1,
    amount: 25.00,
    to: 'joe'
}]

app.use(express.json(), cors())

app.get('/', (req, res) => {
    return res.send(transactions)
})

app.post('/', (req, res) => {
    const transaction = req.body
    transactions.push(transaction)
    return res.send(`successfully added transaction #: ${transaction.id}, in the amount of ${transaction.amount} to: ${transaction.to}`)
})

app.delete('/', (req, res) => {
    const transaction = req.body
    const transactionIndex = transactions.findIndex(item => item.id == transaction.id)
    if (transactionIndex === -1) {
        res.send("no transaction with that id exists")
        return
    }
    transactions.splice(transactionIndex, 1)
    return res.send(`sucessfully deleted transaction #: ${transaction.id}}}`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
