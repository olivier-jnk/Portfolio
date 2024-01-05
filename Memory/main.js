var images = [
    { chemin: "Images/carte1.png", alt: "", valeur: 0, numéro: 0 },
    { chemin: "Images/carte2.png", alt: "", valeur: 0, numéro: 1 },
    { chemin: "Images/carte3.png", alt: "", valeur: 0, numéro: 2 },
    { chemin: "Images/carte4.png", alt: "", valeur: 0, numéro: 3 },
    { chemin: "Images/carte5.png", alt: "", valeur: 0, numéro: 4 },
    { chemin: "Images/carte6.png", alt: "", valeur: 0, numéro: 5 },
    // { chemin: "Images/carte7.png", alt: "", valeur: 0, numéro: 6 },
    // { chemin: "Images/carte8.png", alt: "", valeur: 0, numéro: 7 }
];

// 4x3 / 6X6 (18 cartes.)

//mode de choix de taille 4X4 3X3... / soit variables/functions differentes. Soit pages differentes accessibles au boutton. dispo qui differe.
// ajouter differents modes de jeu + score + win. 
//+ design.
// Donner un rang en fonction du nombre de coups.

// Choix du theme de mots pour le pendu. (plusieurs pages ou var) + revelation du mot avec definition + design.

// eviter d'utiliser 'var' pour definir une variable.

function reload (){
    window.location.href= 'index.html';
}

//avec i<images.length *2 + ajout de cartes. le systeme de choix de taille peut fonctionner a merveille. (mettre 4 variables
// similaires mais de taille différentes. qui s'echangent au choix)
// pb id similaire ? quand ajout de cartes

const cartesDisponibles = images.filter(carte => carte.valeur < 2);
console.log(cartesDisponibles);

const cartesSelectionnees = {};

// imgl2 = images.lenght * 2
// console.log(imgl2)

for (let i = 0; i < images.length * 2; i++) {  //Remplacer 8 par images.lenght*2
    let liste = document.getElementById('cartes');
    if (cartesDisponibles.length > 0) {
        const indexAleatoire = Math.floor(Math.random() * cartesDisponibles.length);
        const randomCard = cartesDisponibles[indexAleatoire];

        randomCard.valeur += 1;
        let imageCarte = document.createElement('li');
        imageCarte.innerHTML = `<img src="${randomCard.chemin}" alt="${randomCard.alt}">`;
        imageCarte.id = randomCard.numéro;
        imageCarte.className = 'invisible';
        liste.appendChild(imageCarte);
        console.log(randomCard);

        if (cartesSelectionnees[randomCard.chemin]) {
            cartesSelectionnees[randomCard.chemin] += 1;
        } else {
            cartesSelectionnees[randomCard.chemin] = 1;
        }

        if (cartesSelectionnees[randomCard.chemin] === 2) {
            cartesDisponibles.splice(indexAleatoire, 1);
        }
    } else {
        console.log("Toutes les cartes ont été sélectionnées deux fois.");
        break; 
    }
}

let valeur = 0;
let cartesCliques = [];
let coup = 0;

var cartesClass = document.getElementsByClassName('invisible');

// var monElement = document.getElementById('idSelectedCard');
// monElement.removeEventListener('click', myEventHandler);

// Boucle for peut etre pas la plus adaptée. pour le addeventlistener oui, mais pour le reste...
for (var i = 0; i < cartesClass.length; i++) {
    cartesClass[i].addEventListener('click', function() {

        if (valeur < 2){ // modifier val
            //clear les firstclicks.
            console.log('CLIQUE');
            this.classList.remove('invisible');
            this.classList.add('firstclick')
            // Peut etre plus besoin du passage en 'firstclick' avec le tableau cartesCliques.
            valeur = valeur + 1;
            cartesCliques.push(this);
            console.log(valeur);
            carteVerificator();

        }    

    });
        
}

function carteVerificator() {
    if (cartesCliques.length === 2){
        var carteclicked1 = cartesCliques[0];
        var carteclicked2 = cartesCliques[1];
    
        var idCarteClicked1 = carteclicked1.id
        var idCarteClicked2 = carteclicked2.id

        if (idCarteClicked1 === idCarteClicked2){
            // var delEV = document.getElementById(idCarteClicked2);
            // delEV.removeEventListener('click');
            
            console.log('Correspondance' + idCarteClicked2)
            carteclicked1.classList.remove('firstclick')
            carteclicked1.classList.add('found')
            carteclicked2.classList.remove('firstclick')
            carteclicked2.classList.add('found')
            carteclicked1.removeEventListener('click', arguments.callee);
            carteclicked2.removeEventListener('click', arguments.callee);
        } else {
            console.log('Cartes ne correspondent pas !')
            setTimeout(function() { // delai d'une seconde pour que la deuxieme carte se revele, meme si elle ne correspond pas a la premiere.
                carteclicked1.classList.remove('firstclick')
                carteclicked1.classList.add('invisible')
                carteclicked2.classList.remove('firstclick')
                carteclicked2.classList.add('invisible')
            }, 1000);
        }
        setTimeout(function() {
            // Réinitialisez des valeurs et du tabl
            valeur = 0;
            console.log('setvaleur0')
            cartesCliques = [];
            coup = coup + 1;
            console.log(coup + 'nombre de coups')
        }, 1000);
        
    }

}

// A corriger
// encore pas mal de bug. notamment le fait qu'on puisse spam la revelation de carte et donc reveler tout le jeu... ( a prioris bon pour ce bug,MAIS
// Reglage peut etre pas tres efficace.)
// des fois correspondance bug... et 2 cartes differentes peuvent rester affichés.
// QUAND 2 cartes bonnes et selection direct apres. bug d'affichage. la valeur bonne est parfois mal distribuée. (elements founds qui n'ont pas la classe
// et elements firstclick qui ne bougent pas.)
// exemple de bug. 1/1 et 4/4 sont affichés. Mais aussi 3et2. 
// Le fait est que. si un joueur joue calmement, il n y aura strictement aucun probleme. seulement si il accelere le pas, tout s'ecroule.
// probleme = elements qui restent en firstclick.

// Autre probleme qui est peut etre celui a l'origine de tous. meme quand un element n'a plus la classe 'invisible' il est toujours cliquable, ce qui 
// occasionne de nb bug. le probleme vient du fait je pense que le addeventlistener est ajouté au debut a tous les elements 'invisibles' et reste.
// Réglé MAIS Le bug persiste...

// !! JE CROIS AVOIR TROUVE UNE SOLUTION. maintenant au lieu que tout soit dans la boucle for qui s'active aux clicks. J'ai mis une fonction spéciale pour
// la verification de la correspondance. ainsi. si il y a click et que valeur < 2, les actions de base s'execute puis il y a appel de la fonction carteVerif
// jeu de base fonctionnel ! voir les ameliorations.

// A ajouter
// Ajouter le systeme de win
// Systeme de score
// possibilité de choisir la taille du terrain de jeu 4x4, 8x8...
// Design: faire des cartes stylisées et une interface plus interessante.
