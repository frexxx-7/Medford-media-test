document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("editForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData();
      formData.append("fullName", document.getElementById("form-name").value);
      formData.append(
        "description",
        document.getElementById("form-description").value
      );
      formData.append(
        "active",
        document.getElementById("team_isActive_checkbox").checked ? 1 : 0
      );

      formData.append("image", selectedImage);

      const isEdit = document.getElementById("form-id").value !== "";
      isEdit &&
        formData.append("item_id", document.getElementById("form-id").value);
      const url = "/api/method/team.team";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            api_key: "c0887c474ca59c988de543c9edfecf52",
          },
          body: formData,
        });

        if (response.ok) {
          alert("Данные успешно сохранены!");
          closeEditModal();
        } else {
          const errorData = await response.json();
          alert(
            "Ошибка при сохранении данных: " +
              (errorData.message || "Неизвестная ошибка")
          );
        }
      } catch (error) {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при отправке данных.");
      }
      document.querySelector(".team_wrap").innerHTML = ""

      getAllTeam()
    });
});

let selectedImage = "";
function chooseImage(files) {
  const selectImg = document.getElementById("selectImg");
  const file = files[0];
  if (!file.type.startsWith("image/")) {
    return;
  }
  selectImg.file = file;
  const reader = new FileReader();
  reader.onload = function (e) {
    selectedImage = e.target.result;
    selectImg.src = selectedImage;
    selectImg.style.display = "block";
  };
  reader.readAsDataURL(file);
}

function changeImage() {
  const fileElem = document.getElementById("fileElem");
  if (fileElem) {
    fileElem.click();
  }
}

function closeDeleteModal() {
  document.getElementById("deleteModal").style.display = "none";

  document.getElementById("form-id").value = "";
  document.getElementById("selectImg").src = "";
  document.getElementById("selectImg").style.display = "none";
  document.getElementById("form-name").value = "";
  document.getElementById("form-description").value = "";
  document.getElementById("team_isActive_checkbox").checked = false;
}
function closeEditModal() {
  document.getElementById("editModal").style.display = "none";

  document.getElementById("form-id").value = "";
  document.getElementById("selectImg").src = "";
  document.getElementById("selectImg").style.display = "none";
  document.getElementById("form-name").value = "";
  document.getElementById("form-description").value = "";
  document.getElementById("team_isActive_checkbox").checked = false;
}
function confirmDelete() {
  const id = document.getElementById("deleteModal").dataset.id;

  fetch(`/api/method/team.team?item_id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      api_key: "c0887c474ca59c988de543c9edfecf52",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      closeDeleteModal();
      const teamItem = document.getElementById(`team_item_${id}`);
      if (teamItem) {
        teamItem.remove();
      }
    });
}
const getAllTeam = async () => {
  const team_container = document.querySelector(".team_wrap");
  let response = await fetch("/api/method/team.team", {
    headers: {
      "Content-Type": "application/json",
      api_key: "c0887c474ca59c988de543c9edfecf52",
    },
  });

  if (response.ok) {
    let json = await response.json();
    console.log(json.response);

    Object.values(json.response.all_team).forEach((item) => {
      if (+item.active === 1 || item.active === true) {
        team_container.innerHTML += `
          <div class="team_item" id="team_item_${item.id}">
            <img class="team_img" src="${item.image}" alt="">
            <div class="team_name">${item.fullName}</div>
            <p class="team_text">${item.description}</p>

            ${
              +json.response.isAdmin == 1 &&
              `<div class="delete_item" id="delete_item_team_${item.id}">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#0185FF" height="35px" width="35px" version="1.1" viewBox="0 0 315 315" enable-background="new 0 0 315 315">
                  <g>
                    <path d="m256.774,23.942h-64.836v-6.465c0-9.636-7.744-17.477-17.263-17.477h-34.348c-9.521,0-17.266,7.841-17.266,17.478v6.465h-64.835c-9.619,0-17.445,7.76-17.445,17.297v11.429c0,7.168 4.42,13.33 10.698,15.951 1.989,39.623 13.5,231.193 14.018,239.801 0.222,3.696 3.284,6.58 6.987,6.58h170.033c3.703,0 6.766-2.884 6.987-6.58 0.518-8.607 12.028-200.178 14.018-239.801 6.278-2.621 10.698-8.783 10.698-15.951v-11.43c5.68434e-14-9.537-7.826-17.297-17.446-17.297zm-119.713-6.464c0-1.918 1.465-3.478 3.266-3.478h34.348c1.8,0 3.264,1.56 3.264,3.478v6.465h-40.877v-6.465zm-82.282,23.761c0-1.818 1.546-3.297 3.445-3.297h198.549c1.899,0 3.445,1.478 3.445,3.297v11.429c0,1.819-1.546,3.299-3.445,3.299h-198.548c-1.899,0-3.445-1.479-3.445-3.299v-11.429zm181.143,259.761h-156.848c-2.055-34.247-11.479-191.674-13.51-231.033h183.867c-2.031,39.359-11.454,196.786-13.509,231.033z"/>
                    <path d="m157.5,95.125c-3.866,0-7,3.134-7,7v176.109c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-176.109c0-3.866-3.134-7-7-7z"/>
                    <path d="m110.2,102.04c-0.202-3.86-3.507-6.837-7.355-6.625-3.86,0.201-6.827,3.494-6.625,7.355l9.182,175.829c0.195,3.736 3.285,6.635 6.984,6.635 0.123,0 0.247-0.003 0.371-0.01 3.86-0.201 6.827-3.494 6.625-7.355l-9.182-175.829z"/>
                    <path d="m212.155,95.415c-3.899-0.223-7.153,2.764-7.355,6.625l-9.184,175.829c-0.202,3.861 2.765,7.154 6.625,7.355 0.125,0.007 0.248,0.01 0.371,0.01 3.698,0 6.789-2.898 6.984-6.635l9.184-175.829c0.202-3.861-2.764-7.154-6.625-7.355z"/>
                  </g>
                </svg>
              </div>
              <div class="edit_item" id="edit_item_team_${item.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" id="_24x24_On_Light_Edit" data-name="24x24/On Light/Edit">
                  <rect id="view-box" width="24" height="24" fill="none"/>
                  <path id="Shape" d="M.75,17.5A.751.751,0,0,1,0,16.75V12.569a.755.755,0,0,1,.22-.53L11.461.8a2.72,2.72,0,0,1,3.848,0L16.7,2.191a2.72,2.72,0,0,1,0,3.848L5.462,17.28a.747.747,0,0,1-.531.22ZM1.5,12.879V16h3.12l7.91-7.91L9.41,4.97ZM13.591,7.03l2.051-2.051a1.223,1.223,0,0,0,0-1.727L14.249,1.858a1.222,1.222,0,0,0-1.727,0L10.47,3.91Z" transform="translate(3.25 3.25)" fill="#0185FF"/>
                </svg>
              </div>
              `
            }
          </div>
        `;
      }
    });

    if (json.response.isAdmin == 1) {
      team_container.innerHTML += `
          <div class="team_item">
            <div class="team_item_add_container">
              <div class="team_item_add">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#0185FF" version="1.1" id="Capa_1" width="50px" height="50px" viewBox="0 0 45.402 45.402" xml:space="preserve">
                  <g>
                    <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>
      
      `;
    }

    const delete_items = document.querySelectorAll(".delete_item");

    delete_items.forEach((item) => {
      item.addEventListener("click", () => {
        document.getElementById("deleteModal").dataset.id =
          item.id.split("_")[item.id.split("_").length - 1];

        document.getElementById("deleteModal").style.display = "flex";
      });
    });

    const edit_items = document.querySelectorAll(".edit_item");

    edit_items.forEach((item) => {
      item.addEventListener("click", () => {
        document.getElementById("modal_editAdd_title").innerText =
          "Редактировать информацию";

        const itemId = item.id.split("_")[item.id.split("_").length - 1];
        document.getElementById("editModal").dataset.id = itemId;

        const teamItem = document
          .querySelector(`#delete_item_team_${itemId}`)
          .closest(".team_item");
        const imageSrc = teamItem.querySelector(".team_img").src;
        const name = teamItem.querySelector(".team_name").textContent;
        const description = teamItem.querySelector(".team_text").textContent;

        document.getElementById("form-id").value = itemId;
        document.getElementById("selectImg").src = imageSrc;
        document.getElementById("selectImg").style.display = "block";
        document.getElementById("form-name").value = name;
        document.getElementById("form-description").value = description;
        document.getElementById("team_isActive_checkbox").checked = true;

        document.getElementById("editModal").style.display = "flex";
      });
    });

    const team_add_button = document.querySelector(".team_item_add");

    team_add_button.addEventListener("click", () => {
      document.getElementById("modal_editAdd_title").innerText =
        "Добавить человека в команду";
      document.getElementById("editModal").style.display = "flex";
    });
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  getAllTeam();

  //const team_items = document.querySelectorAll(".team_item");
  //team_items.forEach((element) => {
  //  element.addEventListener("mouseover");
  //});
});

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".nav_list");
  const burgermenu = document.querySelector(".burger-menu");

  if (burgermenu && list) {
    burgermenu.addEventListener("click", (e) => {
      e.preventDefault();
      burgermenu.classList.toggle("active");
      document.body.classList.toggle("hidden");
      list.classList.toggle("active");
    });
  }

  const initSwiper = (selector, config) => {
    if (document.querySelector(selector)) {
      return new Swiper(selector, config);
    }
  };

  initSwiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      844: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1150: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  initSwiper(".swiper_about", {
    slidesPerView: 1,
    spaceBetween: 27,
    loop: true,
    pagination: {
      el: ".swiper_about-pagination",
    },
    navigation: {
      nextEl: ".swiper_about-button-next",
      prevEl: ".swiper_about-button-prev",
    },
    slideToClickedSlide: true,
    centeredSlides: true,
  });

  initSwiper(".swiper-important", {
    slidesPerView: 1,
    spaceBetween: 50,
    slidesPerGroup: 1,
    navigation: {
      nextEl: ".swiper-important-button-next",
      prevEl: ".swiper-important-button-prev",
    },
    breakpoints: {
      1125: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
    },
  });

  const btnForm = document.querySelectorAll("#btn-request-phone");
  const modal = document.querySelector(".modall");
  const btnClose = document.querySelectorAll(".btn_close");
  const modalBackground = document.querySelector(".modal_backgtound");
  const btnMenu = document.querySelector(".btn-menu");

  const toggleModal = (openButton, modalElement) => {
    openButton.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        modalBackground.classList.add("active");
        modalElement.classList.add("active");
        document.body.classList.add("hidden");
      });
    });

    btnClose.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        modalElement.classList.remove("active");
        document.body.classList.remove("hidden");
        modalBackground.classList.remove("active");
      });
    });

    modalBackground.addEventListener("click", () => {
      modalElement.classList.remove("active");
      document.body.classList.remove("hidden");
      modalBackground.classList.remove("active");
    });
  };

  if (btnForm.length && modal) {
    toggleModal(btnForm, modal);
  }

  if (btnMenu) {
    btnMenu.addEventListener("click", (e) => {
      e.preventDefault();
      list.classList.remove("active");
      document.body.classList.remove("hidden");
    });
  }
  const modalBack = document.querySelector(".modal-wrap-back");
  const modalFirst = document.querySelector(".modal-wrap-first");

  const validateForm = (formElement, inputs, errorElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      let messages = [];

      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          messages.push(`введите ${input.getAttribute("placeholder")} `);
        }
      });

      if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(", \n");
      } else if (messages.length == 0) {
        modalFirst.classList.add("active");
        modalBack.classList.add("active");
      }
    });
  };

  const formData = document.querySelector("#form-data");
  if (formData) {
    validateForm(
      formData,
      [
        document.querySelector("#form-name"),
        document.querySelector("#form-phone"),
        document.querySelector("#form-email"),
      ],
      document.querySelector(".form-input-error")
    );
  }

  const formPrice = document.querySelector("#form-price");
  if (formPrice) {
    validateForm(
      formPrice,
      [
        document.querySelector("#form-price-name"),
        document.querySelector("#form-price-phone"),
        document.querySelector("#form-price-email"),
      ],
      document.querySelector(".form-price-input-error")
    );
  }

  const scrollElement = (links) => {
    links.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute("href").substring(1);
        const scrollTarget = document.getElementById(targetId);

        if (scrollTarget) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const position =
            scrollTarget.getBoundingClientRect().top - headerHeight;

          window.scrollBy({ top: position, behavior: "smooth" });

          list.classList.remove("active");
          document.body.classList.remove("hidden");
        }
      });
    });
  };

  scrollElement(document.querySelectorAll(".nav_link"));
  scrollElement(document.querySelectorAll(".footer_link"));

  const welcome = document.querySelector(".welcome");
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    const headerHeight = header ? header.scrollHeight : 0;
    if (window.scrollY > headerHeight - 10) {
      header.classList.add("header_fixed");
    } else {
      header.classList.remove("header_fixed");
    }
  });

  document.querySelectorAll("#logo").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  const priceForm = document.querySelector(".price_item-form");
  const priceClose = document.querySelector("#price_close");

  priceClose.addEventListener("click", () => {
    priceForm.style.display = "none";
  });
});
