//--Récupération du panier
let productsInCart = JSON.parse(localStorage.getItem("cart"))
console.log("Produits présents dans le panier :", productsInCart)

//**************** Affichage dynamique des canapés sélectionnés
function panierDisplay () {

//--Affichage de chaque produit tour à tour
document.getElementById("cart__items").innerHTML = productsInCart.map((products) => ` 
<article class="cart__item" data-id="id" data-color="color">
    <div class="cart__item__img">
        <img src="${products.image}" alt="${products.alt}">
    </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${products.name}</h2>
            <p>${products.color}</p>
            <p>${products.price} €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${products.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>`
).join("")
}
panierDisplay();

//****************Affichage et calcul du nombre d'aricles et du prix total lors de l'ouverture de la page
let totalPriceByProduct = 0
let totalPrice = 0
let totalCopyByProduct = 0
let totalProducts = 0

function displayTotalPrice () {
    for (i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].color != "" && productsInCart[i].quantity > 0) {
            totalPriceByProduct = parseInt(productsInCart[i].price) * parseInt(productsInCart[i].quantity)
            totalPrice = totalPrice + totalPriceByProduct
            totalCopyByProduct = 1 * parseInt(productsInCart[i].quantity)
            totalProducts = totalProducts + totalCopyByProduct
         }
    }
        let displayPrice = document.getElementById("totalPrice")
        displayPrice.innerText = `${totalPrice}`
        console.log("Prix total au moment de l'ouverture de la page :", totalPrice, "€")

        let totalQuantity = document.getElementById("totalQuantity")
        totalQuantity.innerText = `${totalProducts}`
        console.log("Nombre d'articles au moment de l'ouverture de la page :", totalProducts)
    }
displayTotalPrice ()

//**************** Mise à jour du nombre d'article et du prix total lors de la saisie d'une nouvelle quantité depuis les petites flèches
const newTotalByNewQuantityByArrow = async (panierDisplay) => {
    await panierDisplay

//--Récupérartion de toutes les quantités
    let newQuantities = document.querySelectorAll(".itemQuantity")
    console.log("Liste des boutons 'quantités' :", newQuantities)

//--Ecoute du clik
    newQuantities.forEach((newQuantity) => {newQuantity.addEventListener("click",() => {

//--Récupérartion de la nouvelle quantité saisie
        let retrieveNewQuantity = newQuantity.value
        console.log("Une nouvelle quantité vient d'être saisie :", retrieveNewQuantity)

//--Si la nouvelle quantité est supérieure à 100, on la corrige à 100
        if (retrieveNewQuantity >= 100){
            document.getElementById("text-field-container").value = 100
        }

//--Récupérartion des données liées au produit
        let retrieveProductToNewQuantity = newQuantity.closest("article")

//--Récupérartion du nom du produit à supprimer
        let retrieveNameProductToNewQuantity = retrieveProductToNewQuantity.querySelector("h2").innerText
        console.log("Elle concerne le canapé :", retrieveNameProductToNewQuantity)

//--Récupérartion de la couleur du produit à supprimer
        let retrieveColorProductToNewQuantity = retrieveProductToNewQuantity.querySelector("p").innerText
        console.log("De couleur :", retrieveColorProductToNewQuantity)

//--Récupération du produit dans le panier
        let productWhithNewQuantity = () => {
                for (j = 0; j < productsInCart.length; j++) {
                    if (productsInCart[j].name == retrieveNameProductToNewQuantity && productsInCart[j].color == retrieveColorProductToNewQuantity) {
                        productsInCart[j].quantity = retrieveNewQuantity
                }
            }
//--Recalcul du prix total du panier
            }
productWhithNewQuantity()

let totalPriceByProduct = 0
let totalPrice = 0
let totalQuantityByProduct = 0
let totalQuantity = 0
let displayTotalPrice = () => {
    for (k = 0; k < productsInCart.length; k++) {
        if (productsInCart[k].color != "" && productsInCart[k].quantity > 0) {
            totalPriceByProduct = parseInt(productsInCart[k].price) * parseInt(productsInCart[k].quantity)
            totalPrice = totalPrice + totalPriceByProduct

            totalQuantityByProduct = parseInt(productsInCart[k].quantity)
            totalQuantity = totalQuantity + totalQuantityByProduct
        }
      }
//--Affichage dynamique du prix total
      let displayNewTotalPrice = document.getElementById("totalPrice")
      displayNewTotalPrice.innerText = `${totalPrice}`
      console.log("Mise à jour du prix total :", totalPrice, "€")

//--Affichage dynamique de la quantité totale d'article
      let displayNewTotalQuantity = document.getElementById("totalQuantity")
      displayNewTotalQuantity.innerText = `${totalQuantity}`
      console.log("Mise à jour du nombre total d'article dans le panier :", totalQuantity)
    }
displayTotalPrice()
    localStorage.setItem("cart", JSON.stringify(productsInCart))
                }
            )
        }
    )
}
newTotalByNewQuantityByArrow()

//**************** Suppression d'un produit
const removeProduct = async (panierDisplay) => {
    await panierDisplay

//--Récupération de tous les boutons supprimmer
    let trashs = document.querySelectorAll(".deleteItem")
    console.log("Liste des boutons 'Supprimer'", trashs)

//--Ecoute du clik sur Supprimer
    trashs.forEach((trash) => {trash.addEventListener("click",() => {
        console.log(trash)

//--Récupération des données liées au produit à supprimer
        let retrieveProductToRemove = trash.closest("article")
        console.log(retrieveProductToRemove)

//--Récupérartion du nom du produit à supprimer
        let retrieveNameProductToRemove = retrieveProductToRemove.querySelector("h2").innerText
        console.log(retrieveNameProductToRemove)

//--Récupérartion de la couleur du produit à supprimer
        let retrieveColorProductToRemove = retrieveProductToRemove.querySelector("p").innerText
        console.log(retrieveColorProductToRemove)

//--Nombre de produit dans le panier
        let totalAddProductRemove = productsInCart.length
        console.log(totalAddProductRemove)

//--Si le panier ne contient qu'un produit, on le vide
        if(totalAddProductRemove == 1){
            let confirmRemouveCard = confirm("Souhaitez-vous vider le panier ?")
            if (confirmRemouveCard) {
            localStorage.removeItem("cart"),
            window.location.href = "cart.html"}
            }
//--On conserve les produits du panier non supprimés
        else {
            newCart = productsInCart.filter(el => {
            if (retrieveNameProductToRemove != el.name || retrieveColorProductToRemove != el.color) {
                return true
                    }
                }
            )
//--Prévenir de la suppression du produit
            let confirmAction = confirm("Souhaitez-vous retirer ce produit du panier ?")
            if (confirmAction) {
                console.log(newCart)
                localStorage.setItem("cart", JSON.stringify(newCart))
                console.log("remove le produit en question")

//-- Rechargement de la page
            window.location.href = "cart.html"
                        }
                    }
                } 
            )
        }
    )
}
removeProduct()

//*****************Formulaire

//--Contrôle de la validité du prénom
function firstNameCheck() {
    const firstName = document.getElementById("firstName")
        if(/^[A-Za-z\-\ë]{3,20}$/.test(firstName.value)){
            document.getElementById("firstNameErrorMsg").innerHTML = ""//--Permet de retirer le message d'erreur
            let firstNameValidated = firstName.value
            return true
        }
        else {
            return false
                }
            }
firstNameCheck()

//--Contrôle de la validité du nom
function lastNameCheck() {
    const lastName = document.getElementById("lastName")
        if(/^[A-Za-z\-\ë]{3,20}$/.test(lastName.value)){
            document.getElementById("lastNameErrorMsg").innerHTML = ""
            return true
        }
        else {
            return false
                }
            }
lastNameCheck()
    
//--Contrôle de la validité de l'adresse
function addressCheck() {
    const address = document.getElementById("address")
        if(/./g.test(address.value)){
            document.getElementById("addressErrorMsg").innerHTML = ""
            return true
        }
        else {
            return false
                }
            } 
addressCheck()

//--Contrôle de la validité de la ville
function cityCheck() {
    const city = document.getElementById("city")
        if(/^[A-Za-z\-\ë]{3,20}$/.test(city.value)){
            document.getElementById("cityErrorMsg").innerHTML = ""
            return true
        }
        else {
            return false
                }
            }
cityCheck()

//--Contrôle de la validité du email
function emailCheck() {
    const email = document.getElementById("email")
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)){
            document.getElementById("emailErrorMsg").innerHTML = ""
            return true
        }
        else {
            return false
                }
            }
emailCheck()

//**************Conditions d'acceptation du formulaire
const formValidateAndCheck = async (panierDisplay) => {
    await panierDisplay

    let form = document.getElementsByClassName("cart__order__form")[0]
    form.addEventListener("submit", (e) => {
        e.preventDefault()

//--Si toutes les données saisies dans le formulaire sont exactes (vérifiées par les RegExps ci-dessus)
        if(firstNameCheck() && lastNameCheck() && addressCheck() && cityCheck() && emailCheck()){
            console.log("ok")
//Récupération des données saisies dans le formaulaire
let firstName = document.getElementById("firstName").value
const lastName = document.getElementById("lastName").value
const address = document.getElementById("address").value
const city = document.getElementById("city").value
const email = document.getElementById("email").value

//--Récupération des ids produits
const idProducts = JSON.parse(localStorage.getItem("cart"))
console.log("Contenu du panier :", idProducts)
let products = []
for (l = 0; l < idProducts.length; l++){
    products.push(idProducts[l]._id)
}
console.log("Ids des produits à envoyer au server :", products)

//--Création du contact
let contact = 
    {
      "firstName": firstName,
      "lastName": lastName,
      "address": address,
      "city": city,
      "email": email,
    }
console.log("Fiche du contact :", contact)

//--Envoi de la commande sur le server
const sendOrderToServer01 = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
        "Content-Type" : "application/json"
        },
    body: JSON.stringify({contact, products})
    }
)

//--Voir le résultat du server dans la console grâce à la promesse
sendOrderToServer01.then(async(response)=> {
    try{
        const contain = await response.json()
        console.log("Réponse du server", contain)

            if(response.ok){
                console.log(`Résultat de response du server : ${response.ok}`)
                
//--Récupération de l'id de la réponse du server
                console.log("id de la réponse du server :",contain.orderId)
                console.log("Réponse produit du serveur :",contain.products)

//--Redirection vers la page confirmation de la commande
                window.location.href = `confirmation.html?orderID=${contain.orderId}`
                  }
            else{
                console.log(`Réponse du server : ${response.status} `)
                alert(`Problème avec le serveru : erreur ${response.status} `)
            }
        }
//--Si la promesse n'est pas résolue, elle sera rejetée - Gestion des erreurs
     catch(e){
        console.log("ERREUR qui vient du catch()")
        console.log(e)
        alert(`ERREUR qui vient du catch() : ${e}`)
            }
        }
    )
}
//--Si un ou plusieurs données saisies dans le formulaire, on avertit l'utilisateur
        else {
            if(firstNameCheck() != true) {
                document.getElementById("firstNameErrorMsg").innerHTML = "Les chiffres et les symboles ne sont pas autorisés \n Ne pas dépasser 20 caractères, minimum 3 caractères"
            }
            if(lastNameCheck() != true) {
                document.getElementById("lastNameErrorMsg").innerHTML = "Les chiffres et les symboles ne sont pas autorisés \n Ne pas dépasser 20 caractères, minimum 3 caractères"
            }
            if(addressCheck() != true) {
            document.getElementById("addressErrorMsg").innerHTML = "Les symboles spéciaux ne sont pas autorisés"
            }
            if(cityCheck() != true) {
            document.getElementById("cityErrorMsg").innerHTML = "Les chiffres et les symboles ne sont pas autorisés \n Ne pas dépasser 20 caractères, minimum 3 caractères"
            }
            if(emailCheck() != true) {
            document.getElementById("emailErrorMsg").innerHTML = "Ceci n'est pas une adresse mail valide"
            }
        }
})
}
formValidateAndCheck()