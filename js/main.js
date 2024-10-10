/**Bağlantı Kontrolü */
//* console.log("SEA");

import { addToCart, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";

//! HTML' DEN ELEMAN ÇEKME
const menuIcon = document.querySelector("#menu-icon");
//console.log(menuIcon);

const menu = document.querySelector(".navbar");
//console.log(menu);

/**Menu iconuna tıklayınca Menu kısmına class ekleyip çıkar */
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});
/**Sayfa yüklendiğinde çalışacak fonksiyon */
document.addEventListener("DOMContentLoaded", async () => {
  //console.log(window);
  /**Biz tarayıcıda ana sayfada mıyız cart sayfasında mıyız ? */
  if (window.location.pathname.includes("cart.html")) {
    //console.log(`Cart Sayfası`);
    renderCartItems();
  } else {
    const product = await fetchProducts();
    //console.log(product);
    /**Buradaki arrow function addToCartCallBack fonskiyonu oluyor. */
    renderProducts(product, (event) => addToCart(event, product));
  }
});
