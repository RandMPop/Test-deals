const leadDataAll = document.querySelectorAll(".lead-data");
const leadDetailsAll = document.querySelectorAll(".lead-details");
const apiUrlArray = new Array(10);
leadsUrlID = localStorage.getItem('leadsIDArray',leadsIDArray).split(',');
for (let i = 0; i < 10; i++){
    apiUrlArray[i] = 'https://olgachfrontend.amocrm.ru/api/v4/leads/'+leadsUrlID[i];
}

function convertUnixTimestamp(timestamp) { //Преобразование Unix Timestamp в формат DD.MM.YYYY
    const date = new Date(timestamp * 1000); // Преобразуем timestamp в миллисекунды
    const day = String(date.getDate()).padStart(2, '0'); // Получаем день с ведущим нулём, если нужно
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (прибавляем 1, потому что месяцы начинаются с 0)
    const year = date.getFullYear(); // Получаем год
    return `${day}.${month}.${year}`;
}

function checkTaskStatus(deadline){ //Проверяем статус задачи по дедлайну
    const deadlineDate = new Date(deadline * 1000);
    const timeNow = new Date();
    deadlineDate.setHours(0,0,0,0);
    timeNow.setHours(0,0,0,0);
    const deadlineDateTimestamp = deadlineDate.getTime() / 1000;
    const timeNowTimestamp =timeNow.getTime() / 1000;
    if(deadlineDateTimestamp === timeNowTimestamp) {return 'green';}
    else if (deadlineDateTimestamp > timeNowTimestamp) {return 'yellow';}
    else { {return 'red';}}

}

for(let i = 0; i < 10; i++){ //Запрашиваем информацию по конкретной задаче по ID
    leadDataAll[i].addEventListener("click", () => {
        for(let j = 0; j < 10; j++){
            if (!leadDetailsAll[j].classList.contains("is-hidden")){
                leadDetailsAll[j].classList.add("is-hidden");
                leadDetailsAll[j].querySelector(".lead-details-name").textContent = '';
                leadDetailsAll[j].querySelector(".lead-details-id").textContent = '';
                leadDetailsAll[j].querySelector(".lead-details-date").textContent = '';
            }
        }
        leadDetailsAll[i].classList.remove("is-hidden");
        fetch(apiUrlArray[i], {
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
            const leadName = leadDetailsAll[i].querySelector(".lead-details-name") //Заполняем данными html элементы
            const leadID = leadDetailsAll[i].querySelector(".lead-details-id");
            const leadDate = leadDetailsAll[i].querySelector(".lead-details-date");
            const leadTaskStatus = leadDetailsAll[i].querySelector(".lead-details-status circle");
            const leadTaskDeadline = data.closest_task_at;
            leadName.textContent += 'Название: ' + data.name;
            leadID.textContent += 'ID: ' + data.id;
            leadDate.textContent += 'Дата создания: ' + convertUnixTimestamp(data.created_at);
            const statusColor = checkTaskStatus(leadTaskDeadline);
            leadTaskStatus.setAttribute('fill', statusColor);

        })
        .catch(error => {
            console.error('Ошибка:', error);
        });  
    });
}