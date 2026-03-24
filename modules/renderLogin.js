export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form">
    <h1>Форма входа</h1>
    <input
    type="text"
    class="add-form-name"
    placeholder="Введите логин"
    id="login"
    requeired
    />
    <input
    type="text"
    class="add-form-name"
    placeholder="Введите пароль"
    id="password"
    requeired
    ></input>
    <fieldset class="add-form-registry"
    <button class=add-form-button-ain button-main type="submit">
    Войти</button>
    <u class="add-form-button-link registry" >
    Зарегистрироваться
    </u>
    </fieldset>
    </section>
    `

    container.innerHTML = loginHtml
}