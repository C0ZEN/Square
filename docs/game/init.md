# Initialisation

L'initialisation est la première vue du jeu, avant que la partie ne commence.

#### Chargement de la configuration

Nous allons dans un premier temps chargé toutes les données issues de la configuration.

Cela va permettre de **créer les joueurs**, le plateau, le type de partie et toutes les autres données nécéssaires au bon déroulement de la partie.

#### Création des joueurs

Nous créons ensuite les joueurs, en fonction du type de partie (si humain vs IA ou IA vs IA).

Dans le cas d'une partie humain vs IA, le joueur humain sera toujours à gauche, en jaune, et sera la premier à jouer.

> L'IA sera à droite en bleu.

Dans le cas d'une partie IA vs IA, la première IA sera à gauche en violet.

> La deuxième IA sera à droite en bleu.

#### Initialisation des données

Notre application Square est vraiment complète et nous avons voulu rendre le jeu vraiment agréable, pour nous, et notre correcteur ;)

Par conséquent, il y a un tas de données à initialiser pour que la partie fonctionne (début/recommencer).

Par exemples:

- Le score des joueurs est réinitialisé à 0
- Le nombre de carrés à réaliser est recalculé
- Le temps est réinitialisé à 0
- Le nombre de coups total et courrant est recalculé

**Note:** un bouton permet de passer à l'étape suivante: jouer.

<a href="{{ site.baseUrl }}game/begin/" class="btn btn-green">Chapitre suivant: Début d’une partie</a>
