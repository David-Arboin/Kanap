//--Utilisation de l'interface URLSearchParams qui permet de travailler avec l'URL de la page active
const urlSearchParams = new URLSearchParams(window.location.search);
console.log(urlSearchParams);

//--Récupérartion de l'id du produit
const idProduct = urlSearchParams.get("id");
console.log(idProduct);

//--Informations du panier : Quantité affichée à côté du mot panier dans le Header
let updateNumberProductInCart = () => {

let productsInCart = JSON.parse(localStorage.getItem("cart"))
console.log(productsInCart)
let numberProductInCart = 0
for (i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].color != "" && productsInCart[i].quantity > 0) {
        numberProductInCart = parseInt(numberProductInCart) + parseInt(productsInCart[i].quantity)
        console.log(numberProductInCart)
     }
}
//--Affichage du nombre de canapés dans le panier au moment de l'ouverture de la apge
let displayUpdateCart = () => {
    let sectionCart = document.getElementsByTagName("ul")[1];
    let updateInfoCart = document.createElement("p");
    console.log(updateInfoCart)
    sectionCart.appendChild(updateInfoCart);
    updateInfoCart.innerHTML = `: ${numberProductInCart} canapés`;
    }
    displayUpdateCart()
}
updateNumberProductInCart()

//--Appel des données liées au produits
const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then((res) => res.json())
    .then((data) => {
    productsInCard = data //Ici, productData devient l'élément qui contient les données du produit
    console.log(productsInCard)
    })
};

//--Affichage des détails du produit
const displayPageProduct = async () => {
    await fetchProduct();

    let imgProduct = document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${productsInCard.imageUrl}">`
    let titleProduct = document.querySelector("h1").innerText = `${productsInCard.name}`
    let priceProduct = document.getElementById("price").innerText = `${productsInCard.price}`
    let descriptionProduct = document.getElementById("description").innerText = `${productsInCard.description}`

//--Optionnel--Voir dans la console le nombre de couleur possible
    console.log(productsInCard.colors.length)

//Boucle de création des choix de couleurs
    for (let i = 0; i < productsInCard.colors.length; i++){
        let optionColors = document.createElement("option");
        let sectionColors = document.getElementById("colors");
        sectionColors.appendChild(optionColors);
        optionColors.innerText = `${productsInCard.colors[i]}`
        optionColors.value = `${productsInCard.colors[i]}`
    }
}
displayPageProduct(); //--Exécution de la fonction displayPageProduct

//Ecoute du click sur Ajouter au panier
document.getElementById("addToCart").addEventListener("click", addToCart)

//---Déclration de la fonction de remplissage du panier
function addToCart() {//addToCart

//---Récupération des données de la page produit pour les envoyers dans le panier s'il n'y est pas déjà
    let newProduct = {
    _id : productsInCard._id, 
    color : document.getElementById("colors").value, 
    quantity : document.getElementById("quantity").value,
    image : productsInCard.imageUrl,
    alt : productsInCard.altTxt,
    name : productsInCard.name,
    price : productsInCard.price
}

//--Si la couleur ou la couleur n'est pas choisie, le client est avertit
if (newProduct.color === ""){
    document.getElementById("colors").style.backgroundColor = "green"
}
if (newProduct.color != ""){
    document.getElementById("colors").style.backgroundColor = "#3B3B3B"
}
if (newProduct.quantity == 0){
    document.getElementById("quantity").style.backgroundColor = "green"
}
if (newProduct.quantity > 0){
    document.getElementById("quantity").style.backgroundColor = "#3B3B3B"
}
//--Optionnel--Permet de voir les données du produit de la page active même la quantité saisie
console.log(newProduct)

//--Récupérer le contenu du panier
    let productsInCart = JSON.parse(localStorage.getItem("cart"))
    console.log(newProduct)
    console.log(productsInCart)

//---Premier produit dans le panier s'il n'y en a pas déjà un
if (productsInCart == null) {
    productsInCart = []
    productsInCart.push(newProduct)
    console.log(productsInCart) 
    localStorage.setItem("cart", JSON.stringify(productsInCart))  
}
//--Si le panier contient un produit identique, on met sa quantité à jour
else if (productsInCart.some(product => product._id === newProduct._id && product.color === newProduct.color)){
        console.log(productsInCart.some(product => product._id === newProduct._id && product.color === newProduct.color))
        productsInCart.map(product => { 
            if (product._id === newProduct._id && product.color === newProduct.color) {
                product.quantity = newProduct.quantity
                localStorage.setItem("cart", JSON.stringify(productsInCart))  
            }
            return product
})
//--Si le produit est nouveau, on l'ajoute
}    else {
    productsInCart.push(newProduct)
    console.log(productsInCart) 
    localStorage.setItem("cart", JSON.stringify(productsInCart))  
}
//--Mise à jour des informations du panier : Quantité affichée à côté du mot panier dans le Header
let updateNumberProductInCartAfterClick = () => {

    let numberProductInCartAfterClick = 0
    for (i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].color != "" && productsInCart[i].quantity > 0) {
            numberProductInCart = parseInt(numberProductInCart) + parseInt(productsInCart[i].quantity)
            console.log(numberProductInCart)
         }
         return numberProductInCart
    }
    }
    updateNumberProductInCartAfterClick()
}
