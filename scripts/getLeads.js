//Запрос на сделки
const limit =3;
const apiUrl = 'https://olgachfrontend.amocrm.ru/api/v4/leads?limit=' + limit;
const accessToken = localStorage.getItem('access_token').toString();
let leadsIDArray = [];
const leadNameAll = document.querySelectorAll(".lead-data-name");
const leadBudgetAll = document.querySelectorAll(".lead-data-budget");
const leadIDAll = document.querySelectorAll(".lead-data-id");
let leadIndex = 0;


function fillElements (i,data){
    console.log("leadIndex",leadIndex);
    leadNameAll[i].textContent += data.name;
    leadBudgetAll[i].textContent += data.price;
    leadIDAll[i].textContent += data.id;
    leadIndex ++;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPage (url) { //Запрос данных по заданному URL
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })
    if (!response.ok) {
        throw new Error(`Ошибка запроса данных: ${response.status}`);
    }
    let data = await response.json();
    return data;
}

async function fetchAllPages() {
    let currentPage = await fetchPage(apiUrl);
    await sleep(1000);
    currentPage._embedded.leads.forEach(lead => {
        leadsIDArray.push(lead.id);
        fillElements(leadIndex,lead);
    });
    while (currentPage._links.next){
        currentPage = await fetchPage(currentPage._links.next.href);
        await sleep(1000);
        currentPage._embedded.leads.forEach(lead => {
            leadsIDArray.push(lead.id);
            fillElements(leadIndex,lead);
        }); 
    }
    localStorage.setItem('leadsIDArray',leadsIDArray);   
}



fetchAllPages();





//Запрос на сделки
// const apiUrl = 'https://olgachfrontend.amocrm.ru/api/v4/leads';
// const accessToken = localStorage.getItem('access_token').toString();
// let leadsIDArray = new Array(10);

// fetch(apiUrl, {
//     method: 'GET',
//     headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//     }
// })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Ошибка запроса: ' + response.statusText);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Ответ от API:', data);
//         const leadNameAll = document.querySelectorAll(".lead-data-name");
//         const leadBudgetAll = document.querySelectorAll(".lead-data-budget");
//         const leadIDAll = document.querySelectorAll(".lead-data-id");
//         for (let i = 0; i < 10; i++){
//             leadsIDArray[i] = data._embedded.leads[i].id;
//             leadNameAll[i].textContent += data._embedded.leads[i].name;
//             leadBudgetAll[i].textContent += data._embedded.leads[i].price;
//             leadIDAll[i].textContent += data._embedded.leads[i].id;
//         }
//         localStorage.setItem('leadsIDArray',leadsIDArray);
//     })
//     .catch(error => {
//         console.error('Ошибка:', error);
//     }); 



// const apiUrl = 'https://olgachfrontend.amocrm.ru/api/v4/leads?limit=3';
// const accessToken = localStorage.getItem('access_token').toString();
// let leadsIDArray = new Array(10);

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function fetchPage(url) {
//     const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             }
//     })
//     if (!response.ok) {
//         throw new Error(`Ошибка HTTP: ${response.status}`);
//     }
//     const data = await response.json();
//     return data
    
// }

// async function fetchArray() {
//     response = await fetchPage(apiUrl);
//     await sleep(1000);
//     let returnArray = [];
//     response._embedded.leads.forEach(lead => {
//         returnArray.push(lead.id);
//     });
//     while (response._links.next) {
//         response = await fetchPage(response._links.next.href);
//         await sleep(1000);
//         response._embedded.leads.forEach(lead => {
//             returnArray.push(lead.id);
//         });
//     }
//     return returnArray;
    
// }

// fetchArray().then(result => {
//     leadsIDArray = result;
//     console.log(leadsIDArray);
// });
