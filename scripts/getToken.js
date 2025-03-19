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
            code: "def50200207a47b19e9ecb3e3aa2b5f3b1b4cdc8cf8fcfe1577fe2609619e41315892bb8cf3eff91a5465190759e95b86d5dc39297f5b6bb24601177d8cba69af6377b4546ba2f646850977257deafb8a138e08018712a0b391027585ac109b2f3bcd8e6e81221f254ca3104e4cb237ed639f7cda83f5ad18661fd0e4317197bfcf74d5a863a680598a04289f6659eb2a2279d2858650186f29cdd25812aa60757360f0d091ee77e8b295df669833bb7e39e921c4b1fa05d03efed5639492377c114c29b501b9e29d0c657eaf5c70cb3f4a3c70f2f2ff9662b66328d2805eeb89a9f1cb7d89ba2529c034f32d03fb56bb4fbb65b042dbeee1b519f5c78f37ea592839089eeb14d42f6811749f8570a1fd6b3de6215c0bc11dcd6205f6327b217e5019ada4bb6732d25438c5cb9cf1185bdc4f70d27e6d4a7e61baf90accc742abddda8c8618c2ca24e98d21c53a0fa35e9861a0069a39154aeedde0c7598dd7343b0b81828d49ce4cc80dd4d4c7a5fdb53b6c6820ca095c578cf79eb29d71cf11a05185f0190502bbc38cec76b173599de5b2962d78c4b07713ca95da407d65c9da1d31646b19a2bbe321ac50bebb6c2f63949ef915c2fe4db3a6796d778dcff08ad2f2325f3618d4558903b0a44e21c2f38f97a280ec97a893c194c022ec3d6ac5dc832c1fb6a8271e3db496973d6c2252adfb6b776e23cf5",
            redirect_uri: "https://randmpop.github.io/Test-deals/"
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log('Успешно:', data);
        localStorage.setItem('access_token',data.access_token);
    })
    .catch(error => console.error('Ошибка:', error));
