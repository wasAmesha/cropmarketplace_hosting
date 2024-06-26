import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useEffect, useRef, useState } from "react";
import { GetAllProducts } from "../../services/productService";
import { toast } from "react-toastify";
import { Button, Checkbox } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function PostFilter({ onFilter, onReset }) {
  const [categories, setCategories] = useState([
    {
      name: "Veg",
      image: "/Categories/veg.png",
      itemCount: 0,
      isOpen: false,
      items: [],
    },
    {
      name: "Fruit",
      image: "/Categories/fruit.png",
      itemCount: 0,
      isOpen: false,
      items: [],
    },
    {
      name: "Grain",
      image: "/Categories/grain.png",
      itemCount: 0,
      isOpen: false,
      items: [],
    },
    {
      name: "Spices",
      image: "/Categories/spices.png",
      itemCount: 0,
      isOpen: false,
      items: [],
    },
    {
      name: "Other",
      image: "/Categories/other.png",
      itemCount: 0,
      isOpen: false,
      items: [],
    },
  ]);
  const [filters, setFilters] = useState([]);
  const isCategoriesSet = useRef(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await GetAllProducts();

        if (!isCategoriesSet.current) {
          const updatedCategories = categories.map((category) => ({
            ...category,
            items: [],
            itemCount: 0,
          }));

          data.forEach((product) => {
            const categoryIndex = updatedCategories.findIndex(
              (category) =>
                category.name.toLowerCase() ===
                product.productCategory.toLowerCase()
            );

            if (categoryIndex !== -1) {
              updatedCategories[categoryIndex].items.push({ ...product });
              updatedCategories[categoryIndex].itemCount++;
            }
          });

          setCategories(updatedCategories);
          isCategoriesSet.current = true;
        }
      } catch (err) {
        toast.error(err.response.data);
      }
    };

    fetchAllProducts();
  }, [categories]);

  const handleClick = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].isOpen = !updatedCategories[index].isOpen;
    setCategories(updatedCategories);
  };

  const handelFilterSelection = (id) => {
    const newFilters = [...filters];
    if (newFilters.includes(id)) {
      setFilters(newFilters.filter((f) => f !== id));
    } else {
      newFilters.push(id);
      setFilters(newFilters);
    }
  };

  return (
    <List
      sx={{
        width: "80%",
        maxWidth: 280,
        bgcolor: "background.paper",
        marginRight: "2rem",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <h5 style={{ fontSize: "18px" }}>Filter with Categories</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "1rem",
            }}
          ></div>
        </ListSubheader>
      }
    >
      {categories.map((category, index) => (
        <>
          <ListItemButton key={index} onClick={() => handleClick(index)}>
            <ListItemIcon>
              <img
                src={category.image}
                alt={category.name}
                style={{ width: "50px" }}
              />
            </ListItemIcon>
            <ListItemText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ marginLeft: "1rem" }}>{category.name}</span>
                <span style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                  {category.items.length}
                </span>
              </div>
            </ListItemText>
            {category.isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={category.isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {category.items.map((item) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handelFilterSelection(item._id)}
                >
                  <ListItemIcon>
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      style={{ width: "50px" }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: "1rem" }}>
                        {item.productName}
                      </span>
                      {filters.includes(item._id) && (
                        <Checkbox color="success" defaultChecked />
                      )}
                    </div>
                  </ListItemText>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      ))}
      <br />
      <Button
        variant="outlined"
        startIcon={<FilterAltIcon />}
        color="success"
        size="small"
        fullWidth
        onClick={() => onFilter(filters)}
      >
        <span style={{ marginRight: "0.5rem" }}>{filters.length}</span> Filters
      </Button>
      <br />
      <br />
      <Button
        variant="outlined"
        color="error"
        size="small"
        fullWidth
        onClick={() => {
            setFilters([])
            onReset()}}
      >
        Reset
      </Button>
    </List>
  );
}
