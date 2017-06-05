# Difficulté

#### De quoi il s'agit ?

Nous allons voir en détails les options disponibles pour configurer la difficulté de la partie.

#### Introduction

Chaque difficulté augmente la difficulté de l'IA.  

Pour chaque difficulté, des algorithmes différents sont utilisés.  
De plus, certaines difficultés ajoutent des vérifications supplémentaires pour rendre l'IA encore plus efficace.

En fonction des algorithmes et du nombre de contraintes à vérifier, la vitesse d'un tour de jeu par l'IA peu fortement variée.

**Note:** la taille de la grille a également un impact important sur la vitesse d'un tour.

#### Difficultés

Il existe trois types de difficultés:

- **Facile**
- **Moyen**
- **Difficile**

#### Facile

Dans ce type de difficulté, l'IA sera vraiment très facile.

Elle repose sur des algorithmes purement aléatoire.

Voyons en détails les étapes et vérifications qu'elle suit:

- Choisi une ligne aléatoire
- Choisi une colonne aléatoire
- Choisi une direction (arrête) aléatoire
- Vérifie que cette arrête n'est pas déjà sélectionnée par un joueur
   - Si déjà sélectionnée, recommence
   - Sinon, sélectionne l'arrête

#### Moyen

#### Difficile

<a href="{{ site.baseurl }}/game/about/" class="btn btn-green">Chapitre suivant: Jeu</a>
