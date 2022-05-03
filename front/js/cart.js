//--Récupère le panier
let productsInCart = JSON.parse(localStorage.getItem("cart"))
console.log(productsInCart[1])


//--Affichage dynamique des canapés sélectionnés
let panierDisplay = () => {

//--Affiche les produits
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

//--Prix total lors de l'ouverture de la page panier
let totalPrice = 0
let displayTotalPrice = () => {
    for (i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].color != "" && productsInCart[i].quantity > 0) {
            totalPrice = parseInt(productsInCart[i].price) * parseInt(productsInCart[i].quantity)
            console.log(totalPrice)
         }
         displayPrice = document.getElementById("totalPrice")
         displayPrice.innerText = `${totalPrice}`
         console.log(displayPrice)
    }
    }
displayTotalPrice()

//--Mise à jour du prix total lors de la saisie d'une nouvelle quantité depuis les petites flèches

/* let input = document.querySelector('.input')
let result = document.getElementsByClassName('itemQuantity')
input.addEventListener('itemQuantity', newQuantity)

    function newQuantity() {
        console.log("ok")} */

/*         var r2 = el.closest("div div");
// Renvoie le plus proche ancêtre qui est un div
// dans un div. Ici, c'est div-03 lui-même. */

/*          newQuantity : document.getElementById("number").value

    for (i = 0; i < productsInCart.length; i++) {
    if (newQuantity != productsInCart[i].quantity) {
        totalPrice = parseInt(totalPrice) + parseInt(productsInCart[i].price)
        console.log(totalPrice)
     }
     displayPrice = document.getElementById("totalPrice")
     displayPrice.innerText = `${totalPrice}`
     console.log(displayPrice) */

//--Suppression d'un produit
const removeProduct = async (panierDisplay) => {
    await panierDisplay
    console.log("salut")

//--Récupérartion de tous les boutons supprimmer
    let trashs = document.querySelectorAll(".deleteItem")
    console.log(trashs)

//--Ecoute du clik
    trashs.forEach((trash) => {trash.addEventListener("click",() => {
    console.log(trash)

//--Récupérartion des données liées au produit à supprimer
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
            })
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
    } )})

}
removeProduct()

