const loadPhone = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = '';
    // display 20 phone only 
    phones = phones.slice(0,10);

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
                        </div>
                    </div>
        `
        phonesContainer.appendChild(phoneDiv);
    });
}

document.getElementById('btn-search').addEventListener('click', function(){
    toggleSpinner(true);
    const inputValue = document.getElementById('search-filed');
    const searchText = inputValue.value;
    loadPhone(searchText)
})

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');   
    }
}
loadPhone();