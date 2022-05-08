//Récupération des données de l'URL
const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/products/order")
    .then((res) => res.json())
    .then((promise) => {
        order = promise
        console.log("Liste des produits disponibles :",contact, order);
    });
}


const orderProcessing = () => {

/* //--Récupération de la commande
const customer = JSON.parse(localStorage.getItem("card"))
console.log("Comamnde :", card)
console.log("Prix total de la commande :", card.totalPrice, "€") */

/* 
//--Affichage du numérode commande
document.getElementById("orderId").innerHTML = `${idResponse}`

//--Affichage du prix total de la commande
const totalPrice = document.createElement("p")
document.getElementById("orderId").appendChild(totalPrice).innerHTML = `Prix total : ${customer[0].totalPrice} €`

//--Affichage d'un message de remerciement
const congratulations = document.createElement("p")
document.getElementById("orderId").appendChild(congratulations).innerHTML = `Féliciatations ! Votre commande sera bientôt expédiée !`
}
orderProcessing() */

//--Suppression du panier et des données de la commande
/* const removeLocalStorage = async(orderProcessing) => {
    await orderProcessing
    localStorage.clear()
}
removeLocalStorage() */
}
