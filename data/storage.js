import cart from "./cart.json" assert { type: "json" };
import products from "./products.json" assert { type: "json" };

if (!sessionStorage.getItem("cart")) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

localStorage.setItem("products", JSON.stringify(products));
