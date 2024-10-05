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
        console.log("sdf");
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
    console.log("sdf");
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
