import { checkCart, changeView, importDB } from "./utils.js";

let { cart } = importDB();
import viewProducts from "./views/products.js";
import viewCart from "./views/cart.js";

let root = document.getElementById("root");
root.append(viewProducts);

changeView(viewProducts, viewCart);
