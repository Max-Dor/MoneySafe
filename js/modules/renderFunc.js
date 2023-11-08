import './reformatDate';

export const renderReport = (data)=>{
    reportOperationList.textContent = '';

    const reportPows = data.map(
        ({category,amount,description,date,type}) => {
        
        const reportRow = document.createElement("tr");
            reportRow.classList.add("report__row");
        reportRow.innerHTML = `
            <td class="report__cell">${ category}</td>
            <td class="report__cell" style = 'text-align: right'>${ amount.toLocaleString()}&nbsp₽</td>
            <td class="report__cell">${ description}</td>
            <td class="report__cell">${reformatDate(date)}</td>
            <td class="report__cell">${ typeOperation[type]}</td>
            <td class="report__action-cell">
                <button class="report__button report__button_table">&#10006;</button>
            </td>
        `;
        return reportRow;
    });
        reportOperationList.append( ... reportPows);
}
