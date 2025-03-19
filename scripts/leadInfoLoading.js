const lead1Data = document.querySelector(".lead1-data");
const lead1Details = document.querySelector(".lead1-details");
const apiUrlLead1 = 'https://cors-anywhere.herokuapp.com/https://olgachfrontend.amocrm.ru/api/v4/leads/3783807'

function convertUnixTimestamp(timestamp) { //Преобразование Unix Timestamp в формат DD.MM.YYYY
    const date = new Date(timestamp * 1000); // Преобразуем timestamp в миллисекунды
    const day = String(date.getDate()).padStart(2, '0'); // Получаем день с ведущим нулём, если нужно
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (прибавляем 1, потому что месяцы начинаются с 0)
    const year = date.getFullYear(); // Получаем год
  
    return `${day}.${month}.${year}`;
}

function checkTaskStatus(deadline){ //Проверяем статус задачи по дедлайну
    const deadlineDate = new Date(deadline * 1000);
    // console.log(deadlineDate);
    const timeNow = new Date();
    // console.log(timeNow);
    if (deadlineDate.toDateString() === timeNow.toDateString()){return 'green'};
    if (deadlineDate.toDateString() > timeNow.toDateString()) {return 'yellow'};
    if (deadlineDate.toDateString() < timeNow.toDateString()) {return 'red'};
}

lead1Data.addEventListener("click", () => {
    lead1Details.classList.remove("is-hidden");
    fetch(apiUrlLead1, {
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
            const leadName = document.querySelector(".lead1-details .lead-details-name")
            const leadID = document.querySelector(".lead1-details .lead-details-id");
            const leadDate = document.querySelector(".lead1-details .lead-details-date");
            const leadTaskStatus = document.querySelector(".lead1-details .lead-details-status circle");
            const leadTaskDeadline = data.closest_task_at;
            leadName.textContent += data.name;
            leadID.textContent += data.id;
            leadDate.textContent += convertUnixTimestamp(data.created_at);
            const statusColor = checkTaskStatus(leadTaskDeadline);
            leadTaskStatus.setAttribute('fill', statusColor);

        })
        .catch(error => {
            console.error('Ошибка:', error);
        });   
});