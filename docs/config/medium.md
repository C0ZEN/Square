# Moyen

#### Description

Dans ce type de difficulté, l'IA sera assez intelligente pour être un adversaire prêt à vous battre.

Elle repose sur un algorithme de recherche de carrés à terminer.

Si aucun carré ne peut être terminé, elle basculera sur un choix **aléatoire** comme pour le niveau **très facile**.

Son but est donc de prioriser les points à gagner en complétant un maximum de carrés.

**Note:** une intelligence plus poussée fait donc son apparition.

#### Etapes

Voyons en détails les étapes et vérifications qu'elle suit:

- Parcours de toute la grille
   - Vérifie si un carré peut être terminé
   - Si oui, sélectionne l'arrête manquante pour compléter le carré
   - Si non, choisit une arrête au hasard (bascule vers **très facile**)
- Fin de l'algorithme

#### Explications détaillées

Voyons en détails le code.

##### Compléter un carré

La première étape consiste à vérifier si nous pouvons terminer un carré.

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

Si ce n'est pas le cas, alors nous pouvons jouer en **très facile** pour choisir une arrête aléatoirement.

#### Améliorations possibles

Voici la liste des éléments qu'on pourrait améliorer pour rendre l'IA plus intelligente.

- Sélection de l'arrête qui rapporte le plus de points
- Si aucun carré n'est possible, place l'arrête de façon à ne pas offrir de carré à l'adversaire

<a href="{{ site.baseUrl }}config/hard/" class="btn btn-green">Chapitre suivant: Difficile</a>
