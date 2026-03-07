import { _userPlans, _userPayment, _userInvoices, _userAddressBook } from "src/_mock";

import Grid from "@mui/material/Grid2";

import { AccountBillingPlan } from "./components/account-billing-plan";
import { AccountBillingPayment } from "./components/account-billing-payment";
import { AccountBillingHistory } from "./components/account-billing-history";
import { AccountBillingAddress } from "./components/account-billing-address";

// ----------------------------------------------------------------------

export function AccountBillingView() {
  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 12, md: 8 }}>
        <AccountBillingPlan
          plans={_userPlans}
          cardList={_userPayment}
          addressBook={_userAddressBook}
        />
        <AccountBillingPayment cards={_userPayment} />
        <AccountBillingAddress addressBook={_userAddressBook} />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <AccountBillingHistory invoices={_userInvoices} />
      </Grid>
    </Grid>
  );
}
