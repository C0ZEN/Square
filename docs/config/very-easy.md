# Très facile

#### Description

Dans ce type de difficulté, l'IA sera vraiment très facile.

Elle se repose sur des algorithmes **purement aléatoire**.

Le choix de sélection d'une arrête se fait à 100% au hasard.

**Note:** il n'y a aucune forme d'intelligence.

#### Etapes

Voyons en détails les étapes et vérifications qu'elle suit:

- Choisi une ligne aléatoire
- Choisi une colonne aléatoire
- Choisi une direction (arrête) aléatoire
- Vérifie que cette arrête n'est pas déjà sélectionnée par un joueur
   - Si déjà sélectionnée, recommence toutes les étapes
   - Sinon, sélectionne l'arrête
- Fin de l'algorithme

#### Explications détaillées

Voyons en détails le code.

##### Récupération d'une coordonnée

Avec l'aide de `Math.random`, nous allons récupéré les coordonnées d'une arrête dans la grille.

Nous choisisons aléatoirement l'index d'une ligne et l'index d'une colonne.  
Puis une direction aléatoire (horizontale/verticale).

##### Vérification de l'arrête

L'arrête choisis peut ne pas être correcte (en dehors de la grille ou déjà sélectionnée).

Nous vérifions que l'arrête choisis n'est pas une arrête verticale sur la dernière ligne.  
Que l'arrête choisis n'est pas une arrête horizontale sur la dernière colonne.  
Et que l'arrête choisis n'est pas une arrête déjà sélectionnée dans la grille.

Si toutes ses conditions sont correctes, nous passons à la **sélection d'une arrête**, sinon, nous recommençons à l'étape de **récupération d'une coordonnée**.

##### Sélection d'une arrête

Nous savons que l'arrête choisis est sélectionnable.

Nous la sélectionnons en actualisant ses informations (objet).

De plus, nous lançons une analyse pour complétés les carrés complets.  
Si une carré à était complété, le joueur pourra alors rejoué.

#### Améliorations possibles

Voici la liste des éléments qu'on pourrait améliorer pour rendre l'IA plus intelligente.

- Recherche avant tout les carrés à compléter
- Sélectionne l'arrête qui rapporte le plus de points
- Choix de l'arrête selon critères

<a href="{{ site.baseUrl }}config/easy/" class="btn btn-green">Chapitre suivant: Facile</a>
