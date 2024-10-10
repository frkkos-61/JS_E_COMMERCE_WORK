import { calculateCartTotal, getFromLocalStorage, saveToLocalStorage, updateCartIcon } from "./util.js";

let cart = getFromLocalStorage();
//*Sepete Ekleme Yapacak Fonksiyon
export function addToCart(event, products) {
  //Tıklanınan ürünün id2sine erişildi
  const productId = parseInt(event.target.dataset.id);
  /**Bu id' ye sahip başka bir ürün var mı ? */
  const product = products.find((product) => product.id === productId);
  console.log(product);
  /**Eğer ürün varsa bul */
  if (product) {
    const exitingItem = cart.find((item) => item.id === productId);
    /**Ürün sepette varsa bunu ekleme*/
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      /**Eklenecek veriyi objeye çevir.  */
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
      /**Ekleme yapılan cartın içeriğini güncelle */
      event.target.textContent = "Added";
      //Sepet Iconunu Güncelleyen fonksiyon
      updateCartIcon(cart);      
      //LocalStorage'a kayıt yapan fonksiyon
      saveToLocalStorage(cart);
       //Toplam Miktarı Hesapla
       displayCartTotal(); 
      
    }
  }
}

//*Sepetten ürünleri silecek fonksiyon
const removeFromCart = (event) => {
  //*Silenecek elemanın id' sine eriştik
  const productID = (parseInt(event.target.dataset.id));
  //Tıklanılan elemanı sepetten kaldır
  cart = cart.filter((item)=>item.id !==productID);
  //LocalStorage' ı güncelle
  saveToLocalStorage(cart);
  //Sayfayı güncelle
  renderCartItems();
  // Sepet İconunu Güncelle
  updateCartIcon(cart);
  //Toplam Miktarı Hesapla
  displayCartTotal();
}

//* Sepetteki elemanları render edecek fonksiyon

export const renderCartItems = () => {
  //Html' de elemanların render edileceği kapsayıcıya eriş
  const cartItemsElement = document.querySelector("#cartItems");
  if (!cartItemsElement) {
    console.error("Cart items container not found");
    return;
  }
  //Sepetteki her bir eleman için cart item render et
  cartItemsElement.innerHTML = cart
    .map(
      (item) =>
        `
 <div class="cart-item">
                <img 
                 src="${item.image}" alt="">
                <!--* Info Kısımı -->
                <div class="cart-item-info">
                  <h2>${item.title}</h2>
                  <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity" data-id="${item.id}">
                </div>
                <h2 class="cart-item-price">$${item.price}</h2>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
  </div>

         `
    )
    .join("");
  //Remove butonları eriş.
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  for (let i=0; i<removeButtons.length; i++) { 
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }
  const quantityInputs = document.querySelectorAll('.cart-item-quantity');
  quantityInputs.forEach(input => {
    input.addEventListener('change', (event) => {
      const id = parseInt(event.target.dataset.id);
      const newQuantity = parseInt(event.target.value);
      const item = cart.find(item => item.id === id);
      if (item) {
        item.quantity = newQuantity;
        saveToLocalStorage(cart);
        displayCartTotal();
        updateCartIcon(cart);
      }
    });
  });

  displayCartTotal();
};


export const displayCartTotal = () => {
  const cartTotalElement = document.querySelector("#cartTotal");
  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
};
