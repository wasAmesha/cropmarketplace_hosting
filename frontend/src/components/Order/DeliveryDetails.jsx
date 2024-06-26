import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { TextField } from "@mui/material";
import { UpdateOfferStatus } from "../../services/offerService";
import { toast } from "react-toastify";
import { UpdateOrderStatus } from "../../services/paymentService";

export default function DeliveryDetails({ delivery, fetchAllOrders }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [statuses, setStatuses] = React.useState(null);

  const [deliveryStatus, setDeliveryStatus] = React.useState({
    status: "",
    description: "",
  });

  React.useEffect(() => {
    setStatuses(delivery);
    setActiveStep(delivery.deliveryStatus.length);
  }, [delivery]);

  const handleSubmit = async () => {
    const status = {
      id: delivery.payId,
      cartId: delivery.orderId,
      status: { ...deliveryStatus, date: new Date() },
    };
    await UpdateOrderStatus(status)
      .then(({ data }) => {
        if (data.cartItems !== null) {
          const cartItem = [...data.cartItems].filter(
            (cart) => cart._id === delivery.orderId
          )[0];
          console.log(cartItem);
          setStatuses(cartItem);
          setActiveStep(cartItem.deliveryStatus.length);
        } else {
          setStatuses(data);
          setActiveStep(data.deliveryStatus.length);
        }

        setDeliveryStatus({
          status: "",
          description: "",
        });
        fetchAllOrders();
        toast.success("Updated Delivery Status");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <>
      <div
        style={{
          marginLeft: "2rem",
          maxHeight: "43vh",
          overflowY: "auto",
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {statuses !== null &&
            [...statuses.deliveryStatus].reverse().map((step, index) => (
              <Step
                sx={{ display: "flex", flexDirection: "column" }}
                key={step.status}
              >
                <StepLabel
                  optional={
                    <Typography variant="caption">
                      {format(step.date, "yyyy-MM-dd")}
                    </Typography>
                  }
                >
                  {step.status}
                </StepLabel>
                <Typography sx={{ ml: 4, mt: 1 }}>
                  {step.description}
                </Typography>
              </Step>
            ))}
        </Stepper>
      </div>
      <div style={{ margin: "2rem" }}>
        <Typography variant="h6">Update Delivery Step</Typography>
        <TextField
          fullWidth
          label="Add Current Step"
          margin="normal"
          value={deliveryStatus.status}
          onChange={(e) =>
            setDeliveryStatus({ ...deliveryStatus, status: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Description"
          margin="normal"
          multiline
          rows={2}
          value={deliveryStatus.description}
          onChange={(e) =>
            setDeliveryStatus({
              ...deliveryStatus,
              description: e.target.value,
            })
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Update Status
          </Button>
        </div>
      </div>
    </>
  );
}
