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
)};

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
let newQuantityByArrow = () => {
    document.getElementById("spin").addEventListener("click", order) = () =>
    function order() {
        newQuantity : document.getElementById("spin").value

for (i = 0; i < productsInCart.length; i++) {
    if (newQuantity != productsInCart[i].quantity) {
        totalPrice = parseInt(totalPrice) + parseInt(productsInCart[i].price)
        console.log(totalPrice)
     }
     displayPrice = document.getElementById("totalPrice")
     displayPrice.innerText = `${totalPrice}`
     console.log(displayPrice)
}}}
newQuantityByArrow()

//--Mise à jour de la quantité totale de produit sélectionnés
/* let updateNumberProductInCartAfterClick = () => {

    for (i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].color != "" && productsInCart[i].quantity > 0) {
            numberProductInCart = parseInt(numberProductInCart) + parseInt(productsInCart[i].quantity)
            console.log(numberProductInCart)
         }
         let totalQuantity = document.getElementById("totalQuantity")
         totalQuantity.innerText = `${numberProductInCart}`
         console.log(totalQuantity)
    }
    }
updateNumberProductInCartAfterClick() */

//--Bouton Commander
//--Si une quantité n'est pas saisie, le client est prévenu
/* document.getElementById("order").addEventListener("click", order) = productsInCart.map((products) =>
function order() {
if (products.quantity == 0){
    document.getElementById("text-field-container").style.backgroundColor = "green"
}
}) */