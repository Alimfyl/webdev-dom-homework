import { login, setToken, setUserName } from "./api.js";
import { getAndRenderComments } from "../main.js";

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

    const loginButton = document.getElementById("login-button");
    const loginInput = document.getElementById("login-input");
    const passwordInput = document.getElementById("password-input");

    loginButton.addEventListener("click", () => {
        // Простейшая валидация
        if (!loginInput.value || !passwordInput.value) {
            alert("Введите логин и пароль");
            return;
        }

        login(loginInput.value, passwordInput.value)
            .then((res) => {
                // Если API вернуло ошибку, выбрасываем её в catch
                if (res.status === 400) throw new Error("Неверный логин или пароль");
                return res.json();
            })
            .then((data) => {
                // Сохраняем данные пользователя в модуле api.js
                setToken(data.user.token);
                setUserName(data.user.name);
                
                // Перенаправляем на страницу комментариев (просто вызываем их загрузку и рендер)
                getAndRenderComments();
            })
            .catch((error) => {
                alert(error.message);
            });
    });
};
