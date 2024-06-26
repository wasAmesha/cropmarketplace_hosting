import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpdatedPostById } from "../../services/postService";
import { toast } from "react-toastify";

export default function EditPostForm({ post, onClose }) {
  const [postData, setPostData] = useState({
    productId: null,
    userId: null,
    quantity: null,
    vehicleModelName: null,
    vehicleCapacity: null,
    vehicleImage: null,
    price: null,
    district: "colombo",
    company: null,
    mobile: null,
    email: null,
    address: null,
    expireDate: null,
  });

  const user = getCurrentUser();
  useEffect(() => {
    setPostData({
      ...post,
      productId: post.product ? post.product._id : null,
    });
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };
  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      setPostData({ ...postData, vehicleImage: result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedPost = postData;
    delete updatedPost.product;
    delete updatedPost._id;
    delete updatedPost.__v;
    delete updatedPost.postedDate;

    console.log("Data:", updatedPost);
    await UpdatedPostById(post._id, postData)
      .then(({ data }) => {
        toast.success(data);
        onClose();
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div style={{ minHeight: "70vh" }}>
      <form onSubmit={handleSubmit}>
        {user.role === "Deliveryman" && (
          <div
            style={{
              backgroundColor: "#E9EAEC",
              width: "30vh",
              height: "30vh",
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "30vh",
              border: "1px solid #C7C9CE",
              cursor: "pointer",
              marginRight: "2rem",
              marginBottom: "2rem",
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
              id="photoInput"
            />
            {postData.vehicleImage ? (
              <>
                <img
                  src={postData.vehicleImage}
                  alt="Uploaded"
                  style={{
                    minWidth: "100%",
                    minHeight: "30vh",
                    maxHeight: "30vh",

                    border: "1px solid ",
                  }}
                ></img>
                <Button
                  color="error"
                  variant="contained"
                  size="small"
                  startIcon={<DeleteIcon />}
                  fullWidth
                  style={{ marginTop: "-90%" }}
                  onClick={() => {
                    setPostData({ ...postData, vehicleImage: null });
                  }}
                >
                  Remove
                </Button>
              </>
            ) : (
              <label
                htmlFor="photoInput"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                <CameraEnhanceIcon size={20} />
                <span style={{ marginLeft: "10px" }}>Vehicle Image</span>
              </label>
            )}
          </div>
        )}
        <TextField
          type="number"
          name="price"
          value={postData.price}
          onChange={handleChange}
          label={user.role !== "Deliveryman" ? "Price per KG" : "Price per KM"}
          margin="normal"
          fullWidth
        />
        {user.role !== "Deliveryman" && (
          <TextField
            type="number"
            name="quantity"
            InputProps={{
              endAdornment: <InputAdornment position="end">KG</InputAdornment>,
            }}
            value={postData.quantity}
            onChange={handleChange}
            label="Quantity"
            margin="normal"
            fullWidth
          />
        )}

        {user.role === "Deliveryman" && (
          <>
            <TextField
              type="text"
              name="vehicleModelName"
              value={postData.vehicleModelName}
              onChange={handleChange}
              label="Vehicle Model"
              margin="normal"
              fullWidth
            />
            <TextField
              type="number"
              name="vehicleCapacity"
              value={postData.vehicleCapacity}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">KG</InputAdornment>
                ),
              }}
              onChange={handleChange}
              label="Vehicle Capacity"
              margin="normal"
              fullWidth
            />
          </>
        )}

        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">District</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={postData.district}
            label="District"
            name="district"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          >
            <MenuItem value="">Select District</MenuItem>
            <MenuItem value="ampara">Ampara</MenuItem>
            <MenuItem value="anuradhapura">Anuradhapura</MenuItem>
            <MenuItem value="badulla">Badulla</MenuItem>
            <MenuItem value="batticaloa">Batticaloa</MenuItem>
            <MenuItem value="colombo">Colombo</MenuItem>
            <MenuItem value="galle">Galle</MenuItem>
            <MenuItem value="gampaha">Gampaha</MenuItem>
            <MenuItem value="hambantota">Hambantota</MenuItem>
            <MenuItem value="jaffna">Jaffna</MenuItem>
            <MenuItem value="kalutara">Kalutara</MenuItem>
            <MenuItem value="kandy">Kandy</MenuItem>
            <MenuItem value="kegalle">Kegalle</MenuItem>
            <MenuItem value="kilinochchi">Kilinochchi</MenuItem>
            <MenuItem value="kurunegala">Kurunegala</MenuItem>
            <MenuItem value="mannar">Mannar</MenuItem>
            <MenuItem value="matale">Matale</MenuItem>
            <MenuItem value="matara">Matara</MenuItem>
            <MenuItem value="moneragala">Moneragala</MenuItem>
            <MenuItem value="mullaitivu">Mullaitivu</MenuItem>
            <MenuItem value="nuwara-eliya">Nuwara Eliya</MenuItem>
            <MenuItem value="polonnaruwa">Polonnaruwa</MenuItem>
            <MenuItem value="puttalam">Puttalam</MenuItem>
            <MenuItem value="ratnapura">Ratnapura</MenuItem>
            <MenuItem value="trincomalee">Trincomalee</MenuItem>
            <MenuItem value="vavuniya">Vavuniya</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="text"
          name="company"
          value={postData.company}
          onChange={handleChange}
          label="Company"
          margin="normal"
          fullWidth
        />
        <TextField
          type="text"
          name="mobile"
          value={postData.mobile}
          onChange={handleChange}
          label="Mobile Number"
          margin="normal"
          fullWidth
        />
        <TextField
          type="email"
          name="email"
          value={postData.email}
          onChange={handleChange}
          label="Email"
          margin="normal"
          fullWidth
        />
        <TextField
          type="text"
          name="address"
          value={postData.address}
          onChange={handleChange}
          label="Address"
          margin="normal"
          fullWidth
        />
        <TextField
          type="date"
          name="expireDate"
          value={postData.expireDate}
          onChange={handleChange}
          margin="normal"
          label="Expire Date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => {
              setPostData(post);
            }}
            color="error"
            sx={{ marginRight: "1rem" }}
          >
            Clear
          </Button>
          <Button type="submit" variant="contained" color="success">
            Save changes
          </Button>
        </div>

        <br />
      </form>
    </div>
  );
}
