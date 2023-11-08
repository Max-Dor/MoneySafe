import { convertStringNumber } from './convertStringNumber.js';
import './modules/renderFunc.js';
import './modules/reformatDate.js';


const API_URL = 'https://forest-brick-satin.glitch.me/';

const typeOperation = {
    income:'доход',
    expenses:'расход'
}

const getData = async (url)=>{
    try {
        const response = await fetch(`${API_URL}${url}`);
            if(!response.ok){
                throw new Error(`HTTP error status:${response.status}`)
            }
        return await  response.json();
    } catch(error){
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
}

const financeForm = document.querySelector('.finance__form');
const financeAmount = document.querySelector('.finance__amount');
const financeReport = document.querySelector('.finance__report');
const report = document.querySelector('.report');
const reportClose = document.querySelector('.report__close');
const reportOperationList = document.querySelector('.report__operation-list');
const reportDates = document.querySelector('.report__dates');
let amount = 0;

financeAmount .textContent = amount;

    financeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const  typeOperation = e.submitter.dataset.typeOperation;
        const chengeAmount = Math.abs(convertStringNumber(financeForm.amount.value));
        
            if(typeOperation === 'income'){
                amount += chengeAmount;
            }
            if(typeOperation === 'expenses'){
                amount -= chengeAmount;
            }
    financeAmount.textContent = `${amount.toLocaleString()} ₽`;
});

const openReport = ()=>{
    report.classList.add('report__open');
    reportClose.addEventListener('click', closeReport);
}
const closeReport = ({ target }) =>{
    if( target.closest('.report__close') ||
        (!target.closest('.report') && target !== financeReport)
    ){
        report.classList.remove('report__open');
    }
}





    financeReport.addEventListener('click', async ()=>{
        openReport();
        
        const data = await getData('api/test');
        renderReport(data);
    }
    )

    reportDates.addEventListener('submit', async (e)=>{
        e.preventDefault();

        const formData =  Object.fromEntries(new FormData(reportDates));

        const searchParams = new URLSearchParams();

        if(formData.startDate){
            searchParams.append('startDate', formData.startDate);
        }
        if(formData.endDate){
            searchParams.append('endDate', formData.endDate);
        }

        const queryString = searchParams.toString();
        const url = queryString ? `api/test?${queryString}`: 'api/test';
        const data = await getData(url);
            renderReport(data);
    })  

