# Déroulement d’une partie

Voici toutes les choses à savoir sur le déroulement d'une partie.

#### Humain contre IA

Lors d'une partie humain contre IA, le joueur humain commence.

Le jeu va alors attendre une interaction de la part de l'humain.

L'humain peut alors choisir une arrête valide (les arrêtes déjà sélectionnées ne sont pas sélectionnables au clic).

Dès que l'arrête est choisie, nous mettons à jour les données pour cette case du plateau.

La fonction de **réalisation des carrés** sera alors exécutée.

**Note:** le joueur peut rejouer s'il termine un carré.

Une fois que l'humain à terminé son tour, l'IA **choisit une arrête** (en fonction de l'algorithme associé à son niveau de difficulté).

Les étapes sont ensuite les mêmes que pour l'humain.

#### IA contre IA

Le concept est identique à la partie humain contre humain.

La seule différence ici est que l'humain est spectateur, il ne peut pas interagir avec le plateau.

De plus, la partie n'attend plus d'interaction avec l'humain.

**Note:** entre chaque coup de l'IA, un délai sera mis en place (correspond à la vitesse du jeu dans la configuration).

**Note:** les IA peuvent être de niveau différents.

#### Choix d'une arrête

Cette partie concerne le choix d'une arrête par l'IA.

En fonction de l'algorithme exécuté, l'arrête sélectionnée peut ne pas être valide.

Dans ce cas précis, la fonction est appellée récursivement jusqu'à ce que l'arrête choisie soit correcte.

Une fois l'arrête choisie, l'objet du tableau sera mis à jour.

#### Réalisation des carrés

Après qu'un humain ou que l'IA ait choisi une arrête valide, une fonction récursive va être appellée.

Cette fonction va parcourir chaque case du plateau pour vérifier les règles suivantes:

- Si le carré n'est pas sélectionné
   - Si les deux arrêtes sont sélectionnées
      - Vérifie qu'il existe une colonne à `colonne + 1`
         - Vérifie que l'arrête verticale est sélectionnée
      - Vérifie qu'il existe une ligne à `ligne + 1`
         - Vérifie que l'arrête horizontale est sélectionnée

Si toutes les conditions sont remplies, nous avons deux arrêtes verticales et horizontales sélectionnées mais le carré ne l'est pas.

Par conséquent, nous pouvons sélectionner le carré.

Il est possible que le placement de la dernière arrête offre plusieurs carrés d'un coup.

Un appel récursif à la fonction de sélection du carré sera effectué.

**Note:** dès qu'un carré est sélectionné, la fonction retourne un token qui permet au joueur de rejouer, sinon, on change de joueur.

#### Victoire

A chaque arrête placée, le compteur du nombre de coups sera incrémenté.

Dès que le nombre de coups actuel sera plus grand que le nombre de coups total, alors la partie se termine.

Une fonction va alors déterminer qui est le gagnant et qui est le perdant en se basant sur la score des joueurs.

**Note:** en cas d'égalité, le joueur de gauche remporte toujours la partie.

Nous arrêtons tous les processus en cours puis une redirection sera effectuée sur la vue de victoire.

<a href="{{ site.baseUrl }}game/victory/" class="btn btn-green">Chapitre suivant: Victoire</a>
