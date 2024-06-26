import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

export default function DeliveryStatus({ delivery }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [statuses, setStatuses] = React.useState(null);

  React.useEffect(() => {
    setStatuses(delivery);
    setActiveStep(delivery.deliveryStatus.length);
  }, [delivery]);

  return (
    <>
      <div
        style={{
          marginLeft: "2rem",
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
                      {format(new Date(step.date), "yyyy-MM-dd")}
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
        <br />
        <br />
      </div>
    </>
  );
}
