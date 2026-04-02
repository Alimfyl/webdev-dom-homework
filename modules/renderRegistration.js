import { registration, setToken, setUserName } from "./api.js"
import { getAndRenderComments } from "../index.js";
import { renderLogin } from "./renderLogin.js"; 

export const renderRegistration = () => {
    const container = document.querySelector('.container');

    const regHtml = `
    <div class="add-form">
        <h1>Регистрация</h1>
        <input type="text" id="name-input" class="add-form-name" placeholder="Введите имя" />
        <input type="text" id="login-input" class="add-form-name" placeholder="Введите логин" />
        <input type="password" id="password-input" class="add-form-name" placeholder="Введите пароль" />
        <div class="add-form-row">
            <button class="add-form-button" id="register-button">Зарегистрироваться</button>
        </div>
        <button class="link-button" id="login-link">Войти</button>
    </div>`;

    container.innerHTML = regHtml;

    const registerButton = document.getElementById("register-button");
    const loginLink = document.getElementById("login-link");

    
    registerButton.addEventListener("click", () => {
        const nameInput = document.getElementById("name-input");
        const loginInput = document.getElementById("login-input");
        const passwordInput = document.getElementById("password-input");

        if (!nameInput.value || !loginInput.value || !passwordInput.value) {
            alert("Заполните все поля");
            return;
        }

        registration(nameInput.value, loginInput.value, passwordInput.value)
            .then((responseData) => {
                
                setToken(responseData.user.token);
                setUserName(responseData.user.name);
                
                getAndRenderComments();
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    
    loginLink.addEventListener("click", () => {
        renderLogin();
    });
};
