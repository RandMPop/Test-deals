//Запрос на сделки
const apiUrl = 'https://olgachfrontend.amocrm.ru/api/v4/leads';
const accessToken = localStorage.getItem('access_token').toString();
let leadsIDArray = new Array(10);
fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка запроса: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Ответ от API:', data);
        const leadNameAll = document.querySelectorAll(".lead-data-name");
        const leadBudgetAll = document.querySelectorAll(".lead-data-budget");
        const leadIDAll = document.querySelectorAll(".lead-data-id");
        for (let i = 0; i < 10; i++){
            leadsIDArray[i] = data._embedded.leads[i].id;
            leadNameAll[i].textContent += data._embedded.leads[i].name;
            leadBudgetAll[i].textContent += data._embedded.leads[i].price;
            leadIDAll[i].textContent += data._embedded.leads[i].id;
        }
        localStorage.setItem('leadsIDArray',leadsIDArray);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });               