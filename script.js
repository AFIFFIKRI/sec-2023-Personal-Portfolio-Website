// header
// navbar toggle -------------------------------------------------------------

let navBar = document.querySelector(".navBar");

document.querySelector("#menu-btn").onclick = () => {
  navBar.classList.toggle("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  navBar.classList.remove("active");
  cartItem.classList.remove("active");
};

let cartItem = document.querySelector(".cart-items-container");

document.querySelector("#cart-btn").onclick = () => {
  cartItem.classList.toggle("active");
  navBar.classList.remove("active");
  searchForm.classList.remove("active");
};

window.onscroll = () => {
  navBar.classList.remove("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

// about section
// onclick function for skills, experience, education ---------------------------

var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tabLink of tabLinks) {
    tabLink.classList.remove("active-link");
  }
  for (tabContent of tabContents) {
    tabContent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// about slide carousell----------------------------------------------------------
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// menu & product section
// Cart working function  -------------------------------------------------------

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// making function

function ready() {
  // remove items from cart

  let removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);

  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // quantity changes for cart

  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // add to cart

  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  // checkout button work at cart
  document
    .getElementsByClassName("btn-checkout")[0]
    .addEventListener("click", checkoutButtonClicked);
}
//  checkout button final payment

function checkoutButtonClicked() {
  alert("Your Order is Placed");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}

// remove items from cart click

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

// quantity changes cart click

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

// add to cart click based on shop item

function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}
function addProductToCart(title, price, productImg) {
  let cartShopItem = document.createElement("div");
  cartShopItem.classList.add("cart-item");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already add this item to cart");
      return;
    }
  }

  let cartItemContent = `<img src="${productImg}" alt="" class="cart-img" />
<div class="content">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity" />
</div>
<span class="fas fa-times cart-remove"></span>`;
  cartShopItem.innerHTML = cartItemContent;
  cartItems.append(cartShopItem);
  cartShopItem
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopItem
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// update total to call at cart

function updatetotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartItem = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartItem.length; i++) {
    let newCartItem = cartItem[i];
    let priceElement = newCartItem.getElementsByClassName("cart-price")[0];
    let quantityElement =
      newCartItem.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("RM", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  // if price contain some cents value
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText =
    "RM" + total.toFixed(2);
}

// product section
// icon button activation ---------------------------------------------------------

let btnHeartList = document.querySelectorAll(".btn-heart");

btnHeartList.forEach((btnHeart) => {
  btnHeart.addEventListener("click", () => {
    btnHeart.classList.toggle("active");
  });
});

let btnEyeList = document.querySelectorAll(".btn-eye");

btnEyeList.forEach((btnEye) => {
  btnEye.addEventListener("click", () => {
    btnEye.classList.toggle("active");
  });
});
