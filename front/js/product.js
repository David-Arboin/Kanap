const urlSearchParams = new URLSearchParams(window.location.search);
console.log(urlSearchParams);

const idProduct = urlSearchParams.get("id");
console.log(idProduct);

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then((res) => res.json())
    .then((data) => {
    productData = data //Ici, productData devient l'élément qui contient les données du produit
    console.log(productData)
    })
};

//Affichage des détails du produit
const displayPageProduct = async () => {
    await fetchProduct();

    let imgProduct = document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${productData.imageUrl}">`
    let titleProduct = document.querySelector("h1").innerText = `${productData.name}`
    let priceProduct = document.getElementById("price").innerText = `${productData.price}`
    let descriptionProduct = document.getElementById("description").innerText = `${productData.description}`

//Voir dans la console le nombre de couleur possible
    console.log(productData.colors.length)

//Boucle de création des choix de couleurs
    for (let i = 0; i < productData.colors.length; i++){
        let optionColors = document.createElement("option");
        let sectionColors = document.getElementById("colors");
        sectionColors.appendChild(optionColors);
        optionColors.innerText = `${productData.colors[i]}`
        optionColors.value = `${productData.colors[i]}`
    }
}
displayPageProduct();

//Ecoute du click sur Ajouter au panier
document.getElementById("addToCart").addEventListener("click", addToCard)

//---Déclration de la fonction de remplissage du locale storage après insertion du premier produit
function addToCard() {//addToCart

//---Récupération des données de la page produit pour les envoyers dans le panier
    newProduct = {
    _id : productData._id, 
    color : document.getElementById("colors").value, 
    quantity : document.getElementById("quantity").value,
    image : productData.imageUrl,
    alt : productData.altTxt,
    name : productData.name
}
console.log(newProduct)

//Consulter le Local Storage pour savoir s'il contient déjà des produits
    productsInCard = JSON.parse(localStorage.getItem("cart"))
    console.log(productsInCard)
    console.log(newProduct)
//---Premier produit dans le local storage

        if (productsInCard == null) {
            let productsInCard = []
            productsInCard.push(newProduct)
            JSON.stringify(localStorage.setItem("card", productsInCard))
            console.log(productsInCard)      

        }
    }