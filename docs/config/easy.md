# Facile

#### Description

Dans ce type de difficulté, l'IA sera assez facile.

Elle se repose sur des algorithmes **aléatoire** mais avec prédilection pour la victoire.

Comme pour l'algorithme **très facile**, le choix de l'arrête se fait aléatoirement.  
Cependant, la direction va être choisi en fonction de celle qui rapporte le plus de points.

**Note:** une forme d'intelligence légère fait son apparition.

#### Etapes

Voyons en détails les étapes et vérifications qu'elle suit:

- Choisi une ligne aléatoire
- Choisi une colonne aléatoire
- Vérifie le nombre de position disponibles en fonction des arrêtes sélectionnées (0, 1 ou 2)
   - Si 0, recommence toutes les étapes
   - Si 1, sélectionne l'arrête
   - Si 2, exécute une recherche sur le score potential après ajout
      - Calcul le nombre de points que rapporte l'arrête horizontale
      - Calcul le nombre de points que rapporte l'arrête verticale
      - Sélectionne l'arrête qui rapporte le plus de points
- Fin de l'algorithme

#### Explications détaillées

Voyons en détails le code.

##### Récupération d'une coordonnée

Avec l'aide de `Math.random`, nous allons récupéré les coordonnées d'une arrête dans la grille.

Nous choisisons aléatoirement l'index d'une ligne et l'index d'une colonne.  

##### Vérification de l'arrête

L'arrête choisis peut ne pas être correcte (en dehors de la grille ou déjà sélectionnée).

Nous allons vérifier si l'arrête verticale et horizontale sont disponibles.

Si l'arrête verticale n'est pas sélectionnée et que ce n'est pas la dernière ligne, elle est disponible.  
Si l'arrête horizontale n'est pas sélectionnée et que ce n'est pas la dernière colonne, est est disponible.

Si les deux arrêtes sont disponibles, nous allons simuler de choisir l'une et l'autre arrête puis nous allons calculer le nombre de carrés complétés avec ce choix d'arrête.

L'arrête qui donne le plus de carrés sera alors l'arrête à sélectionnée (la direction horizontale prend le dessus en cas d'égalité).

Si l'une des deux arrête est disponiblen alors on la choisit.

Si toutes les arrêtes sont indisponibles, nous recommençons à l'étape de **récupération d'une coordonnée**, sinon, nous passons à la **sélection d'une arrête**.

##### Sélection d'une arrête

Nous savons que l'arrête choisis est sélectionnable.

Nous la sélectionnons en actualisant ses informations (objet).

De plus, nous lançons une analyse pour complétés les carrés complets.  
Si une carré à était complété, le joueur pourra alors rejoué.

#### Améliorations possibles

Voici la liste des éléments qu'on pourrait améliorer pour rendre l'IA plus intelligente.

- Recherche avant tout les carrés à compléter
- Sélectionne l'arrête qui rapporte le plus de points

<a href="{{ site.baseUrl }}config/medium/" class="btn btn-green">Chapitre suivant: Moyen</a>
