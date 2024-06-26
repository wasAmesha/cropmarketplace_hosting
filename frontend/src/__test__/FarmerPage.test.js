import React from "react";
import { render, screen } from "@testing-library/react";
import FarmerPage from "../FarmerPage/FarmerPage";
import { BrowserRouter } from "react-router-dom";

describe("FarmerPage Component", () => {
  test("renders FarmerPage component", () => {
    render(
      <BrowserRouter>
        <FarmerPage />
      </BrowserRouter>
    );

    const sellerOrdersText = screen.getByText(/Seller's Orders/i);
    expect(sellerOrdersText).toBeInTheDocument();

    const farmerOrdersText = screen.getByText(/Farmer's Orders/i);
    expect(farmerOrdersText).toBeInTheDocument();

    const deliveryServicesText = screen.getByText(/Delivery Services/i);
    expect(deliveryServicesText).toBeInTheDocument();
  });

  test("displays product information correctly", () => {
    const mockData = [
      {
        productImage: "image1.jpg",
        item: "Product 1",
        quantity: 5,
        price: 100,
        postedDate: "2022-05-20",
        expireDate: "2022-06-20",
      },
    ];

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    render(
      <BrowserRouter>
        <FarmerPage />
      </BrowserRouter>
    );

    return screen.findAllByTestId("order-item").then((orderItems) => {
      expect(orderItems.length).toEqual(mockData.length);

      // Check if each order item displays the correct information
      orderItems.forEach((item, index) => {
        const {
          productImage,
          item: itemName,
          quantity,
          price,
          postedDate,
          expireDate,
        } = mockData[index];

        // eslint-disable-next-line testing-library/no-node-access
        const imageElement = item.querySelector(".order-image");
        expect(imageElement).toHaveAttribute("src", productImage);
        expect(imageElement).toHaveAttribute("alt", itemName);

        expect(item).toHaveTextContent(itemName);
        expect(item).toHaveTextContent(`Quantity: ${quantity}`);
        expect(item).toHaveTextContent(`Price: Rs.${price}`);
        expect(item).toHaveTextContent(`Posted Date: ${postedDate}`);
        expect(item).toHaveTextContent(`Expires Date: ${expireDate}`);
      });
    });
  });
});
