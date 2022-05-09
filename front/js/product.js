//--Utilisation de l'interface URLSearchParams qui permet de travailler avec l'URL de la page active
const urlSearchParams = new URLSearchParams(window.location.search);
console.log("Récupération de l'URL de la page :", urlSearchParams);

//--Récupérartion de l'id du produit
const idProduct = urlSearchParams.get("id");
console.log("L'id du produit est :", idProduct);

//********************Informations du panier : Quantité affichée à côté du mot panier dans le Header au moment de l'ouverture de la page
let updateNumberProductInCart = () => {

//--Récupération du panier
    let productsInCart = JSON.parse(localStorage.getItem("cart"))
    console.log("Que contient le panier ?", productsInCart)
    let numberProductInCart = 0

//--S'il est vide, on l'affiche
    if (productsInCart == null){
        let displayUpdateCart = () => {
            let sectionCart = document.getElementsByTagName("ul")[1];
            let updateInfoCart = document.createElement("p");
            console.log(updateInfoCart)
            sectionCart.appendChild(updateInfoCart);
            updateInfoCart.innerText = ": vide";
            }
            displayUpdateCart()
    }
//--S'il contient des produits, on compte leur nombre
    else {
            for (i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].color != "" && productsInCart[i].quantity > 0) {
                numberProductInCart = parseInt(numberProductInCart) + parseInt(productsInCart[i].quantity)
            }
        }
//--Et on l'affiche à côté du mot panier
        let displayUpdateCart = () => {
            let sectionCart = document.getElementsByTagName("ul")[1];
            let updateInfoCart = document.createElement("p");
            sectionCart.appendChild(updateInfoCart);
            updateInfoCart.innerHTML = `: ${numberProductInCart} canapés`;
            }
            displayUpdateCart()
        }
}
updateNumberProductInCart()

//--Appel des données liées au produits
const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then((res) => res.json())
    .then((data) => {
    productsInCard = data //Ici, productData devient l'élément qui contient les données du produit
    console.log("Données liées au produit de cette page :", productsInCard)
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
    console.log("Nombre de couleur possible pour ce canapé :",productsInCard.colors.length)

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

//*****************Ecoute du click sur Ajouter au panier
document.getElementById("addToCart").addEventListener("click", addToCart)

//--Déclration de la fonction de remplissage du panier
function addToCart() {//addToCart

//--Récupération des données de la page produit pour les envoyers dans le panier s'il n'y est pas déjà
    let newProduct = {
    _id : productsInCard._id, 
    color : document.getElementById("colors").value, 
    quantity : document.getElementById("quantity").value,
    image : productsInCard.imageUrl,
    alt : productsInCard.altTxt,
    name : productsInCard.name,
    price : productsInCard.price
    }

//--Si la couleur ou la quantité n'est pas choisie, le client est avertit
    if (newProduct.color === ""){
        document.getElementById("colors").style.backgroundColor = "green"
    }
    if (newProduct.color != ""){
        document.getElementById("colors").style.backgroundColor = "#3B3B3B"
    }
    if (newProduct.quantity == 0){
        document.getElementById("quantity").style.backgroundColor = "green"
    }
    if (newProduct.quantity >= 100){
        document.getElementById("quantity").value = 100
    }
    if (newProduct.quantity > 0){
        document.getElementById("quantity").style.backgroundColor = "#3B3B3B"
    }

//--Récupérer le contenu du panier
    let productsInCart = JSON.parse(localStorage.getItem("cart"))

//---Premier produit dans le panier s'il n'y en a pas déjà un
    if (productsInCart == null) {
        productsInCart = []
        productsInCart.push(newProduct)
        console.log(productsInCart) 
        localStorage.setItem("cart", JSON.stringify(productsInCart))

//--Affichage pendant deux seconde de l'information 'Effecué !' après mise à jour du panier
        let infoCard = document.createElement("p")
        let confirmInfoCard = document.getElementById("addToCart")
        confirmInfoCard.appendChild(infoCard).innerText = "Effectué !"
        setTimeout(function() {confirmInfoCard.removeChild(infoCard)},2000);
    }
//--Si le panier contient un produit identique, on met sa quantité à jour
    else if (productsInCart.some(product => product._id === newProduct._id && product.color === newProduct.color)){
            console.log(productsInCart.some(product => product._id === newProduct._id && product.color === newProduct.color))
            productsInCart.map(product => { 
                if (product._id === newProduct._id && product.color === newProduct.color) {
                    product.quantity = newProduct.quantity
                    localStorage.setItem("cart", JSON.stringify(productsInCart))

//--Affichage pendant deux seconde de l'information 'Effecué !' après mise à jour du panier
                    let infoCard = document.createElement("p")
                    let confirmInfoCard = document.getElementById("addToCart")
                    confirmInfoCard.appendChild(infoCard).innerText = "Effectué !"
                    setTimeout(function() {
                        confirmInfoCard.removeChild(infoCard)
                      },2000);
                }
                return product
            }
        )
    }
//--Si le produit est nouveau, on l'ajoute
        else {
        productsInCart.push(newProduct)
        localStorage.setItem("cart", JSON.stringify(productsInCart))

//--Affichage pendant deux seconde de l'information 'Effecué !' après mise à jour du panier
        let infoCard = document.createElement("p")
        let confirmInfoCard = document.getElementById("addToCart")
        confirmInfoCard.appendChild(infoCard).innerText = "Effectué !"
        setTimeout(function() {confirmInfoCard.removeChild(infoCard)},2000);
    }
//--Mise à jour des informations du panier : Quantité affichée à côté du mot panier dans le Header
    let updateNumberProductInCartAfterClick = () => {

        let productsInCart = JSON.parse(localStorage.getItem("cart"))
        console.log("Et maintenant le panier contient :", productsInCart, "références")
        let numberProductInCart = 0
        
        if (productsInCart == null){
            let displayUpdateCart = () => {
                let sectionCart = document.getElementsByTagName("ul")[1];
                let updateInfoCart = document.createElement("p");
                console.log(updateInfoCart)
                sectionCart.appendChild(updateInfoCart);
                updateInfoCart.innerText = ": vide";
                }
                displayUpdateCart()
        }
        else for (i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].color != "" && productsInCart[i].quantity > 0) {
                numberProductInCart = parseInt(numberProductInCart) + parseInt(productsInCart[i].quantity)
            }
        }
    //--Affichage du nombre de canapés dans le panier au moment de l'ouverture de la page
        let displayUpdateCart = () => {
            let updateInfoCart = document.getElementsByTagName("p")[0];
            updateInfoCart.innerText = `: ${numberProductInCart} canapés`
            }
            displayUpdateCart()
        }
    updateNumberProductInCartAfterClick()
}
