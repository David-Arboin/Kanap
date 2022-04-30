//Appele la base de données des produits
const fetchProducts = async () => {
    await fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json(),)
    .then((promise) => {
    productData = promise
    console.log(productData[0].name)
    console.log(productData[0].colors[0])
    console.log(productData.length)
    })
};
    
//Récupère le tableau des données saisies par l'utilisateur dans local storage
const panierDisplay = async () => {
    await fetchProducts();
    let adaptationFetchToReconstitutionPanier = productData[0]
    console.log(adaptationFetchToReconstitutionPanier)
    let reconstitutionPanier = JSON.parse(localStorage.getItem(`${productData[0].name}` + " de couleur " + `${productData[0].colors[0]}`))
    console.log(reconstitutionPanier)
if(adaptationFetchToReconstitutionPanier === reconstitutionPanier) { return(
    console.log(ok))
}

/*      for (let i = 0; i < localStorage.length; i++) {
         if(reconstitutionPanier == adaptationFetchToReconstitutionPanier) {
            
//Implémentation des données du tableau dans la page
        document.getElementById("cart__items").innerHTML = ` 
        <article class="cart__item" data-id="id" data-color="color">
            <div class="cart__item__img">
                <img src="${(JSON.parse(localStorage.getItem(productData[1].name + " de couleur " + productData[1].colors[1]))).image}"
                " alt="${(JSON.parse(localStorage.getItem(productData[1].name + " de couleur " + productData[1].colors[1]))).altText}">
            </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${(JSON.parse(localStorage.getItem(productData[1].name + " de couleur " + productData[1].colors[1]))).name}</h2>
                    <p>${(JSON.parse(localStorage.getItem(productData[1].name + " de couleur " + productData[1].colors[1]))).color}</p>
                    <p>${(JSON.parse(localStorage.getItem(productData[1].name + " de couleur " + productData[1].colors[1]))).price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${(JSON.parse(localStorage.getItem(productData[1].name + " de couleur " + productData[1].colors[1]))).quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
        }    */     
    };

panierDisplay();
/* 
let totalQuantity = document.getElementById("totalQuantity")
console.log(totalQuantity) */
//totalQuantity = 