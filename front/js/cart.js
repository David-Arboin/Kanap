//--Récupération du panier (àchaque rechargemnt de la page avec window.location.href )
let productsInCart = JSON.parse(localStorage.getItem("cart"))
console.log("Produits présents dans le panier", productsInCart)

//**************** Affichage dynamique des canapés sélectionnés
let panierDisplay = () => {

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
};

panierDisplay();

//****************Affichage et calcul du prix total lors de l'ouverture de la page
let totalPriceByProduct = 0
let totalPrice = 0
let displayTotalPrice = () => {
    for (i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].color != "" && productsInCart[i].quantity > 0) {
            totalPriceByProduct = parseInt(productsInCart[i].price) * parseInt(productsInCart[i].quantity)
            totalPrice = totalPrice + totalPriceByProduct
         }
    }
        let displayPrice = document.getElementById("totalPrice")
        displayPrice.innerText = `${totalPrice}`
        console.log("Prix total à l'ouverture de la page :", totalPrice, "€")
    }
displayTotalPrice()

//**************** Mise à jour du prix total lors de la saisie d'une nouvelle quantité depuis les petites flèches
const newTotalByNewQuantityByArrow = async (panierDisplay) => {
    await panierDisplay

//--Récupérartion de toutes les quantités
    let newQuantities = document.querySelectorAll(".itemQuantity")
    console.log("Liste des quantités sur leur 'bouton modifiable'", newQuantities)

//--Ecoute du clik
    newQuantities.forEach((newQuantity) => {newQuantity.addEventListener("click",() => {

//--Récupérartion de la nouvelle quantité
        let retrieveNewQuantity = newQuantity.value
        console.log("Une nouvelle quantité vient d'être saisie :", retrieveNewQuantity)

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
let displayTotalPrice = () => {
    for (k = 0; k < productsInCart.length; k++) {
        if (productsInCart[k].color != "" && productsInCart[k].quantity > 0) {
            totalPriceByProduct = parseInt(productsInCart[k].price) * parseInt(productsInCart[k].quantity)
            totalPrice = totalPrice + totalPriceByProduct
        }
      }
      let displayPrice = document.getElementById("totalPrice")
      displayPrice.innerText = `${totalPrice}`
      console.log("Nouveau prix total :", totalPrice, "€")
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

//--Récupérartion de tous les boutons supprimmer
    let trashs = document.querySelectorAll(".deleteItem")
    console.log("Liste des boutons 'supprimer'", trashs)

//--Ecoute du clik
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

//*****************Récupération des données client
const customerInfo = () => {
    let orderCustomer = document.getElementById("order")
    console.log(orderCustomer)
    orderCustomer.addEventListener("click", () => {
    //--Utilisation de l'interface URLSearchParams qui permet de travailler avec l'URL de la page active
    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log(urlSearchParams);

    let firstNameCustomer = urlSearchParams.get("firstName")
    let lastNameCustomer = urlSearchParams.get("lastName")
    let addressNameCustomer = urlSearchParams.get("address")
    let cityNameCustomer = urlSearchParams.get("city")
    let emailNameCustomer = urlSearchParams.get("email")

    console.log(firstNameCustomer)
    console.log(lastNameCustomer)
    console.log(addressNameCustomer)
    console.log(cityNameCustomer)
    console.log(emailNameCustomer)

    let arrayCustomerInfo = [
        {
        "firstName": firstNameCustomer,
        "lastName": lastNameCustomer,
        "adress": addressNameCustomer ,
        "city": cityNameCustomer,
        "email":  emailNameCustomer
        }]
    console.log(arrayCustomerInfo)
    localStorage.setItem("customer", JSON.stringify(arrayCustomerInfo))
    })
/*     let orderCustomerSubmit = orderCustomer.submit
    console.log(orderCustomerSubmit)
 */


}
customerInfo()
//***************** Vérification des données du formaulaire
/* const formCerification = () => {

    console.log(document.getElementsById("firstName"))

}
formCerification() */
/* form.addEventListener("submit", function(e) {


    let myRegex = /^[a-zA-Z-\s]+$/

/*     if (firstName.value == ""){
        let nameError = document.getElementById("firstNameErrorMsg")   
        nameError.innerHTML = "Ce champ est requis"
        nameError.style.color = 'red'
        e.preventDefault()
    } else if (myRegex.test(firstName.value) == false){
        let nameError = document.getElementById("firstNameErrorMsg")   
        nameError.innerHTML = "Le nom doit comporter des lettres, des irets uniquement"
        nameError.style.color = 'red'
        e.preventDefault()
    } */



        //--} */
    
//--} 