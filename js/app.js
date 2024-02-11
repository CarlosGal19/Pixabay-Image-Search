const inputText=document.querySelector('#term');
const form=document.querySelector('#form');
const results=document.querySelector('#result');
const pagination=document.querySelector('#pagination');

const recordsPerPage=40;
let totalPages;
let iterator;
let currentPage=1;

document.addEventListener('DOMContentLoaded', ()=>{

    form.addEventListener('submit', validateForm);
})

// It validated is the form was filled
function validateForm(e){
    e.preventDefault();

    text=inputText.value;

    if (!text) {
        showAlert('Please, type what type of images you want to search')
        return
    }

    getImages();
}

// It shows an alert if the form is not filled
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

// Function that consults the pixabay API
function getImages() {

    key='42078605-dd3871e8b026d3fb9e11d4ff2';
    url=`https://pixabay.com/api/?key=${key}&q=${inputText.value}&per_page=${recordsPerPage}&page=${currentPage}`

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // It calculates the number of pages that the paginator will show, based on the number of total hits
            totalPages= calculatePages(data.totalHits);
            showImages(data.hits);
        })
}

function showImages(images) {

    cleanHTML(results);

    images.forEach(element => {
        const {previewURL, tags, likes, views, largeImageURL} = element;

        results.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img src="${previewURL}" class="w-full" alt="${tags.toUpperCase()}">
                    <div class="p-4">
                        <p class="font-bold"> ${likes} <span class="font-light"> likes </span> </p>
                        <p class="font-bold"> ${views} <span class="font-light"> views </span> </p>
                        <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer"
                        class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"> Show HD image </a>
                    </div>
                </div>
            </div>
        `;
    });

    printPaginator();

}

function calculatePages(total) {
    return parseInt(Math.ceil(total/recordsPerPage));
}

// Generator of pages of paginator
function *generatorPages(totalPages){
    for (let i = 1; i <= totalPages; i++) {
        yield i;
    }
}

// Paginator is created and shown in DOM
function printPaginator(){

    cleanHTML(pagination);

    iterator=generatorPages(totalPages);

    while (true) {
        const {value, done} = iterator.next();
        // If the iterator has finished, the generation stops
        if (done) return;

        const button = document.createElement('a');
        button.href='#';
        button.dataset=value;
        button.textContent=value;
        button.classList.add('next', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');

        button.onclick=()=>{
            currentPage=value;
            getImages();
        }

        pagination.appendChild(button);
    }

}

function cleanHTML(spaceToClean){
    while(spaceToClean.firstChild){
        spaceToClean.removeChild(spaceToClean.firstChild);
    }
}
