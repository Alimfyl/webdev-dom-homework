import { loginUser, setToken, setUserName } from "./api.js"; // Добавь импорт сеттеров
import { getAndRenderComments } from "../index.js";
import { renderRegistration } from "./renderRegistration.js"; 

export const renderLogin = () => {
    const container = document.querySelector('.container');

    const loginHtml = `
    <div class="add-form">
        <h1>Форма входа</h1>
        <input type="text" id="login-input" class="add-form-name" placeholder="Введите логин" />
        <input type="password" id="password-input" class="add-form-name" placeholder="Введите пароль" />
        <div class="add-form-row">
            <button class="add-form-button" id="login-button">Войти</button>
        </div>
        <button class="link-button" id="registry-link">Зарегистрироваться</button>
    </div>`;

    container.innerHTML = loginHtml;

    
    document.getElementById("login-button").addEventListener("click", () => {
        const loginInput = document.getElementById("login-input");
        const passwordInput = document.getElementById("password-input");

        if (!loginInput.value || !passwordInput.value) {
            alert("Введите логин и пароль");
            return;
        }

        loginUser(loginInput.value, passwordInput.value)
            .then((responseData) => {
                
                setToken(responseData.user.token);
                setUserName(responseData.user.name);
                
                getAndRenderComments();
            })
            .catch((error) => {
                alert(error.message);
            });
    });


    document.getElementById("registry-link").addEventListener("click", () => {
        renderRegistration(); 
    });
};
