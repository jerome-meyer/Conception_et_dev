# Typing Speed Test

## Description

Typing Speed Test est une application web interactive permettant de mesurer sa vitesse de frappe en français.  
L’utilisateur peut choisir entre trois niveaux de difficulté et voit ses performances analysées en temps réel (MPM ou wmp en anglais et précision).  
Les scores sont sauvegardés localement pour consulter l’historique, le meilleur score et la moyenne.

## Fonctionnalités implémentées

### Fonctionnalités principales
- **3 niveaux de difficulté** (Facile, Moyen, Difficile) avec des textes adaptés
- **Chronomètre** de 60 secondes
- **Coloration des lettres en temps réel** :
  - Vert = lettre correcte
  - Rouge = lettre incorrecte
  - Surbrillance grise = lettre actuelle
- **Calcul du MPM**  en direct pendant la saisie
- **Calcul du score final** : MPM, Précision , Temps écoulé
- **Historique des parties** sauvegardé dans le `localStorage`
- Affichage du **meilleur score** et de la **moyenne générale**
- Liste de l’historique des parties (du plus récent au plus ancien)
- Bouton **Recommencer** une partie

### Fonctionnalités bonus
- **Son d’erreur** lorsqu’une mauvaise touche est pressée
- Design soigné et moderne (polices Nunito + Lora, couleurs douces)
- Interface responsive
- Persistance des scores entre les sessions grâce au `localStorage`

## Comment lancer le projet

### Méthode simple
1. Téléchargez tous les fichiers du projet.
2. Ouvrez le fichier **`index.html`** directement dans votre navigateur.

### Méthode recommandée (avec Live Server)
1. Installez l’extension **Live Server** dans Visual Studio Code.
2. Faites un clic droit sur le fichier `index.html`.
3. Sélectionnez **Open with Live Server**.



