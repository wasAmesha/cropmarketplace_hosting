import { Button } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import UserManagement from "../../components/Admin/UserManagement";
import ProductManagement from "../../components/Admin/ProductManagement";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function AdminPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        width: "100%",
      }}
    >
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          backgroundColor: "#79ac78",
          minWidth: "30vh",
        }}
      >
        <div style={{ padding: "1rem", paddingTop: "2rem" }}>
          <img
            src={"/Navbar/icon.png"}
            alt=""
            className="navbar-icon"
            style={{ width: "100%" }}
          />
        </div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", marginTop: "10vh" }}
        >
          <Tab
            label={
              <span style={{ display: "flex", alignItems: "center" }}>
                <PeopleIcon style={{ marginRight: "1rem" }} />
                User Management
              </span>
            }
            {...a11yProps(0)}
            style={{ fontSize: "16px", color: "white", height: "5rem" }}
          />
          <Tab
            label={
              <span style={{ display: "flex", alignItems: "center" }}>
                <InventoryIcon style={{ marginRight: "1rem" }} />
                Product Management
              </span>
            }
            {...a11yProps(1)}
            style={{
              fontSize: "16px",
              color: "white",
              cursor: "pointer",
              height: "5rem",
            }}
          ></Tab>
          <Button
            fullWidth
            size="large"
            color="success"
            variant="contained"
            style={{ marginTop: "50vh" }}
            startIcon={<LogoutTwoToneIcon />}
            onClick={() => {
              localStorage.clear();
              window.location = "/cxc-admin";
            }}
          >
            Logout
          </Button>
        </Tabs>
      </div>
      <div style={{ flex: 3.5 }}>
        <TabPanel value={value} index={0}>
          <UserManagement />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductManagement />
        </TabPanel>
      </div>
    </Box>
  );
}
