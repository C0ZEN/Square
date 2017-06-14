# Très difficile

#### Description

Dans ce type de difficulté, l'IA sera vraiment très intelligente.  
Maîtriser tous les coups du jeu, tu devras.

Elle se repose sur un algorithme ....

Son but est ...

**Note:** une intelligence extrêmement poussée est donc présente.

#### Etapes

Voyons en détails les étapes et vérifications qu'elle suit:

- Parcours de toute la grille
   - Vérifie si un carré peut-être terminé
   - Si oui, sélectionne l'arrête manquante pour compléter le carré
   - Si non, parcours de nouveau toute la grille
   - Vérifie pour chaque arrête si sa sélection permet au tour suviant de terminé un carré en ajoutant une arrête
   - Si oui, supprime cette arrête des choix possibles
   - Si non, ajoute cette arrête aux choix possibles
   - Une fois la boucle terminée, sélectionne une arrête des choix possibles aléatoirement
   - Si aucune arrête ne fait partie des choix possibles, choisi une arrête au hasard (bascule vers **très facile**)
- Fin de l'algorithme

#### Explications détaillées

Voyons en détails le code.

##### Compléter un carré

La première étape consiste à vérifier si nous pouvons terminé un carré.

Nous allons parcourir toute la grille et pour chaque case nous allons faire des vérifications:

##### Compléter un carré avec une arrête en bas manquante

Si le carré n'est pas complété,  
Et que les deux arrêtes de la case sont sélectionnées (arrête gauche/haut),  
Et que ce n'est pas la dernière colonne,  
Et que la colonne suivante a une arrête verticale sélectionnée,  
Et que ce n'est pas la dernière ligne,  
Alors l'arrête horizontale de la ligne suivante est disponible et permet de réaliser un carré.

##### Compléter un carré avec une arrête à droite manquante

Si le carré n'est pas complété,  
Et que les deux arrêtes de la case sont sélectionnées (arrête gauche/haut),  
Et que ce n'est pas la dernière ligne,  
Et que la ligne suivante a une arrête horizontale sélectionnée,  
Et que ce n'est pas la dernière colonne,  
Alors l'arrête verticale de la colonne suivante est disponible et permet de réaliser un carré.

##### Compléter un carré avec une arrête en haut manquante

Si le carré n'est pas complété,  
Et que l'arrête verticale est sélectionnée mais pas l'arrête horizontale,  
Et que ce n'est pas la dernière colonne,  
Et que la colonne suivante a une arrête verticale sélectionnée,  
Et que ce n'est pas la dernière ligne,  
Et que la ligne suivante a une arrête horizontale sélectionnée,  
Alors l'arrête horizontale est disponible et permet de réaliser un carré.

##### Compléter un carré avec une arrête à gauche manquante

Si le carré n'est pas complété,  
Et que l'arrête horizontale est sélectionnée mais pas l'arrête verticale,  
Et que ce n'est pas la dernière colonne,  
Et que la colonne suivante a une arrête verticale sélectionnée,  
Et que ce n'est pas la dernière ligne,  
Et que la ligne suivante a une arrête horizontale sélectionnée,  
Alors l'arrête verticale est disponible et permet de réaliser un carré.

##### Compléter le carré

Si à la moindre occasion l'une des vérifications précédente s'avère exacte, alors nous pouvons compléter un carré.

Dans ce cas, nous le complétons.

Si ce n'est pas le cas, nous allons chercher une arrête de façon à ne pas offrir de carré au prochain tour à notre adversaire.

##### Recherche d'arrête *safe*

Nous allons parcourir toute la grille de jeu et pour chaque case, nous allons vérifier si l'arrête verticale et horizontale est valide.

La première condition est bien sûr de vérifier que l'arrête n'est pas sélectionnée.  
Si l'arrête n'est pas sélectionnée, alors nous allons la sélectionner dans une version copiée de la grille actuelle.  
Ensuite, nous simulons le prochain tour pour un adversaire **moyen**, ce qui implique une recherche de **carré à compléter**.

##### Carré à compléter

Cet algorithme est celui utilisé à la fois dans la difficulté **moyenne** et **difficile**.

Nous recherchons dans la grille si un carré peut-être réalisé en ajoutant uniquement une seule arrête.

Si c'est le cas, l'algorithme retournera alors l'arrête, sinon il retournera `false`.

##### Sauvegarde des arrêtes

Donc pour chaque arrête, nous aurons l'information suivante: elle peut offrir un carré au prochain coup de l'adversaire ou pas.

Toutes les arrêtes qui n'offrent pas de coup au prochain tour de l'adversaire seront stockées dans un tableau.

##### Sélection d'une arrête valide

Une fois toutes la grille analysée, nous aurons deux cas possibles:

- Un tableau d'arrêtes valides
- Un tableau vide

Si le tableau n'est pas vide, nous choisirons alors une arrête aléatoirement.

Sinon, il n'y a aucun coup *safe* et nous pouvons alors basculer sur un niveau aléatoire **très facile**.

#### Améliorations possibles

Voici la liste des éléments qu'on pourrait améliorer pour rendre l'IA plus intelligente.

- Sélectionne l'arrête qui rapporte le plus de points
- Ne sélectionne pas l'arrête aléatoirement à la fin, mais sélectionne celle qui offre le moins de points à l'adversaire

<a href="{{ site.baseUrl }}config/very-hard/" class="btn btn-green">Chapitre suivant: Très difficile</a>
