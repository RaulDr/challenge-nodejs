import { ClosingAccount } from "./closing-account.model";
import { RebalancingTxService } from "./rebalancing-tx.service";
import { RecipientAccount } from "./recipient-account.model";

const random = () => (Math.random() + 1).toString(36).substring(7);

const closingAccounts: ClosingAccount[] = [{id: random(), amount: 1000}];
const recepientAccounts: RecipientAccount[] = [{id: random(), credit: 500}, {id: random(), credit: 400}];
console.log(RebalancingTxService.newRebalancingTx(closingAccounts, recepientAccounts));