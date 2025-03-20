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
            code: "def50200a23c7bc6632305637c496dceb4f98582c66c6091708e07ae00094a701ce093f4e4a36de99f627aa06edec5317f001cb332b773d645997476478fb274308d2cf54014a452123732cc0acafb6ff07e33a816a6c5d6698add7d66329f149b7b794e90c21a592db32a6f6cc6645fa6fbd0118e171d45fe86c0d81aa3c60571397a73015f4f1c0cc312b51c514d0b342e541eae7432aec76f85bed5aafe2867b3f08116a228069efe7d4662c0a2df02d95fea7da93bc5a6c0ee87a9926235bf47a2af5ab27d8871f05ccef66fc008fba27c8ec68459bafa79e826af5072740427b986115ac785d9b3bbc8d44dd5f03f70713ce3acebf452b600733c946ba96a9a88484d7e548866801a5469508c459061581c033fd43477e4bb5233aaa4eaa511395a84ed2decf4ada940a7d406fdbbafa664ee081d67e86d467b4bab631f61e6b4dd072627dcddfeb703ab1bee44ef8c427af528f03be5b0740830b19e1a7e2240d5a12d5accf24d51b9328a1dde5f61948989caa8565b046298d8b31781a7fbe26ae609305ab2be211788ef5742aea3f3a09643b48c94f6e2ecce023ef422c5ab3127ab99a0c46527fd2d35cf72943467f2cef462c30dae1f6d40f7d0ded3f784c96971d66bf1df2d8bc48446e00b93a50b76d327b5f3122b35e804f7769e53d3ade857bcacb6e5886e42635b577424dcb5d153a06252",
            redirect_uri: "https://randmpop.github.io/Test-deals/"
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log('Успешно:', data);
        localStorage.setItem('access_token',data.access_token);
    })
    .catch(error => console.error('Ошибка:', error));
