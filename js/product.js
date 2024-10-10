/**Veriyi API' dan alan fonksiyon */

export const fetchProducts = async () => {
  try {
    /**Api' a istek at */
    const response = await fetch("db.json");
    //console.log(response);
    //Hata durumunu kontrol et
    if (!response.ok) {
      //Hata varsa hata fırlat
      throw new Error("URL not found");
    }
    // Hata yoksa veriyi return et
    return await response.json();
  } catch (error) {
    // Hata varsa hata console yazdır
    console.log(error);
  }
};
/**Bu fonksiyon, "db.json" dosyasından veri çekmeye çalışıyor.
Eğer dosya bulunamazsa veya bir hata olursa, hata yakalanıp konsola yazdırılıyor.
Eğer her şey yolunda giderse, JSON formatında gelen veriyi döndürüyor. */

/**Ürünleri render eden, ekrana basan fonksiyon */
export const renderProducts = (products, addToCallBack) => {
  //*Html' de ürünlerin listeneleceği kısımı seç
  const productList = document.querySelector("#productList");
  //* Ürünleri ekrana bas
  //console.log(products);
  /**HTML'de ki productsListin içeriğini dön */
  productList.innerHTML = products
    .map(
      (product) =>
        ` <div class="product">
          <img
            width="200"
            src="${product.image}"
            alt="product-img"
            class="product-img"
          />
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
          </div>   
        </div>
`
    )
    .join(""); //*aralarını boşluk ile ayır.

  /**Add to Cart butonlarını seç */
  const addToCartButtons = document.getElementsByClassName("add-to-cart");

  /**Her bir Add to Cart butonuna tıklanma olayı ekleniyor. */ /**Sepete ürün eklemek için */
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCallBack);
  }
};
