import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserPosts from "./UserPosts";
import { getCurrentUser } from "../../services/userService";
import OffersSection from "./OffersSection";
import OrdersSection from "./OrdersSection";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function OtherSections({setPostCount}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const user = getCurrentUser();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  if(user.role !== "Deliveryman"){
    return (
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "rgba(121, 172, 120)",
              height: "4px",
            },
          }}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{ bgcolor: "rgba(121, 172, 120, 0.4)" }}
        >
          <Tab label="My Posts" {...a11yProps(0)} />
          <Tab label="Offers" {...a11yProps(1)} />
          <Tab label="Orders" {...a11yProps(2)} />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <UserPosts setPostCount={setPostCount} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <OffersSection />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <OrdersSection />
          </TabPanel>
        </SwipeableViews>
      </Box>
    );
  }else{
    return (
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "rgba(121, 172, 120)",
              height: "4px",
            },
          }}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{ bgcolor: "rgba(121, 172, 120, 0.4)" }}
        >
          <Tab label="My Posts" {...a11yProps(0)} />
          <Tab label="Orders" {...a11yProps(1)} />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <UserPosts setPostCount={setPostCount} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <OrdersSection />
          </TabPanel>
        </SwipeableViews>
      </Box>
    );
  }

}
