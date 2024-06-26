import React, { useState } from "react";
import { GetProductByCategory } from "../../services/productService";
import { toast } from "react-toastify";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";

export default function ProductManagement() {
  const [categorySelected, setCategorySelected] = useState(null);
  const [products, setProducts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);

  const handleCloseAdd = () => {
    setOpenAdd(false);
    fetchProducts(categorySelected);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    fetchProducts(categorySelected);
  };
  const handleCategorySelection = (category) => {
    setCategorySelected(category);
    fetchProducts(category);
  };

  const fetchProducts = async (category) => {
    await GetProductByCategory(category)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => toast.error(err.response.data));
  };
  return (
    <div>
      <div style={{ marginBottom: "3rem", marginTop: "1rem" }}>
        <h3>
          <b>Product Management</b>
        </h3>
      </div>

      {categorySelected === null && (
        <>
          <div>
            <br />
            <center>
              <h4>
                <b>Product Categories</b>
              </h4>
            </center>
            <br />
          </div>
          <div className="image-row" style={{ display: "flex" }}>
            <img
              src={"/Categories/veg.png"}
              alt="Vegetable"
              className="image"
              onClick={() => handleCategorySelection("Veg")}
            />
            <img
              src={"/Categories/fruit.png"}
              alt="Fruit"
              className="image"
              onClick={() => handleCategorySelection("Fruit")}
            />
            <img
              src={"/Categories/grain.png"}
              alt="Grain"
              className="image"
              onClick={() => handleCategorySelection("Grain")}
            />
            <img
              src={"/Categories/spices.png"}
              alt="Spices"
              className="image"
              onClick={() => handleCategorySelection("Spices")}
            />
            <img
              src={"/Categories/other.png"}
              alt="Other"
              className="image"
              onClick={() => handleCategorySelection("Other")}
            />
          </div>
        </>
      )}
      {categorySelected !== null && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "2rem",
              marginRight: "2rem",
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                setProducts([]);
                setCategorySelected(null);
              }}
            >
              Back
            </Button>
            <Button
              startIcon={<AddIcon />}
              onClick={() => {
                setOpenAdd(true);
              }}
              variant="contained"
              color="success"
            >
              Add New
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "1rem",
              overflowY: "auto",
              justifyContent: "center",
              marginLeft: "1.5rem",
              maxHeight: "75vh",
            }}
          >
            <Grid
              container
              rowSpacing={0}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    className="products-item-veg"
                    key={product._id}
                    style={{
                      minWidth: "200px",
                      maxWidth: "150px",
                      maxHeight: "200px",
                      cursor: "pointer",
                      marginBottom: "1rem",
                    }}
                    onClick={()=>{
                        setItemSelected(product)
                        setOpenEdit(true)}}
                  >
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      style={{ maxHeight: "130px" }}
                    />
                    <p>{product.productName}</p>
                  </div>
                ))
              ) : (
                <p>No vegetable products found.</p>
              )}
            </Grid>
          </div>
        </div>
      )}
      <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth>
        <DialogTitle>Add New Item to {categorySelected}</DialogTitle>
        <DialogContent>
          <AddProductForm
            onClose={handleCloseAdd}
            category={categorySelected}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth>
        <DialogTitle>Edit New Item to {categorySelected}</DialogTitle>
        <DialogContent>
          <EditProductForm
            onClose={handleCloseEdit}
            category={categorySelected}
            product={itemSelected}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
