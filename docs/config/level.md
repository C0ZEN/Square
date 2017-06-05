# Difficulté

#### De quoi il s'agit ?

Nous allons voir en détails les options disponibles pour configurer la **difficulté** de la partie.

#### Introduction

Chaque difficulté augmente la difficulté de l'IA.  

Pour chaque difficulté, des algorithmes différents sont utilisés.  
De plus, certaines difficultés ajoutent des vérifications supplémentaires pour rendre l'IA encore plus efficace.

En fonction des algorithmes et du nombre de contraintes à vérifier, la vitesse d'un tour de jeu par l'IA peu fortement variée.

**Note:** la taille de la grille a également un impact important sur la vitesse d'un tour.

#### Difficultés

Il existe quatre types de difficultés:

- **Très facile**
- **Facile**
- **Moyen**
- **Difficile**

#### Très facile

Dans ce type de difficulté, l'IA sera vraiment très facile.

Elle se repose sur des algorithmes purement aléatoire.

Voyons en détails les étapes et vérifications qu'elle suit:

- Choisi une ligne aléatoire
- Choisi une colonne aléatoire
- Choisi une direction (arrête) aléatoire
- Vérifie que cette arrête n'est pas déjà sélectionnée par un joueur
   - Si déjà sélectionnée, recommence toutes les étapes
   - Sinon, sélectionne l'arrête
- Fin de l'algorithme

**Note:** il n'y a aucune forme d'intelligence.

#### Facile

Dans ce type de difficulté, l'IA sera assez facile.

Elle se repose sur des algorithmes purement aléatoire.  
On note l'arrivée d'une petite intelligence.

Voyons en détails les étapes et vérifications qu'elle suit:

- Choisi une ligne aléatoire
- Choisi une colonne aléatoire
- Vérifie le nombre de position disponibles en fonction des arrêtes sélectionnées (0, 1 ou 2)
   - Si 0, recommence toutes les étapes
   - Si 1, sélectionne l'arrête
   - Si 2, exécute une recherche sur le score potential après ajout
      - Calcule le nombre de points que rapporte l'arrête horizontale
      - Calcule le nombre de points que rapporte l'arrête verticale
      - Sélectionne l'arrête qui rapporte le plus de points
- Fin de l'algorithme

#### Moyen

#### Difficile

<a href="{{ site.baseUrl }}game/about/" class="btn btn-green">Chapitre suivant: Jeu</a>
