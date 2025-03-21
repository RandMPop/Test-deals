//Запрос на сделки
const limit =3; //Лимит на загрузку сделок
const apiUrl = 'https://olgachfrontend.amocrm.ru/api/v4/leads?limit=' + limit;
const accessToken = localStorage.getItem('access_token').toString();
let leadsIDArray = [];
const leadNameAll = document.querySelectorAll(".lead-data-name");
const leadBudgetAll = document.querySelectorAll(".lead-data-budget");
const leadIDAll = document.querySelectorAll(".lead-data-id");
let leadIndex = 0;


function fillElements (i,data){
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

async function fetchAllPages() { //Запрос по 1 странице данных, т.е. по 3 сделки
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