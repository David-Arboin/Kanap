//--Utilisation de l'interface URLSearchParams qui permet de travailler avec l'URL de la page active
const urlSearchParams = new URLSearchParams(window.location.search);
console.log("Récupération de l'URL de la page :", urlSearchParams);

//--Récupérartion de l'id du produit
const orderId = urlSearchParams.get("orderID");
console.log("L'id du produit est :", orderId);

//--Affichage de l'id ed la commande renvoyée par le server
document.getElementById("orderId").innerText = orderId

//--Suppression du panier et des données de la commande
localStorage.clear()


