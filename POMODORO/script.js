// Declaration des variables 

let minuteur_lance = false;
let dejaLance      = false;
// Comme getelementbyid marche que avec des id, j'ai regardé sur internet comment utiliser getelementbyid mais version class, et j'ai trouvé queryselector, donc j'ai fait avec et je l'ai gardé pour la suite du projet 
const inputTravail = document.querySelectorAll('.temps_inputs input')[0]; // j'utilise les crohets pour selectionner le (nb) element de l'element parent, j'aurai pu utiliser la classe ou l'id direct aussi 
const inputPause   = document.querySelectorAll('.temps_inputs input')[1];
let timer          = document.querySelector('.timer');
const boutonStart  = document.querySelectorAll('.controle_but')[0];
const boutonReset  = document.querySelectorAll('.controle_but')[1];
const texteSession = document.querySelector('#session p'); 
const sonAlarme = new Audio('./son/bip3.mp3'); // j'ai choisis le 3 je l'aime bien mais le 1 et 2 font le taff aussi
let intervalId = null;
let mode       = 'travail';
let tempsRestant = parseInt(inputTravail.value) * 60;
let nbSessions = 0;

//--------------------------------------------------------------------------------------

// Fonction pour mettre à jour l'écran
function majAffichage() {
    let m = Math.floor(tempsRestant / 60);
    let s = tempsRestant % 60;
    timer.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'); // padstart c'est pour éviter des problemes d'affichage comme 9:5, c'est plus propre 09:05
}

// Affichage du chronomètre de base
majAffichage(); 

//------------------------------------------------------------------------------------------------------------------------------------------

// La partie qui gere la logique du bouton start
boutonStart.addEventListener('click', function() {

    // Pour mettre pause
    if (minuteur_lance) {
        clearInterval(intervalId);
        minuteur_lance = false; // le minuteur est arreté donc il n'est plus lancé
        boutonStart.textContent = "Start"; //on reaffiche le text start pour reprendre
        return;
    }

    // Pour lancer start
    if (!dejaLance) {
        tempsRestant = (mode === 'travail' ? inputTravail.value : inputPause.value) * 60;
        dejaLance = true;
    }

    // Ajouter le theme de travail au lancement du chrono avant intervalID le fasse tout seul
    if (mode === 'travail') {
        document.body.classList.add('theme_travail'); // J'add la classe 'theme_travail' au body pour appliquer le style CSS qui correspond.
    } else {
        document.body.classList.add('theme_pause'); 
    }

    minuteur_lance = true;
    boutonStart.textContent = "Pause";

    // Creation d'une boucle pour le chrono
    intervalId = setInterval(function() {
        
        if (tempsRestant > 0) {
            //le decompte
            tempsRestant = tempsRestant - 1
        } 
        else {

            
            //Pour le critère qui joue un son qd le chrono est fini
            sonAlarme.play();

            if (mode === 'travail') {
                // Fin du mode travail : on ajoute une session, on passe en pause et on change de thème
                nbSessions++; // la mm chose que nbSessions = nbSessions + 1
                texteSession.textContent = 'Sessions : ' + nbSessions; // Mise à jour du nb de sessions
                mode = 'pause';
                tempsRestant = parseInt(inputPause.value) * 60;
                document.body.classList.remove('theme_travail');
                document.body.classList.add('theme_pause');
            } else {
                // Fin du mode pause :  repasse en mode travail et ca rechange de thème
                mode = 'travail';
                tempsRestant = parseInt(inputTravail.value) * 60;
                document.body.classList.remove('theme_pause');
                document.body.classList.add('theme_travail');
            }
        }

        majAffichage(); 

    }, 1000); //1000ms -> 1s, pour que le chronometre s'ecoule à la bonne vitesse
});


// -------------------------------------------------------------------------------------------------------------------------------------

// Creation de la fonctionnalité reset
boutonReset.addEventListener('click', function() {
    clearInterval(intervalId); //stoppe la boucle du chronomètre
    minuteur_lance = false; // le minuteur s'arrete
    dejaLance      = false; // on met cette variable sur false car le minuteur n'est pas lancé
    boutonStart.textContent = "Start"; // on reaffiche start au lieu de pause
    mode = 'travail'; // on repasse en mode travail pour que le programme prenne la valeur de l'input travail.
    tempsRestant = parseInt(inputTravail.value) * 60;
    
    // Remise à zéro des sessions
    nbSessions = 0;
    texteSession.textContent = 'Sessions : 0';
    
    // refresh de l'écran et des thèmes
    majAffichage();
    document.body.classList.remove('theme_travail', 'theme_pause');
});