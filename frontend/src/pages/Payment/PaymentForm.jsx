import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, InputAdornment } from "@mui/material";
// import { createNewPayment } from "../../services/paymentService";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../services/userService";
import { GetAllPosts } from "../../services/postService";
import PostCard from "../../components/Posts/PostCard";

export default function PaymentForm({ handleSaveDetails }) {
  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "bankDeposit",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    nameOnCard: "",
    fromLocation: "",
    toLocation: "",
    distance: "",
  });
  const [errors, setErrors] = useState({});
  const [deliveryPosts, setDeliveryPosts] = useState([]);
  const [selected, setSelected] = React.useState("");

  useEffect(() => {
    const user = getCurrentUser();
    if (!user._id) return (window.location = "/login");

    const fetchAllPosts = async () => {
      await GetAllPosts()
        .then(({ data }) => {
          setDeliveryPosts(
            [...data].filter((post) => post.type === "Delivery")
          );
        })
        .catch((err) => toast.error(err.response.data));
    };
    fetchAllPosts();
  }, [selected]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePaymentMethodChange = (event) => {
    setFormData({ ...formData, paymentMethod: event.target.value });
  };

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {

      const service = deliveryPosts.filter((d) => d._id === selected)[0];
      handleSaveDetails(formData.distance * service.price, formData, selected);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateFormData = (data) => {
    let errors = {};
    const requiredFields = [
      "country",
      "firstName",
      "lastName",
      "address",
      "city",
      "postalCode",
      "phone",
    ];
    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors[field] = "This field is required";
      }
    });
    if (data.paymentMethod === "creditCard") {
      const cardFields = [
        "cardNumber",
        "expirationDate",
        "securityCode",
        "nameOnCard",
      ];
      cardFields.forEach((field) => {
        if (!data[field]) {
          errors[field] = "This field is required";
        }
      });
    }
    return errors;
  };

  return (
    <div id="form-content" style={{ padding: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <div className="Delivery" style={{ marginBottom: "1rem" }}>
          <h5>Delivery Details</h5>
          <TextField
            id="country"
            name="country"
            label="Country/Region"
            variant="filled"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.country}
            onChange={handleInputChange}
            error={!!errors.country}
            helperText={errors.country}
          />
          <div style={{ display: "flex" }}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              variant="filled"
              style={{
                width: "100%",
                marginRight: "1rem",
                marginBottom: "1rem",
              }}
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="filled"
              style={{ width: "100%", marginBottom: "1rem" }}
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </div>
          <TextField
            id="address"
            label="Address"
            name="address"
            variant="filled"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            id="apartment"
            label="Apartment, Suit, etc. (Optional)"
            name="apartment"
            variant="filled"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.apartment}
            onChange={handleInputChange}
          />
          <div style={{ display: "flex" }}>
            <TextField
              id="city"
              label="City"
              name="city"
              variant="filled"
              style={{
                width: "100%",
                marginRight: "1rem",
                marginBottom: "1rem",
              }}
              value={formData.city}
              onChange={handleInputChange}
              error={!!errors.city}
              helperText={errors.city}
            />
            <TextField
              id="postalCode"
              label="Postal Code"
              name="postalCode"
              variant="filled"
              style={{ width: "100%", marginBottom: "1rem" }}
              value={formData.postalCode}
              onChange={handleInputChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
            />
          </div>
          <TextField
            id="phone"
            label="Phone"
            variant="filled"
            name="phone"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </div>
        <div className="delivery-service" style={{ marginBottom: "1rem" }}>
          <h5>Delivery Service</h5>
          <div className="items-list">
            {deliveryPosts.map((post, index) => (
              <PostCard
                key={index}
                post={post}
                clickEnable={true}
                selected={selected}
                setSelected={handleSelect}
              />
            ))}
          </div>
          {selected && (
            <div style={{ padding: "1rem" }}>
              <div style={{ display: "flex" }}>
                <TextField
                  id="fromLocation"
                  name="fromLocation"
                  label="From Location"
                  variant="filled"
                  style={{
                    width: "100%",
                    marginRight: "1rem",
                    marginBottom: "1rem",
                  }}
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  error={!!errors.fromLocation}
                  helperText={errors.fromLocation}
                />
                <TextField
                  id="toLocation"
                  name="toLocation"
                  label="To Location"
                  variant="filled"
                  style={{
                    width: "100%",
                    marginBottom: "1rem",
                  }}
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  error={!!errors.toLocation}
                  helperText={errors.toLocation}
                />
              </div>
              <TextField
                id="distance"
                name="distance"
                label="Distance (KM)"
                type="number"
                variant="filled"
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KM</InputAdornment>
                  ),
                }}
                value={formData.distance}
                onChange={handleInputChange}
                error={!!errors.distance}
                helperText={errors.distance}
              />
            </div>
          )}
        </div>
        <div className="Payment" style={{ marginBottom: "1rem" }}>
          <h5>Payment Method</h5>
          <RadioGroup
            aria-labelledby="payment-method-group-label"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <FormControlLabel
              value="creditCard"
              control={<Radio />}
              label="Credit Card"
            />
            {formData.paymentMethod === "creditCard" && (
              <div>
                <TextField
                  id="cardNumber"
                  name="cardNumber"
                  label="Card Number"
                  variant="filled"
                  style={{ width: "100%", marginBottom: "1rem" }}
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                />
                <div style={{ display: "flex" }}>
                  <TextField
                    id="expirationDate"
                    name="expirationDate"
                    label="Expiration Date (MM/YY)"
                    variant="filled"
                    style={{
                      width: "100%",
                      marginRight: "1rem",
                      marginBottom: "1rem",
                    }}
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    error={!!errors.expirationDate}
                    helperText={errors.expirationDate}
                  />
                  <TextField
                    id="securityCode"
                    name="securityCode"
                    label="Security Code"
                    variant="filled"
                    style={{
                      width: "100%",
                      marginBottom: "1rem",
                    }}
                    value={formData.securityCode}
                    onChange={handleInputChange}
                    error={!!errors.securityCode}
                    helperText={errors.securityCode}
                  />
                </div>
                <TextField
                  id="nameOnCard"
                  name="nameOnCard"
                  label="Name on Card"
                  variant="filled"
                  style={{ width: "100%", marginBottom: "1rem" }}
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  error={!!errors.nameOnCard}
                  helperText={errors.nameOnCard}
                />
              </div>
            )}
            <FormControlLabel
              value="cashOnDelivery"
              control={<Radio />}
              label="Cash on Delivery (COD)"
            />
            <FormControlLabel
              value="bankDeposit"
              control={<Radio />}
              label="Bank Deposit"
            />
          </RadioGroup>
          {!!errors.paymentMethod && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              Please select a payment method.
            </div>
          )}
        </div>
        <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            size="small"
          >
            Save Details
          </Button>
        </div>
      </form>
    </div>
  );
}
