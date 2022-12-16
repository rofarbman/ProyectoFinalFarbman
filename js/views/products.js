import {
  addToCart,
  // btnAddToCartDisabled,
  checkCart,
  importDB,
  renderCart,
  totalQuantity,
} from "../utils.js";

const { products, cart } = importDB();

const quantity = document.getElementById("totalQuantity");
quantity && (quantity.innerText = totalQuantity(cart));

const card = document.createElement("div");
card.id = "card";
card.classList =
  "m-4 row-cols-1 row-cols-md-3 g-4 flex-wrap d-flex flex-row justify-content-evenly";

products.forEach((item) => {
  card.innerHTML += `<div class="card col-xl-4 m-3 rounded-4" style=" width: 18rem;">
      <h4 class="card-title text-center m-2">${item.name}</h4>
      <img src="${item.thumbnail}" class="card-img-top" alt="${item.name}">
      <div class="card-body">
        <p class="card-text text-center">${item.description}
        </p>
      </div>
      <button type="button" id="btn-${item.id}" class="m-3 rounded btn btn--mina">Agregar al carrito</button>
    </div>`;
  return card;
});

const viewProducts = document.createElement("section");
viewProducts.classList = "d-flex my-4 flex-column justify-content-evenly";
viewProducts.id = "products";
viewProducts.innerHTML = `<h1 id="h1" class="text-center">NUESTROS PRODUCTOS</h1>`;

const cardsContainer = document.createElement("div");
cardsContainer.classList =
  "container m-4 g-4 d-flex flex-column flex-wrap justify-content-evenly";

cardsContainer.append(card);
viewProducts.append(cardsContainer);

document.addEventListener("click", (e) => {
  let { cart } = importDB();
  addToCart(e.target.id, products, cart);
  // renderCart(cart);
  // if (e.target.id == "home") {
  //   checkCart(cart);
  // }
});

export default viewProducts;
