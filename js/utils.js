function totalQuantity(array = []) {
  return array.length != 0 ? array.length : "";
}

function addToCart(id, productsArray = [], cartArray = []) {
  if (id.includes("btn-2022")) {
    let productId = id.slice(4, 12);
    let index = productsArray.findIndex((item) => productId == item.id);
    cartArray.push(productsArray[index]);
    sessionStorage.setItem("cart", JSON.stringify(cartArray));
  }
  checkQuantity(cartArray);
}

function checkCart(cartArray = [], productsArray = []) {
  cartArray
    .map((item) => item.id)
    .forEach((item) => {
      let button = document.getElementById(`btn-${item}`);
      if (button) {
        button.setAttribute("disabled", "disabled");
        button.innerText = "AGREGADO AL CARRITO";
      }
    });
}

function checkQuantity(array) {
  const quantity = document.getElementById("totalQuantity");
  quantity.innerText = totalQuantity(array);
}

function productQuantity(product, array = []) {
  let quantity = 0;
  array.forEach((item) => {
    if (item.id == product.id) {
      return (quantity += 1);
    }
  });
  return quantity;
}

function subtotal(product = [], array = []) {
  let total = 0;
  array.forEach((item) => {
    if (item.id == product.id) {
      total += item.price;
    }
  });
  return total;
}

function addButtonTriangle(id, productsArray = [], cartArray = []) {
  if (id.includes("add-2022")) {
    let itemIdInCart = id.slice(4, 12);
    let quantity = document.getElementById(`q-${itemIdInCart}`);
    quantity.value = Number(quantity.value) + 1;
    let indexProducts = productsArray.findIndex((item) => {
      return itemIdInCart == item.id;
    });
    let indexCart = cartArray.findIndex((item) => {
      return itemIdInCart == item.id;
    });
    cartArray.push(productsArray[indexProducts]);
    sessionStorage.setItem("cart", JSON.stringify(cartArray));
    let subtotalId = document.getElementById(`subtotal-${itemIdInCart}`);
    subtotalId.innerHTML = `<span id="subtotal-${itemIdInCart}">${subtotal(
      cartArray[indexCart],
      cartArray
    )}</span>`;
  }
}

function subButtonTriangle(id, productsArray = [], cartArray = []) {
  if (id.includes("sub-2022")) {
    let itemIdInCart = id.slice(4, 12);
    let quantity = document.getElementById(`q-${itemIdInCart}`);
    quantity.value = Number(quantity.value) - 1;
    let indexProducts = productsArray.findIndex((item) => {
      return itemIdInCart == item.id;
    });
    let indexCart = cartArray.findIndex((item) => {
      return itemIdInCart == item.id;
    });
    cartArray.shift(productsArray[indexProducts]);
    sessionStorage.setItem("cart", JSON.stringify(cartArray));
    if (quantity.value < 1) {
      let dropTableRow = document.getElementById(`tr-${itemIdInCart}`);
      tbody.removeChild(dropTableRow);
      let indexCart = cartArray.findIndex((item) => {
        return id.id == item.id;
      });
    }
    let subtotalId = document.getElementById(`subtotal-${itemIdInCart}`);
    subtotalId.innerHTML = `<span id="subtotal-${itemIdInCart}">${subtotal(
      cartArray[indexCart],
      cartArray
    )}</span>`;
  }
}

function totalCart(array) {
  let number = array.reduce((total, value) => {
    return total + value.price;
  }, 0);
  return number;
}

function changeView(products, cart) {
  document.addEventListener("click", (e) => {
    let view = document.getElementById("products");

    if (view) {
      e.target.id == "basket" ? root.replaceChild(cart, products) : undefined;
    }
    if (!view) {
      e.target.id == "home" ? root.replaceChild(products, cart) : undefined;
    }
  });
}

function btnToProducts(productsArray = [], cartArray = []) {
  document.addEventListener("click", (e) => {
    e.target.id == "btnToProducts"
      ? root.replaceChild(productsArray, cartArray)
      : undefined;
  });
}
function dropProduct(product, cartArray) {
  if (product.includes("drop-2022")) {
    let newCart = cartArray.filter((item) => item.id != product.slice(5, 13));
    return sessionStorage.setItem("cart", JSON.stringify(newCart));
  }
}

function toZero(product, cartArray = []) {
  if (productQuantity(product, (cartArray = [])) > 1) {
    cartArray.splice(product[index], 1);
    return sessionStorage.setItem("cart", JSON.stringify(cartArray));
  }
}

function importDB() {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  let products = JSON.parse(localStorage.getItem("products"));
  return { cart, products };
}

function renderCart(cartArray = []) {
  const shop = document.createElement("section");
  shop.id = "shop";
  shop.classList =
    "shop container-fluid mb-5 d-flex flex-column align-items-center justify-content-center text-center";

  let table = document.createElement("table");

  let cartLength = cartArray.length;

  if (shop) {
    if (cartLength < 1) {
      shop.innerHTML = `<h2>TU CARRITO ESTA VACIO</h2>
    <button id="btnToProducts" type="button" class="btn btn--mina">Volver a la tienda</button>`;
    } else {
      shop.innerHTML = "<h1>CARRITO</h1>";
      shop.classList =
        "vh-auto container d-flex flex-column align-items-center justify-content-evenly m-4";
      table.id = "table";
      table.classList = "table table-striped";
      table.innerHTML = `<thead id="thead">
    <tr class="text-center">
      <th scope="col">PRODUCTO</th>
      <th scope="col">PRECIO</th>
      <th scope="col">CANTIDAD</th>
      <th scope="col">SUBTOTAL</th>
    </tr>
    </thead><tbody id="tbody"></tbody>`;

      shop.append(table);
      let total = document.createElement("section");
      total.innerHTML = `<h1>TOTAL</h1>
    <h2 id="total">El total a pagar es: ${totalCart(cartArray)}</h2>`;
      total.classList = "m-4";
      shop.append(total);
    }
  }
  return { table, shop };
}

function renderTable(cartArray = [], element = "") {
  let tbody = document.createElement("tbody");

  let cartUniqueProduct = [
    ...cartArray
      .reduce((products, item) => products.set(item.id, item), new Map())
      .values(),
  ];

  cartUniqueProduct.forEach((item) => {
    return (tbody.innerHTML += `<tr id="tr-${item.id}" class="align-middle">
        <td class="text-start"><button id="drop-${
          item.id
        }" type="button" class="btn btn--mina ms-2">&times;</button><img src="${
      item.thumbnail
    }" alt="${
      item.name
    }" height="150px" class="rounded-3 ms-4"><span class="mx-3">${
      item.name
    }</span></td>
        <td class="text-center"><span>$${item.price}</span></td>
        <td class="text-center"><button id="sub-${
          item.id
        }" class="btn btn--mina mx-2">&bigtriangledown;</button><input id="q-${
      item.id
    }" class="inputQuantity" type="text" value="${productQuantity(
      item,
      cartArray
    )}"><button id="add-${
      item.id
    }" class="btn btn--mina mx-2">&bigtriangleup;</button></td>
        <td class="text-center">
          <span id="subtotal-${item.id}">${subtotal(item, cartArray)}</span>
        </td>
      </tr>`);
  });
  if (element) {
    element.innerHTML = tbody.outerHTML;
  }
  return element;
}

function emptyCart(cartArray = []) {
  if (cartArray.length < 1) {
    let shop = document.getElementById("shop");
    if (shop) {
      shop.innerHTML = `<h2>TU CARRITO ESTA VACIO</h2>
    <button id="btnToProducts" type="button" class="btn btn--mina">Volver a la tienda</button>`;
    }
  }
}

export {
  totalQuantity,
  addToCart,
  checkCart,
  checkQuantity,
  productQuantity,
  subtotal,
  addButtonTriangle,
  subButtonTriangle,
  totalCart,
  changeView,
  btnToProducts,
  dropProduct,
  toZero,
  importDB,
  renderCart,
  renderTable,
  emptyCart,
};
