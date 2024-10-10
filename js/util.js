/**LocalStorage'a eleman kaydeden fonksiyon */
export function saveToLocalStorage(cart) {
  /**LocalStorage' a cart verisini  kaydet */
  localStorage.setItem("cart", JSON.stringify(cart));
}
/**LocalStorage'den verileri alan fonskiyon */
export const getFromLocalStorage = () => {
  /**LocalStorage' dan verileri al ve Json' a çevir. Eğer veri yoksa boş dizi dönder. */
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

//Sepetteki ürün miktarını hesapla
export const updateCartIcon = (cart) => {
  //Sepet İkonu kapsayıcısı ve  Quantity değerine eriş
  const cartIcon = document.querySelector(".cart-icon");
  const i = document.querySelector(".bxs-shopping-bag");
  //Sepette bulunan toplam ürün sayısını hesapla
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity,0);
  //Quantity Attribute'ünün değerini güncelle
  i.setAttribute("data-quantity", totalQuantity);
};

//
export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};