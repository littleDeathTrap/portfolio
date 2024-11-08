let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

//scroll sections
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
  });

  //sticky header
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  //remove  toggle icon and navbar when click navbar links(scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// ---------------------------------------
// document
//   .getElementById("contactForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const formData = {
//       fullName: this.fullName.value.trim(),
//       email: this.email.value.trim(),
//       mobile: this.mobile.value.trim(),
//       subject: this.subject.value.trim(),
//       message: this.message.value.trim(),
//     };

//     const errorMessageElement = document.getElementById("error-message");

//     // Сбрасываем сообщение об ошибке
//     errorMessageElement.style.display = "none";
//     errorMessageElement.textContent = "";

//     // Валидация данных
//     let hasError = false;

//     // Проверка на пустые поля
//     for (const key in formData) {
//       if (!formData[key]) {
//         errorMessageElement.textContent =
//           "Все поля обязательны для заполнения!";
//         hasError = true;
//         break; // Выходим из цикла при первой найденной ошибке
//       }
//     }

//     // Проверка на корректность email
//     if (!hasError && !validateEmail(formData.email)) {
//       errorMessageElement.textContent =
//         "Введите корректный адрес электронной почты!";
//       hasError = true;
//     }

//     // Проверка на корректность номера телефона (пример с 10 цифрами)
//     if (
//       !hasError &&
//       (formData.mobile.length !== 10 || isNaN(formData.mobile))
//     ) {
//       errorMessageElement.textContent =
//         "Введите корректный номер телефона (10 цифр)!";
//       hasError = true;
//     }

//     // Если есть ошибка, показываем сообщение и выходим
//     if (hasError) {
//       errorMessageElement.style.display = "block"; // Показываем сообщение об ошибке
//       return;
//     }

//     console.log("Повне імʼя:", fullName);
//     console.log("Email:", email);
//     console.log("Телефон:", mobile);
//     console.log("Тема:", subject);
//     console.log("Повідомлення:", message);
//   });
// // Функция для валидации email
// function validateEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// }

//--------------------------------

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const gmail = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br>
      Email: ${gmail.value}<br>
    Phone Number: ${phone.value}<br>
    Message: ${mess.value}`;

  Email.send({
    SecureToken: "cd2996a3-b7dc-480f-bdee-c984b00365aa",
    To: "littleedeathtrap@gmail.com",
    From: "littleedeathtrap@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");
  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }
    if (items[1].value != "") {
      checkEmail();
    }
    if (items[2].value != "") {
      checkPhone();
    }
    // if (items[3].value != "") {
    //   checkName();
    // }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });
    items[2].addEventListener("keyup", () => {
      checkPhone();
    });
    // items[3].addEventListener("keyup", () => {
    //   checkName();
    // });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }

  checkName();
}
// Function to validate full name
function checkName() {
  const nameRegex = /^[A-Za-z\s'-]{2,}$/;
  const errorTxtName = document.querySelector(".error-txt.name");

  // Check if fullName matches the regex pattern
  if (!fullName.value.match(nameRegex)) {
    fullName.classList.add("error");
    fullName.parentElement.classList.add("error");

    if (fullName.value !== "") {
      errorTxtName.innerText = "Enter a valid name";
    } else {
      errorTxtName.innerText = "Name can't be blank";
    }
  } else {
    fullName.classList.remove("error");
    fullName.parentElement.classList.remove("error");
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

  const errorTxtEmail = document.querySelector(".error-txt.email");
  if (!gmail.value.match(emailRegex)) {
    gmail.classList.add("error");
    gmail.parentElement.classList.add("error");

    if (gmail.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address";
    } else {
      errorTxtEmail.innerText = "Email address can't be blank";
    }
  } else {
    gmail.classList.remove("error");
    gmail.parentElement.classList.remove("error");
  }
}

function checkPhone() {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  const errorTxtPhone = document.querySelector(".error-txt.phone");

  if (!phone.value.match(phoneRegex)) {
    phone.classList.add("error");
    phone.parentElement.classList.add("error");
    errorTxtPhone.innerText =
      phone.value != ""
        ? "Enter a valid phone number"
        : "Phone number can't be blank";
  } else {
    phone.classList.remove("error");
    phone.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !gmail.classList.contains("error") &&
    !phone.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !mess.classList.contains("error")
  ) {
    sendEmail();

    form.reset();
    return false;
  }
});
/*--------------------- dark mode-------------*/
let darkModeIcon = document.querySelector("#darkMode-icon");

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");
};
