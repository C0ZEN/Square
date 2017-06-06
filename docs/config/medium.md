# Moyen

#### Description

Dans ce type de difficulté, l'IA sera assez intelligente pour être un adversaire prêt à vous battre.

Elle se repose sur un algorithme de recherche de carrés à terminé.

Si aucun carré ne peut être terminé, elle basculera sur un choix **aléatoire** comme pour le niveau **très facile**.

Son but est donc de priorisé les points à gagnés en complétant un maximum de carrés.

**Note:** une d'intelligence plus poussée fait donc son apparition.

#### Etapes

Voyons en détails les étapes et vérifications qu'elle suit:

- Parcours de toute la grille
   - Vérifie si un carré peut-être terminé
   - Si oui, sélectionne l'arrête manquante pour compléter le carré
   - Si non, choisi une arrête au hasard (bascule vers **très facile**)
- Fin de l'algorithme

#### Explications détaillées

#### Améliorations possibles

Voici la liste des éléments qu'on pourrait améliorer pour rendre l'IA plus intelligente.

- Sélectionne l'arrête qui rapporte le plus de points
- Si aucun carré n'est possible, place l'arrête de façon à ne pas offrir de carré à l'adversaire

<a href="{{ site.baseUrl }}config/hard/" class="btn btn-green">Chapitre suivant: Difficile</a>
