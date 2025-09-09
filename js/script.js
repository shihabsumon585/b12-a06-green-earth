// CATEGORIE FUNCTION
const displayCategorie = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";
    
    categories.forEach(categorie => {
        const categorieList = document.createElement("div")

        categorieList.innerHTML = `
            <p id="category-${categorie.id}" 
               onClick="handleCategoryClick(${categorie.id})" 
               class="text-xs p-2 font-semibold hover:bg-[#15803D] hover:text-white hover:rounded-sm btn-category">
               ${categorie.category_name}
            </p>
        `
        categoriesContainer.append(categorieList)
    });
}

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((response) => response.json())
        .then((data) => {
            displayCategorie(data.categories)
        })
}
loadCategories()


// ACTIVE BUTTON STATE
const removeActive = () => {
    const btnCategoryRemove = document.querySelectorAll(".btn-category");
    btnCategoryRemove.forEach((btn) => btn.classList.remove("active"))
}

const handleCategoryClick = (id) => {
    removeActive();
    document.getElementById(`category-${id}`).classList.add("active");
    loadCard(id);
    removeHidden();
}


// CHALLENGE PARTS
let cart = [];
let totalPrice = 0;
const cartContainer = document.getElementById("your-cart-container");


// CATEGORYS OF CARD FUNCTION
const displayCard = (datas) => {
    const cardContainer = document.getElementById("trees-card-container");
    cardContainer.innerHTML = "";

    datas.forEach((data) => {
        const cardDiv = document.createElement("div")

        cardDiv.innerHTML = `
            <div class="bg-white p-4 rounded-xl space-y-2">
                <img src="${data.image}" alt="" class="w-full h-[200px] object-cover rounded-xl bg-slate-300">
                <h1 onclick="loadModals(${data.id})" class="text-lg font-bold">${data.name}</h1>
                <p class="text-xs">${data.description}...</p>
                <div class="flex justify-between items-center">
                    <button class="p-1 px-3 text-xs text-[#15803D] bg-[#DCFCE7] rounded-3xl">${data.category}</button>
                    <p class="text-sm font-bold">৳${data.price}</p>
                </div>
                <button onclick="addToCart(${data.id}, '${data.name}', ${data.price})" class="p-1 bg-[#15803D] text-sm text-white rounded-3xl w-full">Add to Cart</button>
            </div>
        `
        cardContainer.append(cardDiv)
    })
    manageSpinner(false)
}

const loadCard = (id) => {
    manageSpinner(true)
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then((response) => response.json())
        .then((datas) => displayCard(datas.plants))
}


function addToCart(id, name, price) {
    const item = { id, name, price };
    cart.push(item);
    totalPrice += price;
    renderCart();
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("flex", "justify-between", "items-center", "p-3", "mx-3", "rounded-lg", "bg-[#F0FDF4]");

        div.innerHTML = `
            <div>
                <h1 class="font-semibold">${item.name}</h1>
                <p>৳${item.price}</p>
            </div>
            <div>
                <i onclick="removeFromCart(${index})" class="fa-solid fa-xmark cursor-pointer"></i>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("p-3");
    totalDiv.innerHTML = `Total Price: ৳${totalPrice}`;
    cartContainer.appendChild(totalDiv);
}


// ALL CARD FUNCTION
const displayAllCard = (datas) => {
    const allCardContainer = document.getElementById("all-trees-card-container");
    allCardContainer.innerHTML = "";

    datas.forEach((data) => {
        const allCardDiv = document.createElement("div")

        allCardDiv.innerHTML = `
            <div class="bg-white p-4 rounded-xl space-y-2">
                <img src="${data.image}" alt="" class="w-full h-[200px] object-cover rounded-xl bg-slate-300">
                <h1 onclick="loadModals(${data.id})" class="text-lg font-bold">${data.name}</h1>
                <p class="text-xs">${data.description}...</p>
                <div class="flex justify-between items-center">
                    <button class="p-1 px-3 text-xs text-[#15803D] bg-[#DCFCE7] rounded-3xl">${data.category}</button>
                    <p class="text-sm font-bold">৳${data.price}</p>
                </div>
                
                <button onclick="addToCart(${data.id}, '${data.name}', ${data.price})" class="p-1 bg-[#15803D] text-sm text-white rounded-3xl w-full">Add to Cart</button>

            </div>
        `
        allCardContainer.append(allCardDiv)
    })
}

const loadAllCard = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((response) => response.json())
        .then((datas) => displayAllCard(datas.plants))
}
loadAllCard()



// TOGGLING ON ALL-PLANTS AND CATEGORY PLANT
const removeHidden = () => {
    const clickCategorie = document.getElementById("trees-card-container");
    const addHidden = document.getElementById("all-trees-card-container")
    clickCategorie.classList.remove("hidden")
    addHidden.classList.add("hidden")
}



// SHOW MODAL FUNCTION
const displayModals = (data) => {
    const modalContainer = document.getElementById("modal-container")
    modalContainer.innerHTML = `
        <div class="space-y-4">
            <h1 class="text-4xl font-bold">${data.name}</h1>
            <img src="${data.image}" alt="" class="w-full h-[200px] object-cover rounded-xl bg-slate-300">
            <p class="text-xs font-bold">Category: <span class="font-normal">${data.category}</span></p>
            <p class="text-xs font-bold">Price: <span class="font-normal">${data.price}</span></p>
            <p class="text-xs font-bold">Description: <span class="font-normal">${data.description}</span></p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    `
    document.getElementById("my_modal_5").showModal()
}

const loadModals = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const response = await fetch(url)
    const details = await response.json();
    displayModals(details.plants)
}



// MANAGE SPINNER
const manageSpinner = (status) => {
    if(status) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("trees-card-container").classList.add("hidden");
    } else {
        document.getElementById("trees-card-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}
