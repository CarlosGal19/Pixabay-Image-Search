const inputText=document.querySelector('#term');
const form=document.querySelector('#form');
const results=document.querySelector('#result');
const pagination=document.querySelector('#pagination');

const recordsPerPage=40;
let currentPage=1;

document.addEventListener('DOMContentLoaded', ()=>{

    form.addEventListener('submit', validateForm);
})

function validateForm(e){
    e.preventDefault();

    text=inputText.value;

    if (!text) {
        showAlert('Please, type what type of images you want to search')
        return
    }

    getImages();
}

function showAlert(message){

    const alertExist=form.querySelector('.alert');

    if (!alertExist) {
        const alert=document.createElement('p');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'mx-auto', 'mt-6',
        'text-center', 'max-w-lg', 'alert');
        alert.innerHTML = `
            <strong class="font-bold"> ERROR! </strong>
            <span class="block sm:inline"> ${message} </span>
        `;
        form.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
}

function getImages() {

    key='42078605-dd3871e8b026d3fb9e11d4ff2';
    url=`https://pixabay.com/api/?key=${key}&q=${inputText.value}&per_page=${recordsPerPage}&page=${currentPage}`

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            showImages(data.hits);
        })
}
