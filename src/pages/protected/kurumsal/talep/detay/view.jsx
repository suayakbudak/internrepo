import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";

import { paths } from "src/routes/paths";

import { ORDER_STATUS_OPTIONS } from "src/_mock";
import { DashboardContent } from "src/pages/protected/layout";

import { OrderDetailsItems } from "./components/order-details-item";
import { OrderDetailsToolbar } from "./components/order-details-toolbar";
import { OrderDetailsHistory } from "./components/order-details-history";
import { OrderDetailsPayment } from "./components/order-details-payment";
import { OrderDetailsCustomer } from "./components/order-details-customer";
import { OrderDetailsDelivery } from "./components/order-details-delivery";
import { OrderDetailsShipping } from "./components/order-details-shipping";

// ----------------------------------------------------------------------

export function OrderDetailsView({ order }) {
  const [status, setStatus] = useState(order?.status);

  const handleChangeStatus = useCallback((newValue) => {
    setStatus(newValue);
  }, []);

  return (
    <DashboardContent>
      <OrderDetailsToolbar
        status={status}
        createdAt={order?.createdAt}
        orderNumber={order?.orderNumber}
        backHref={paths.anasayfa.kurumsal.talep.root}
        onChangeStatus={handleChangeStatus}
        statusOptions={ORDER_STATUS_OPTIONS}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{ gap: 3, display: "flex", flexDirection: { xs: "column-reverse", md: "column" } }}
          >
            <OrderDetailsItems
              items={order?.items}
              taxes={order?.taxes}
              shipping={order?.shipping}
              discount={order?.discount}
              subtotal={order?.subtotal}
              totalAmount={order?.totalAmount}
            />

            <OrderDetailsHistory history={order?.history} />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <OrderDetailsCustomer customer={order?.customer} />

            <Divider sx={{ borderStyle: "dashed" }} />
            <OrderDetailsDelivery delivery={order?.delivery} />

            <Divider sx={{ borderStyle: "dashed" }} />
            <OrderDetailsShipping shippingAddress={order?.shippingAddress} />

            <Divider sx={{ borderStyle: "dashed" }} />
            <OrderDetailsPayment payment={order?.payment} />
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
