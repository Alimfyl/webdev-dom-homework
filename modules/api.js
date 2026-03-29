// ... начало файла без изменений

export const loginUser = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        // УДАЛИЛИ headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password })
    }).then((res) => {
        if (res.status === 400) throw new Error("Неверный логин или пароль");
        return res.json();
    }).then((data) => {
        setToken(data.user.token);
        setUserName(data.user.name);
        return data;
    });
};

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        // УДАЛИЛИ headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            login: login,
            name: name,      
            password: password 
        })
    }).then((res) => {
        if (res.status === 400) {
            throw new Error("Пользователь уже существует или данные слишком короткие");
        }
        if (!res.ok) {
            throw new Error("Ошибка сервера");
        }
        return res.json();
    }).then((data) => {
        setToken(data.user.token);
        setUserName(data.user.name);
        return data;
    });
};
