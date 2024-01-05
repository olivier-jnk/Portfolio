for (var i = 0; i < cartesClass.length; i++) {
    cartesClass[i].addEventListener('click', function() {
        
        if (valeur < 2){
            console.log('CLIQUE');
            this.classList.remove('invisible');
            this.classList.add('firstclick')
            valeur = valeur + 1;
            console.log(valeur)            
        }         
        else if (valeur === 2){
            var carteclicked1 = document.querySelector('.firstclick')
            var carteclicked2 = document.querySelector('.firstclick')
           
            if (carteclicked1 && carteclicked2){
                var idCarteClicked1 = carteclicked1.id
                var idCarteClicked2 = carteclicked2.id

                if (idCarteClicked1 === idCarteClicked2){
                    carteclicked1.classList.remove('firstclick')
                    carteclicked1.classList.add('found')
                    carteclicked2.classList.remove('firstclick')
                    carteclicked2.classList.add('found')
                    valeur = 0
                }else{
                    carteclicked1.classList.remove('firstclick')
                    carteclicked1.classList.add('invisible')
                    carteclicked2.classList.remove('firstclick')
                    carteclicked2.classList.add('invisible')
                    valeur = 0

                }
            }

        }       
    });
}


for (var i = 0; i < cartesClass.length; i++) {
    cartesClass[i].addEventListener('click', function() {
        
        if (valeur < 2){
            console.log('CLIQUE');
            this.classList.remove('invisible');
            this.classList.add('firstclick')
            valeur = valeur + 1;
            valeur2 = valeur + 1;
            console.log(valeur)              
        }         
        else if (valeur2 >= 2){
            var carteclicked1 = document.querySelector('.firstclick')
            var carteclicked2 = document.querySelector('.firstclick')
           
            if (carteclicked1 && carteclicked2){
                var idCarteClicked1 = carteclicked1.id
                var idCarteClicked2 = carteclicked2.id

                if (idCarteClicked1 === idCarteClicked2){
                    carteclicked1.classList.remove('firstclick')
                    carteclicked1.classList.add('found')
                    carteclicked2.classList.remove('firstclick')
                    carteclicked2.classList.add('found')
                    valeur = 0
                    valeur2 = 0
                }else{
                    carteclicked1.classList.remove('firstclick')
                    carteclicked1.classList.add('invisible')
                    carteclicked2.classList.remove('firstclick')
                    carteclicked2.classList.add('invisible')
                    valeur = 0
                    valeur2 = 0

                }
            }

        }     
        
    });
}

//


let valeur = 0;
let cartesCliques = [];

var cartesClass = document.getElementsByClassName('invisible');

// var monElement = document.getElementById('idSelectedCard');
// monElement.removeEventListener('click', myEventHandler);

// Boucle for peut etre pas la plus adaptée. pour le addeventlistener oui, mais pour le reste...
for (var i = 0; i < cartesClass.length; i++) {
    cartesClass[i].addEventListener('click', function() {
    
        if (valeur < 2){
            //clear les firstclicks.
            console.log('CLIQUE');
            this.classList.remove('invisible');
            this.classList.add('firstclick')
            // Peut etre plus besoin du passage en 'firstclick' avec le tableau cartesCliques.
            valeur = valeur + 1;
            cartesCliques.push(this);
            console.log(valeur);              
        }         

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
            }, 1000);
            
        }
    });
}
