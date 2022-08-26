import { ClosingAccount } from "./closing-account.model";
import { RecipientAccount } from "./recipient-account.model";
import { Transfer } from "./transfer.model";

interface RebalancingTxResponse {
    transfers: Transfer[];
    operationalFee: number;
}

export class RebalancingTxService {
    public static newRebalancingTx(closingAccounts: ClosingAccount[], recipientAccounts: RecipientAccount[]): RebalancingTxResponse {
        // Not sure if I can side efects on the objects, best practice is to don't do it :)), so I'm kinda cloning the objects
        const response: RebalancingTxResponse = {
            transfers: [],
            operationalFee: 0,
        };
        const closingAccountsClone = [...closingAccounts];
        const recipientAccountsClone = [...recipientAccounts];

        let indexC = 0;
        let indexR = 0;
        while (indexC < closingAccountsClone.length) {
            const closingAccount = closingAccountsClone[indexC];
            while (indexR < recipientAccountsClone.length && closingAccount.amount > 0) {
                const recipientAccount = recipientAccountsClone[indexR];
                if (closingAccount.amount >= recipientAccount.credit) {
                    response.transfers.push({
                        fromAccountId: closingAccount.id,
                        toAccountId: recipientAccount.id,
                        value: recipientAccount.credit
                    });
                    if (closingAccount.amount === recipientAccount.credit) {
                        closingAccountsClone.splice(indexC, 1);
                        indexC--;
                    }
                    closingAccount.amount -= recipientAccount.credit;
                    recipientAccountsClone.splice(indexR, 1);
                    indexR--;
                } else {
                    response.transfers.push({
                        fromAccountId: closingAccount.id,
                        toAccountId: recipientAccount.id,
                        value: recipientAccount.credit
                    });
                    recipientAccount.credit -= closingAccount.amount;
                    closingAccount.amount = 0;
                    closingAccountsClone.splice(indexC, 1);
                    indexC--;
                }
                indexR++;
            }
            indexC++;
        }
        if (closingAccountsClone.length > 0) {
            response.operationalFee = response.transfers.length * 10;
            let sumClosing = closingAccountsClone.reduce(
                (previousValue, currentValue) => previousValue + currentValue.amount,
                0
            );
            if (sumClosing < response.transfers.length * 10) {
                throw new Error("not enough funds for rebalance")
            }
            // In this case all the remainder goes in fee
            if (sumClosing === response.transfers.length * 10) {
                return response;
            }
            let operationalFee = response.operationalFee;
            while (operationalFee > 0) {
                operationalFee -= closingAccountsClone[closingAccountsClone.length - 1].amount;
                if (operationalFee >= 0) {
                    closingAccountsClone.pop()
                } else {
                    closingAccountsClone[closingAccountsClone.length - 1].amount = -operationalFee;
                }
            }
            const indexC = 0;
            while (indexC < closingAccountsClone.length) {
                const account = closingAccountsClone[indexC];
                closingAccountsClone[closingAccountsClone.length - 1].amount -= 10;
                if (closingAccountsClone[closingAccountsClone.length - 1].amount <= 0) {
                    closingAccountsClone.pop();
                }
                if (account.amount > 0) {
                    response.operationalFee += 10;
                    response.transfers.push({
                        fromAccountId: account.id,
                        toAccountId: null,
                        value: account.amount
                    });
                    account.amount = 0;
                }
            };


        }
        return response;
    }
}

// It remains the very weird case with an closingAccount of 10 or remaining account of 10. What it has to be done? It doesn't transfer and it remains as fee? 
// PS: not very proud of this code, it needs some refactoring, but it works, as far as I tested it 