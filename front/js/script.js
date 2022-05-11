// Récupération des données de l'URL
// Méthode 1
const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products")
    const productsInCard = await res.json()
    console.log("Liste des produits disponibles :", productsInCard)
    return productsInCard
}

//  Méthode 2
/*     const fetchProducts = () => {
        return fetch("http://localhost:3000/api/products")//  Requête fetch GET pour récupérer les données d'un canapé dans l'api selon son id
        .then(res => {//  Réponse de l'api, contient le status ainsi que d'autre informations. Les données ne sont pas lisibles à ce stade
        return res.json()// On parse le body afin qu'il soit lisible par notre code
        }
     )
} */

//--Implémentation des données dans la page
const productsDisplay = async () => {
      productsInCard = await fetchProducts() //--Informe productsDisplay qu'elle doit attendre la fin de fetchProducts

    document.getElementById("items").innerHTML = productsInCard.map((products) => `
        <a href="product.html?id=${products._id}">
            <article>
                <img src="${products.imageUrl}" alt="${products.altTxt}">
                <h3 class="productName">${products.name}</h3>
                <p class="productDescription">${products.description}</p>
            </article>
        </a>`
    )
    .join("")/*Permet de supprimer l'apostrophe automatique*/
}
productsDisplay()