import { buttonsData, menu } from "./db.js";
import { elements } from "./helpers.js";

//* Fonksiyonlar
const searchCategory = (e) => {
  //!Tıkladığımız butonun data özelliklerine eriştik ve bir değişkene aktardık.
  const category = e.target.dataset.category;

  //! Tüm dizi elemanlarından  yalnızca categorı değeri butonun kategori değeri ile eşleşirse bu ürünleri getir.
  const filtredMenu = menu.filter((item) => item.category === category);

  if (category === "all") {
    renderMenuItems(menu);
  } else {
    renderMenuItems(filtredMenu);
  }

  renderButtons(category);
};
//! Ekrana menu elemanlarını aktaracak fonksiyondur.
const renderMenuItems = (menuItems) => {
  //! Gönderilen verileri dönup her bir veri için bir a etiketi oluştur.
  let menuHTML = menuItems.map(
    (item) =>
      `
          <a
         id="card"
         href="/productDetail.html?id=${item.id}&category=${item.category}&price=${item.price}"
         class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
      >
        <img class="raunded shadow" src="${item.img}" alt="" />
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <h5>${item.title}</h5>
            <p class="text-success">${item.price}₺</p>
          </div>
          <p class="lead">
            ${item.desc}
          </p>
        </div>
      </a>
          
    `
  );
  menuHTML = menuHTML.join("");
  //! Oluşturduğumuz menuHTML değişkenini ekrana aktardık.
  elements.menuArea.innerHTML = menuHTML;
};

const renderButtons = (active) => {
  elements.buttonsArea.innerHTML = "";
  console.log(active);

  //! Yeni butonlar oluşturmak için buttonsData içeriainseki verileri dönüp her bir veri için bir button oluştururuz.
  buttonsData.forEach((btn) => {
    //! Her bir veri için bir HTML buton etiketi oluştur.
    const buttonEle = document.createElement("button");
    //! Oluşturduğumuz butonlara class ekledik.
    buttonEle.className = "btn btn-outline-dark filter-btn";
    //! Oluşturduğumuz butonun içeriğini değiştirme
    buttonEle.textContent = btn.text;
    //! oluşturduğumuz butonun hangi kategoride olduğu bilgisini button elementine ekledik.
    buttonEle.dataset.category = btn.value;

    //!Eger ki active kategorisiyle buton eşleşirse ona farklı class ekle.
    if (btn.value === active) {
      buttonEle.classList.add("bg-dark", "text-light");
    }

    //! HTML e gönderme
    elements.buttonsArea.appendChild(buttonEle);
  });
};

//* Olay izleyicileri
//! Sayfa yüklendiği anda renderMenuItems fonksiyonunu çalıştır ve menu parametresini gönder.render Buttonsfonksiyonunu çalıştırır ve seçili olarak hepsi kategorisini parametre olarak gönder.
document.addEventListener("DOMContentLoaded", () => {
  renderButtons("all");
  renderMenuItems(menu);
});

//!Butonların bulunduğu alana tıklanıldığında searchCategory fonksiyonunu çalıştır.
elements.buttonsArea.addEventListener("click", searchCategory);
