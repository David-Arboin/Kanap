//--Utilisation de l'interface URLSearchParams qui permet de travailler avec l'URL de la page active
const urlSearchParams = new URLSearchParams(window.location.search)
console.log("Récupération de l'URL de la page :", urlSearchParams)

//--Récupération de l'id du produit
const idProduct = urlSearchParams.get("id");
console.log("L'id du produit est :", idProduct);

//********************Informations du panier : Quantité affichée à côté du mot panier dans le Header au moment de l'ouverture de la page
const updateNumberProductInCart = () => {

//--Récupération du panier
    let productsInCart = JSON.parse(localStorage.getItem("cart"))
    console.log("Que contient le panier ?", productsInCart)
    let numberProductInCart = 0

//--S'il est vide, on l'affiche
    if (productsInCart == null){
        let displayUpdateCart = () => {
            let sectionCart = document.getElementsByTagName("ul")[1];
            let updateInfoCart = document.createElement("p");
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

//********************Appel des données liées au produits de la page actuelle
//--Méthode 1
  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${idProduct}`)
    const dataProduct = await res.json()
    console.log("Données liées au produit de cette page :", dataProduct)
    return dataProduct
    }

//--Méthode 2
/*    const fetchProduct = () => {
        return fetch(`http://localhost:3000/api/products/${idProduct}`)//  Requête fetch GET pour récupérer les données d'un canapé dans l'api selon son id
        .then(res => {//  Réponse de l'api, contient le status ainsi que d'autre informations. Les données ne sont pas lisibles à ce stade
        return res.json()// On parse le body afin qu'il soit lisible par notre code
        }
     )
} */

//--Affichage des détails du produit
const displayPageProduct = async () => {
    dataProduct = await fetchProduct()

    let imgProduct = document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${dataProduct.imageUrl}">`
    let titleProduct = document.querySelector("h1").innerText = `${dataProduct.name}`
    let priceProduct = document.getElementById("price").innerText = `${dataProduct.price}`
    let descriptionProduct = document.getElementById("description").innerText = `${dataProduct.description}`

//--Optionnel--Voir dans la console le nombre de couleur possible
    console.log("Nombre de couleur possible pour ce canapé :",dataProduct.colors.length)

//Boucle de création des choix de couleurs
    for (let i = 0; i < dataProduct.colors.length; i++){
        let optionColors = document.createElement("option");
        let sectionColors = document.getElementById("colors");
        sectionColors.appendChild(optionColors);
        optionColors.innerText = `${dataProduct.colors[i]}`
        optionColors.value = `${dataProduct.colors[i]}`
    }
}

//--Initialisation de la quantité à 1 sur le bouton 'Nombre d'article(s) (1-100)' au moment de l'ouverture de la page sinon 0 est par défaut
document.getElementById("quantity").value = 1

//--Déclaration des constantes d'alertes si aucune couleur et/ou quantité n'a été saisie
let alertColor = document.createElement("p")
let displayAlertColor = document.getElementsByClassName("item__content__settings__color")[0]
let alertQuantity = document.createElement("p")
let displayAlertQuantity = document.getElementsByClassName("item__content__settings__quantity")[0]

//*****************Ecoute du click sur Ajouter au panier
document.getElementById("addToCart").addEventListener("click", addToCart)

//--Déclration de la fonction de remplissage du panier
function addToCart() {//addToCart

//--Récupération des données de la page produit pour les envoyers dans le panier s'il n'y est pas déjà
    let newProduct = {
    _id : dataProduct._id, 
    color : document.getElementById("colors").value, 
    quantity : document.getElementById("quantity").value,
    image : dataProduct.imageUrl,
    alt : dataProduct.altTxt,
    name : dataProduct.name,
    price : dataProduct.price
    }

//--Si la couleur ou la quantité n'est pas choisie, le client est avertit
    function alertsColor () {

        if (newProduct.color === ""){
            document.getElementById("colors").style.backgroundColor = "red"
            displayAlertColor.appendChild(alertColor).innerHTML = "X Veuillez sélectionner une couleur X"
            alertColor.style.color = "red"
            alertColor.style.backgroundColor = "black"
            alertColor.style.borderRadius = "20px"
            alertColor.style.padding = "2px 6px 2px 6px"
            alertColor.style.textAlign = "center"

        }
        else if (newProduct.color != "" && displayAlertColor.getElementsByTagName("p").length != 0) {
            document.getElementById("colors").style.backgroundColor = "#3B3B3B"
            displayAlertColor.removeChild(alertColor)
        }
    }

    function alertsQuantity () {

        if (newProduct.quantity == 0){
            document.getElementById("quantity").style.backgroundColor = "red"
            displayAlertQuantity.appendChild(alertQuantity).innerHTML = "X Veuillez sélectionner une quantité X"
            alertQuantity.style.color = "red"
            alertQuantity.style.backgroundColor = "black"
            alertQuantity.style.borderRadius = "20px"
            alertQuantity.style.padding = "2px 6px 2px 6px"
            alertQuantity.style.textAlign = "center"
        }
        else if (newProduct.quantity > 0 && displayAlertQuantity.getElementsByTagName("p").length != 0) {
            document.getElementById("quantity").style.backgroundColor = "#3B3B3B"
            displayAlertQuantity.removeChild(alertQuantity)
        }
    }
    alertsColor()
    alertsQuantity()

//--Si la quantité saisie est supérieure à 100, elle est automatiquement ramenée à 100
    if (newProduct.quantity > 100){
        document.getElementById("quantity").value = 100
        newProduct.quantity = 100
    }

//--Si la quantité saisie est négative, elle est automatiquement normée
    if (newProduct.quantity < 0){
        document.getElementById("quantity").value = Math.sqrt(newProduct.quantity * newProduct.quantity)
        newProduct.quantity = Math.sqrt(newProduct.quantity * newProduct.quantity)
    }

//--Récupérer le contenu du panier
    let productsInCart = JSON.parse(localStorage.getItem("cart"))

//---Premier produit dans le panier s'il n'y en a pas déjà un
    if (productsInCart == null && newProduct.color != "" && newProduct.quantity > 0) {
        productsInCart = []
        productsInCart.push(newProduct)
        localStorage.setItem("cart", JSON.stringify(productsInCart))

//--Affichage pendant deux seconde de l'information 'Effecué !' après mise à jour du panier
        let infoCard = document.createElement("p")
        let confirmInfoCard = document.getElementById("addToCart")
        confirmInfoCard.appendChild(infoCard).innerText = "Effectué !"
        setTimeout(function() {confirmInfoCard.removeChild(infoCard)},1000)
    }

//--Si le panier contient un produit identique (même id et même couleur)
//--Et qu'une couleur et une quantité ont été sélectionnées sur la page courante
//--On ajoute sa quantité à celle du panier
    else if ((productsInCart.some(product => product._id === newProduct._id && product.color === newProduct.color) && newProduct.color != "")){

            console.log("Ce canapé est déjà dans le panier, sa quantité vient d'être mise à jour")
            productsInCart.map(product => {
                if (product._id === newProduct._id && product.color === newProduct.color) {
                    product.quantity = parseInt(newProduct.quantity) + parseInt(product.quantity)
                    localStorage.setItem("cart", JSON.stringify(productsInCart))

//--Affichage pendant deux seconde de l'information 'Effecué !' après mise à jour du panier
                    let infoCard = document.createElement("p")
                    let confirmInfoCard = document.getElementById("addToCart")
                    confirmInfoCard.appendChild(infoCard).innerText = "Effectué !"
                    setTimeout(function() {confirmInfoCard.removeChild(infoCard)},1000)
                }
                return product
            }
        )
    }
//--Si le produit est nouveau, on l'ajoute
        else {
            if (newProduct.color != "" && newProduct.quantity > 0){
                productsInCart = [...productsInCart, newProduct]
                localStorage.setItem("cart", JSON.stringify(productsInCart))
        
        //--Affichage pendant deux seconde de l'information 'Effecué !' après mise à jour du panier
                let infoCard = document.createElement("p")
                let confirmInfoCard = document.getElementById("addToCart")
                confirmInfoCard.appendChild(infoCard).innerText = "Effectué !"
                setTimeout(function() {confirmInfoCard.removeChild(infoCard)},1000)
            }
    }
    
//--Mise à jour des informations du panier : Quantité affichée à côté du mot panier dans le Header
    const updateNumberProductInCartAfterClick = () => {

        let productsInCart = JSON.parse(localStorage.getItem("cart"))
        let numberProductInCart = 0
        
        if (productsInCart == null){
            let displayUpdateCart = () => {
                let sectionCart = document.getElementsByTagName("ul")[1]
                let updateInfoCart = document.createElement("p")
                console.log(updateInfoCart)
                sectionCart.appendChild(updateInfoCart)
                updateInfoCart.innerText = ": vide"
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
            let updateInfoCart = document.getElementsByTagName("p")[0]
            updateInfoCart.innerText = `: ${numberProductInCart} canapés`
            console.log("Maintenant, le panier contient :" ,numberProductInCart, "canapés")
            }
            displayUpdateCart()
        }
        updateNumberProductInCartAfterClick()
}
updateNumberProductInCart()
displayPageProduct()
