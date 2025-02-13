let productsWrapper = document.getElementById("productsWrapper");
let cartItems = [];

async function fetchProducts() {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    console.log(data);
    displayProducts(data);
  } catch (error) {
    console.log(error);
    productsWrapper.innerHTML = `<h2>Something went wrong 🤪</h2>`;
  }
}
fetchProducts();

function displayProducts(allproducts) {
  allproducts.map((product) => {
    //! creating elements dynamically
    let card = document.createElement("article");
    let productImage = document.createElement("img");
    let productTitle = document.createElement("h3");
    let productPrice = document.createElement("p");
    let btn = document.createElement("button");

    productTitle.textContent = product.title;
    productPrice.textContent = `Rs.${product.price}`;
    btn.textContent = "add to cart";

    //! setting attribute dynamically
    card.setAttribute("class", "productCard");
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-duration", "3000");
    productImage.setAttribute("src", product.image);

    btn.addEventListener("click", () => {
      console.log("added to cart");

      let exisitingProduct = cartItems.find((ele) => {
        return ele.id === product.id;
      });

      if (exisitingProduct) {
        exisitingProduct.quantity += 1;
      } else {
        cartItems.push({ ...product, quantity: 1 });
      }

      console.log(cartItems);
      localStorage.setItem("cart",JSON.stringify(cartItems))
    });

    card.append(productImage, productTitle, productPrice, btn);
    productsWrapper.append(card);
  });
}
