import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});

  const handleAddToWishlist = (p) => {
    const updatedWishlist = [...wishlist];
    const existingProduct = updatedWishlist.find((item) => item._id === p._id);
    if (existingProduct) {
      existingProduct.numberOfItems += 1;
    } else {
      updatedWishlist.push({
        _id: p._id,
        name: p.name,
        author: p.author.name,
        price: p.price,
        numberOfItems: 1,
      });
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Book added to wishlist");
  };

  const updateProductQuantities = async () => {
    try {
      await Promise.all(
        cart.map(async (item) => {
          const quantityToBuy = item.numberOfItems;
          await axios.put("/api/v1/book/updateStock", {
            slug: item.slug,
            quantityToBuy,
          });
        })
      );
      console.log("Product quantities updated successfully");
    } catch (error) {
      console.error("Error updating product quantities:", error);
    }
  };

  useEffect(() => {
    const fetchProductQuantities = async () => {
      try {
        const bookIds = cart.map((item) => item._id);
        const response = await axios.post("/api/v1/book/getQuantities", {
          bookIds,
        });
        const quantities = response.data.quantities;
        setProductQuantities(quantities);
      } catch (error) {
        console.error("Error fetching product quantities:", error);
      }
    };

    fetchProductQuantities();
  }, [cart]);

  return (
    <div>
      <h1>Cart Page</h1>
      {/* Render cart and wishlist items here */}
    </div>
  );
}

export default CartPage;
