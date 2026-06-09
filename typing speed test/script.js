const conteneurTexte = document.getElementById('texte-a-taper');
const textarea = document.getElementById('textarea');
const spanChrono = document.getElementById('chrono');
const spanWpmLive = document.getElementById('wpm-live');
const ecranResultats = document.getElementById('ecran-resultats');
const boutonsDifficulte = document.querySelectorAll('.bouton_difficulte');
const btnRecommencer = document.getElementById('btn-recommencer');


let sonErreur = new Audio('./son/bip.mp3'); 

// Textes par difficulté 
const textes = {
    facile: [
        "Le chat dort sur le canapé.",
        "Il fait beau et chaud dehors.",
        "La pluie tombe sur la ville."
    ],
    moyen: [
        "Apprendre à coder demande de la patience et de la pratique.",
        "La pluie tombe doucement sur les toits de la ville."
    ],
    difficile: [
        "Seules les personnes âgées de plus de 18 ans ont le droit de voter lors des élections.",
        "Parmi les personnes présentes à la cérémonie se trouvaient l'ambassadeur et son épouse."
    ]
};

let chronoLance = false;
let tempsInitial = 60; 
let tempsRestant = tempsInitial;
let intervalId = null;
let caracteresCorrects = 0;
let totalCaracteresTapes = 0;
let difficulteActive = 'moyen';
let horodatageDebut = null;



// Fonction pour tout remettre a zero et lancer un test
function initialiserTest() {
    // Prendre un texte au hasard selon la difficulté
    let listeTextes = textes[difficulteActive];
    let indexHasard = Math.floor(Math.random() * listeTextes.length);
    let texteChoisi = listeTextes[indexHasard];

    // On vide tout
    conteneurTexte.innerHTML = '';
    textarea.value = '';
    textarea.disabled = false;
    textarea.focus(); // met le curseur direct dedans

    chronoLance = false;
    clearInterval(intervalId);
    tempsRestant = tempsInitial;
    spanChrono.textContent = tempsRestant;
    spanWpmLive.textContent = '0';
    caracteresCorrects = 0;
    totalCaracteresTapes = 0;
    horodatageDebut = null;

    ecranResultats.style.display = 'none';

    // Je decoupe le texte pour faire un span par lettre 
    let lettres = texteChoisi.split('');
    for (let i = 0; i < lettres.length; i++) {
        let span = document.createElement('span');
        span.textContent = lettres[i];
        conteneurTexte.appendChild(span);
    }

    // Le premier caractere est l'actuel
    conteneurTexte.querySelectorAll('span')[0].classList.add('actuel');
}


// L'evenement quand on ecrit dans le textarea
textarea.addEventListener('input', function() {
    
    // Si le chrono est pas lancé, on le lance
    if (chronoLance == false) {
        horodatageDebut = Date.now();
        lancerChrono();
        chronoLance = true;
    }

    let texteSaisi = textarea.value.split('');
    let spans = conteneurTexte.querySelectorAll('span');
    let erreurDetectee = false;

    caracteresCorrects = 0;
    totalCaracteresTapes = texteSaisi.length;

    // On verifie chaque lettre 
    for (let i = 0; i < spans.length; i++) {
        spans[i].className = ''; // on enleve les couleurs

        if (i < texteSaisi.length) {
            // Si la lettre est bonne
            if (texteSaisi[i] === spans[i].textContent) {
                spans[i].classList.add('correct');
                caracteresCorrects = caracteresCorrects + 1;
            } else {
                // Si elle est fausse
                spans[i].classList.add('incorrect');
                erreurDetectee = true;
            }
        }
    }

    // Si y'a une erreur on joue le son
    if (erreurDetectee == true) {
        sonErreur.play();
    }

    // Pour faire avancer le curseur gris
    if (texteSaisi.length < spans.length) {
        spans[texteSaisi.length].classList.add('actuel');
        
        // Calcul du WPM en live
        let tempsEcouleMin = (Date.now() - horodatageDebut) / 60000;
        if (tempsEcouleMin > 0) {
            let wpmLive = Math.round((caracteresCorrects / 5) / tempsEcouleMin);
            spanWpmLive.textContent = wpmLive;
        }
    } else {
        // Le texte est fini
        terminerTest();
    }
});



// Fonction du chronometre
function lancerChrono() {
    intervalId = setInterval(function() {
        tempsRestant = tempsRestant - 1;
        spanChrono.textContent = tempsRestant;
        
        if (tempsRestant <= 0) {
            terminerTest();
        }
    }, 1000); // 1000ms = 1s
}



// Quand le temps est ecoulé ou le texte fini
function terminerTest() {
    clearInterval(intervalId);
    textarea.disabled = true; // on bloque l'ecriture pour la fin

    let tempsEcouleSecondes = tempsInitial - tempsRestant;
    let tempsEcouleMinutes = tempsEcouleSecondes / 60;

    let wpm = 0;
    if (tempsEcouleMinutes > 0) {
        wpm = Math.round((caracteresCorrects / 5) / tempsEcouleMinutes);
    }

    let precision = 0;
    if (totalCaracteresTapes > 0) {
        precision = Math.round((caracteresCorrects / totalCaracteresTapes) * 100);
    }

    // Affichage sur l'ecran de fin
    document.getElementById('score-wpm').textContent = wpm;
    document.getElementById('score-precision').textContent = precision;
    document.getElementById('temps-ecoule').textContent = tempsEcouleSecondes;
    
    ecranResultats.style.display = 'block';

    sauvegarderHistorique(wpm, precision, tempsEcouleSecondes);
    afficherHistorique();
}



// Sauvegarde dans le local storage 
function sauvegarderHistorique(wpm, precision, temps) {
    let histoString = localStorage.getItem('tst_historique');
    let historique = [];
    
    // Si on a deja un historique on le recupere
    if (histoString !== null) {
        historique = JSON.parse(histoString);
    }

    let nouvellePartie = {
        wpm: wpm,
        precision: precision,
        temps: temps
    };

    historique.push(nouvellePartie); // J'ajoute a la fin du tableau
    
    localStorage.setItem('tst_historique', JSON.stringify(historique));
}



// Affichage des anciens scores (
function afficherHistorique() {
    let histoString = localStorage.getItem('tst_historique');
    if (histoString === null) {
        return; // Si y'a rien on s'arrete la
    }

    let historique = JSON.parse(histoString);
    if (historique.length === 0) {
        return;
    }

    let meilleur = 0;
    let sommeWpm = 0;

    // Je calcule le meilleur et la moyenne 
    for (let i = 0; i < historique.length; i++) {
        let partie = historique[i];
        sommeWpm = sommeWpm + partie.wpm;
        
        if (partie.wpm > meilleur) {
            meilleur = partie.wpm;
        }
    }

    let moyenne = Math.round(sommeWpm / historique.length);

    document.getElementById('meilleur-score').textContent = meilleur;
    document.getElementById('moyenne-score').textContent = moyenne;

    let liste = document.getElementById('liste-historique');
    liste.innerHTML = ''; // on vide la liste d'abord
    
    // On affiche la liste a l'envers pour avoir le plus recent en premier
    for (let i = historique.length - 1; i >= 0; i--) {
        let partie = historique[i];
        let li = document.createElement('li');
        li.textContent = "Partie " + (i + 1) + " : " + partie.wpm + " WPM - " + partie.precision + "%";
        liste.appendChild(li);
    }
}



// Clic sur les boutons de difficulte
for (let i = 0; i < boutonsDifficulte.length; i++) {
    boutonsDifficulte[i].addEventListener('click', function() {
        if (chronoLance == true) return;
        
        // On cherche le bouton qui a la classe 'actif' et on lui enlève
        document.querySelector('.bouton_difficulte.actif').classList.remove('actif');
        
        // On met la classe 'actif' sur le bouton qu'on vient de cliquer
        boutonsDifficulte[i].classList.add('actif');
        
        //maj de la difficulté et je relance
        difficulteActive = boutonsDifficulte[i].dataset.difficulte;
        initialiserTest();
    });
}

// Le bouton pour restart
btnRecommencer.addEventListener('click', function() {
    initialiserTest();
});


initialiserTest();