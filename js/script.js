



// CATEGORIE FUNCTION
const displayCategorie = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";
    
    categories.forEach(categorie => {
        const categorieList = document.createElement("div")

        categorieList.innerHTML = `
            <p onClick="loadCard(${categorie.id}); removeHidden()" class="text-xs p-2 font-semibold hover:bg-[#15803D] hover:text-white hover:rounded-sm">${categorie.category_name}</p>
        `
        categoriesContainer.append(categorieList)
    });
}
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((response) => response.json())
        .then((data) => displayCategorie(data.categories))
}
loadCategories()


// CATEGORYS OF CARD FUNCTION
const displayCard = (datas) => {
    const cardContainer = document.getElementById("trees-card-container");
    cardContainer.innerHTML = "";

    datas.forEach((data) => {
        // console.log(data);
        
        const cardDiv = document.createElement("div")

        cardDiv.innerHTML = `
            <div class="bg-white p-4 rounded-xl space-y-2">
                <img src="${data.image}" alt="" class="w-full h-[200px] object-cover rounded-xl bg-slate-300">
                <h1 class="text-lg font-bold">${data.name}</h1>
                <p class="text-xs">${data.description}...</p>
                <div class="flex justify-between items-center">
                    <button class="p-1 px-3 text-xs text-[#15803D] bg-[#DCFCE7] rounded-3xl">${data.category}</button>
                    <p class="text-sm font-bold">৳${data.price}</p>
                </div>
                <button class="p-1 bg-[#15803D] text-sm text-white rounded-3xl w-full">Add to Cart</button>
            </div>
        `
        cardContainer.append(cardDiv)
    })
}

const loadCard = (id) => {
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then((response) => response.json())
        .then((datas) => displayCard(datas.plants))
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
                <h1 class="text-lg font-bold">${data.name}</h1>
                <p class="text-xs">${data.description}...</p>
                <div class="flex justify-between items-center">
                    <button class="p-1 px-3 text-xs text-[#15803D] bg-[#DCFCE7] rounded-3xl">${data.category}</button>
                    <p class="text-sm font-bold">৳${data.price}</p>
                </div>
                <button class="p-1 bg-[#15803D] text-sm text-white rounded-3xl w-full">Add to Cart</button>
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


// TOGGLING ON ALL ALL-PLANCTS AND CATEGORY PLANT
const removeHidden = () => {
    const clickCategorie = document.getElementById("trees-card-container");
    const addHidden = document.getElementById("all-trees-card-container")
    clickCategorie.classList.remove("hidden")
    addHidden.classList.add("hidden")

}