require('dotenv').config();
const { ethers } = require('ethers');
const {TxBuilder} = require("@morpho-labs/gnosis-tx-builder");
const fs = require("node:fs");

function generateGnosisSafeJson() {
    console.log("Started");
    try {
        const tx = ethers.Transaction.from(process.env.RAW_TRANSACTION);

        const transactions = [
            {
                to: tx.to,
                value: ethers.parseUnits(process.env.VALUE_IN_ETHER, 'ether').toString(),
                data: tx.data,
            },
        ];

        const batchJson = TxBuilder.batch(
            process.env.SAFE_ADDRESS,
            transactions, {
                chainId: process.env.CHAIN_ID,
                description: 'Use this JSON in Gnosis Safe Transaction Builder'
            });
        fs.writeFileSync("batchTx.json", JSON.stringify(batchJson, null, 2));
        console.log('Finished');
    } catch (error) {
        console.error('Error:', error);
    }
}

generateGnosisSafeJson()
