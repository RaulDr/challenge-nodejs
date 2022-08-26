import { ClosingAccount } from "./closing-account.model";
import { RebalancingTxService } from "./rebalancing-tx.service";
import { RecipientAccount } from "./recipient-account.model";


describe('Build transaction test', () => {
    it('should result 4 permutations for 101*011*1', () => {
        const random = () => (Math.random() + 1).toString(36).substring(7);
        const result = {
            transfers: [
              { fromAccountId: 'ctf9w', toAccountId: 'updxr', value: 500 },
              { fromAccountId: 'ctf9w', toAccountId: 'v719eg', value: 400 },
              { fromAccountId: 'ctf9w', toAccountId: null, value: 70 }
            ],
            operationalFee: 30
          }
        const closingAccounts: ClosingAccount[] = [{id: 'ctf9w', amount: 1000}];
        const recepientAccounts: RecipientAccount[] = [{id: 'updxr', credit: 500}, {id: 'v719eg', credit: 400}];
        expect(RebalancingTxService.newRebalancingTx(closingAccounts, recepientAccounts)).toEqual(result);
    })
});
