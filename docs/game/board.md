# Plateau

Nous allons voir comment a été conçu le plateau de jeu.

#### Contraintes Front-End

Notre application Square est réalisée en AngularJS/HTML5/LESS.

Nous sommes très fiers du résultat obtenu.

C'est beaucoup plus agréable à utiliser qu'une console et c'est performant.

Cependant, le plateau n'a pas était si simple à concevoir.  

#### Structure

Il fallait que chaque arrête et chaque carré soit un noeud dans le DOM afin de pouvoir interagir avec lui et bien entendu l'afficher.

La première étape consiste donc à créer un tableau équivalent au nombre de lignes et au nombre de colonnes de la configuration.

**Exemple:** si la configuration fait 8 lignes et 8 colonnes, alors le tableau sera de 8 lignes contenant chacunes 8 colonnes.

#### Contenu d'une case

Chaque case du tableau est un objet JSON.

Cet objet contient plusieurs clés qui vont nous permettre d'afficher une arrête horizontale, une arrête verticale et un carré.

D'autres clés vont servir à déterminer si les arrêtes sont sélectionnées, si oui, par qui, et également déterminer si le carré est complété et si oui par qui.

Grâce au `view-model` d'Angular, ces informations vont permettre de changer la couleur des éléments du Front automatiquement.

#### Sélection d'une arrête

Vu qu'une arrête est un noeud du Front, nous pouvons lui associer un `ng-click`.

Cette fonction ne sera disponible qu'au tour de jeu de l'utilisateur et va sélectionner l'arrête.

Au final, nous allons simplement mettre à jour les informations sur l'objet qui contient l'arrête.

Cela aura pour résultat de la sélectionner (visuellement).

#### Réalisation d'un carré

Si nous suivons cette logique d'arrête, une case du plateau est donc un objet qui contient une arrête horizontale et une arrête verticale.

Comment sélectionner le carré ?

Et bien, il faut regarder si il existe une colonne à `n + 1` qui possède une arrête verticale sélectionnée.

Si oui, alors nous pouvons regarder si il existe une ligne à `n + 1` qui possède une arrête horizontale sélectionnée.

Visuellement, nous aurons donc un carré de quatre arrêtes.

Il ne reste plus qu'à modifier l'objet JSON pour lui dire que telle personne a terminé le carré.

Le Front sera alors mis à jour et le carré sera de la couleur du joueur ayant terminé ce carré.

#### Conclusion

La logique peu sembler un peu tordu, mais cela fonctionne très bien.

C'est comme du WYSIWIG, le plateau qui est affiché est celui que nous manipulons.

Bien entendu, ce n'est qu'un résumé de ce qu'est la structure du plateau, nous ne détaillons pas précisément comment tout fonctionne du côté JS et HTML.

C'est une contrainte Front-End pour laquelle nous n'avons pas trouvé d'alternative plus optimisée.

<a href="{{ site.baseUrl }}game/init/" class="btn btn-green">Chapitre suivant: Initialisation</a>
