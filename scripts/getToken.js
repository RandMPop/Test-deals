//Запрос на токен
fetch('https://olgachfrontend.amocrm.ru/oauth2/access_token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://olgachfrontend.amocrm.ru',},
        body: JSON.stringify({
            client_id: "36580453-1c14-4459-898e-0c7c339039eb",
            client_secret: "iH4Sqdyl5hT3MwK6uxH03ikQ1qMJbPP7M7yilGlozVo1it0T17Fw2VFAunZTkzyw",
            grant_type: "authorization_code",
            code: "", //Сюда в кавычки необходимо вставить код авторизации
            redirect_uri: "https://randmpop.github.io/Test-deals/"
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log('Успешно:', data);
        localStorage.setItem('access_token',data.access_token);
    })
    .catch(error => console.error('Ошибка:', error));
