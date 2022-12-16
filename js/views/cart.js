import {
  productQuantity,
  totalQuantity,
  subtotal,
  addButtonTriangle,
  subButtonTriangle,
  totalCart,
  btnToProducts,
  dropProduct,
  importDB,
  renderCart,
  renderTable,
  emptyCart,
  checkCart,
} from "../utils.js";
import viewProducts from "./products.js";

const { cart, products } = importDB();

const { table, shop } = renderCart(cart);

document.addEventListener("click", (e) => {
  let { cart, products } = importDB();
  renderCart(cart);
  renderTable(cart, table);

  addButtonTriangle(e.target.id, products, cart);
  subButtonTriangle(e.target.id, products, cart);

  const total = document.getElementById("total");
  total && (total.innerText = `El total a pagar es: ${totalCart(cart)}`);

  const quantity = document.getElementById("totalQuantity");
  quantity && (quantity.innerText = totalQuantity(cart));

  dropProduct(e.target.id, cart);
  checkCart(cart);
  renderTable(cart, table);
  totalCart(cart);
  emptyCart(cart);
});

btnToProducts(viewProducts, shop);

export default shop;
