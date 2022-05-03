let productsInCard = []; //Déclaration d'un tableau vide

//Récupération des données de l'URL
const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        productsInCard = promise
        console.log(productsInCard);
    });
};

fetchProducts(); //Execution de la fonctionn

//Implémentation des données dans la page
const productsDisplay = async () => { /*Création de la constante productsDisplay qui pourra s'executer en //*/
    await fetchProducts();/*Informe productsDisplay qu'elle doit attendre la fin de fetchProducts*/
/*Appele la classe Item, ajoute à l'HTML les produits du tableau*/
    document.getElementById("items").innerHTML = productsInCard.map((products) => ` 
        <a href="product.html?id=${products._id}" target="_blank">
            <article>
                <img src="${products.imageUrl}" alt="${products.altTxt}">
                <h3 class="productName">${products.name}</h3>
                <p class="productDescription">${products.description}</p>
            </article>
        </a>`
    )
.join("");/*Permet de supprimer la virgule automatique*/
};

productsDisplay();