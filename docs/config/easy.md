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

<a href="{{ site.baseUrl }}config/medium/" class="btn btn-green">Chapitre suivant: Moyen</a>
