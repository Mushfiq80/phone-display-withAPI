const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = '';
    // display 10 phone only
    const showAll = document.getElementById('showAll');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none')
    }
    

    // display all phones
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none');
    } 
    // display no phone found
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
                    <div class="card">
                        <img src="${phone.image}" class="card-img-top p-4">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <a onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</a>

            
                        </div>
                    </div>
        `
        phonesContainer.appendChild(phoneDiv);
    });
    // Loading done end spinner here
    toggleSpinner(false)
}

function processSearch(dataLimit){
    toggleSpinner(true);
    const inputValue = document.getElementById('search-filed');
    const searchText = inputValue.value;
    loadPhone(searchText, dataLimit);
}

// handle search button clicked
document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
})

// Enter key event on search
document.getElementById('search-filed').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});



const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');   
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


// not best way to 
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch(); 
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone =>{
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-detail');
    phoneDetails.innerHTML = `
        <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <p> Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth'}</p>
        <p> Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage info found'}</p>
    `
}

loadPhone('apple');