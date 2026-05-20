# Pomodoro - Meyer Jerome

## Description
Ce projet consiste en un minuteur Pomodoro interactif et responsive, developpe integralement en JavaScript. L'application implemente la  methode de gestion du temps de Francesco Cirillo, permettant d'enchainer des sessions de travail  et des temps de pause.

## Fonctionnalites Implementees

### Fonctionnalites Obligatoires
* Compte a rebours au format MM:SS : Affichage dynamique et propre du temps restant (ex: 25:00, 09:05).
* Gestion de deux modes de base : Prise en compte d'un cycle complet avec une duree de Travail et une duree de Pause .
* Trois boutons de controle :
  * Start : Demarre ou reprend le minuteur la ou il s'etait arrete sans reinitialiser les donnees.
  * Pause : stop le decompte du temps.
  * Reset : Arrete la boucle temporelle, reinitialise le temps sur le mode en cours, efface les themes appliques et remet le compteur de sessions a zero.
* Basculement automatique : Passage  du mode Travail au mode Pause (et inversement) de maniere  autonome des que le chronometre atteint 0.
* Affichage  du mode actif : Changement global et immediat de l'interface visuelle pour indiquer l'etat  de l'application.

### Fonctionnalites Bonus 
* Personnalisation des durees (Champs de saisie) : Permet a l'utilisateur de modifier librement les temps de travail et de pause via des inputs.
* Compteur de sessions  : Suivi affichant le nombre de sessions de travail validees (une session etant comptabilisee apres chaque cycle de travail termine).
* Themes visuels dynamiques : Modification complete des couleurs de fond, des ombres et du design du minuteur selon 3 etats visuels bien distincts : le mode Defaut (accueil/reset), le mode Travail  et le mode Pause.
* Alerte sonore : Lecture d'un signal audio (bip) a la fin de chaque cycle de decompte pour avertir  l'utilisateur.

## Instructions pour lancer le projet localement
1. Telechargez ou clonez l'integralite du dossier du projet sur votre machine.
2. Assurez-vous que l'arborescence des fichiers respecte bien la structure ci-dessus (notamment la presence du fichier audio dans un dossier son).
3. Ouvrez simplement le fichier index.html dans le navigateur Internet de votre choix (Google Chrome, Firefox, Edge, Safari) en double-cliquant dessus, ou utilisez l'extension Live Server depuis votre IDE (ex: VS Code) pour simuler un environnement de production local.
