import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddNewProduct, DeleteProduct, UpdateProduct } from "../../services/productService";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

export default function EditProductForm({ onClose, category, product }) {
  const [productData, setProductData] = useState({
    productName: "",
    productCategory: category,
    productImage: null,
  });

  useEffect(() => {
    setProductData(product);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          setProductData({ ...productData, productImage: result });
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error while compressing the image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await UpdateProduct(product._id, {
        productName: productData.productName,
        productCategory: category,
        productImage: productData.productImage,
      });
      toast.success(data);
      onClose();
    } catch (err) {
      console.log(err);
      if (err.response) {
        if (
          err.response.status === 413 &&
          err.response.statusText === "Payload Too Large"
        ) {
          toast.error("Image Size Too Large");
        }
      }
    }
  };

  const handleDelete = async()=>{
    await DeleteProduct(product._id).then(({data})=>{
        toast.success(data);
        onClose();
    }).catch((err)=> toast.error(err.response.data))
  }

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
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
        {productData.productImage ? (
          <>
            <img
              src={productData.productImage}
              alt="Uploaded"
              style={{
                minWidth: "30vh",
                maxWidth: "30vh",
                minHeight: "30vh",
                maxHeight: "30vh",
                border: "1px solid ",
              }}
            />
            <Button
              color="error"
              variant="contained"
              size="small"
              startIcon={<DeleteIcon />}
              fullWidth
              style={{ marginTop: "-90%" }}
              onClick={() => {
                setProductData({ ...productData, productImage: null });
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
            <span style={{ marginLeft: "10px" }}>Item Image</span>
          </label>
        )}
      </div>
      <form style={{ marginTop: "0.5rem" }} onSubmit={handleSubmit}>
        <TextField
          margin="margin"
          fullWidth
          required
          type="text"
          label="Product Name"
          name="productName"
          value={productData.productName}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal" disabled>
          <InputLabel id="demo-simple-select-label">
            Product Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productData.productCategory}
            label="Product Category"
            name="productCategory"
            onChange={handleChange}
          >
            <MenuItem value="Veg">Vegetables</MenuItem>
            <MenuItem value="Fruit">Fruits</MenuItem>
            <MenuItem value="Grain">Grains</MenuItem>
            <MenuItem value="Spices">Spices</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            style={{ marginBottom: "5px" }}
            color="success"
            type="submit"
          >
            Save Changes
          </Button>
          <Button variant="contained" fullWidth onClick={() => onClose()}>
            Cancel
          </Button>
          <br />
          <Button
            variant="contained"
            fullWidth
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete This item
          </Button>
        </div>
      </form>
    </div>
  );
}
