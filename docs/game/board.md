# Plateau

Nous allons voir comment a été conçu le plateau de jeu.

#### Contraintes Front-End

Notre application Square est réalisée en AngularJS/HTML5/LESS.

Nous sommes très fier du résultat obtenu.  
C'est beaucoup plus agréable à utiliser qu'une console et c'est performant.

Cependant, le plateau n'a pas était si simple à concevoir.  

#### Structure

Il fallait que chaque arrête et chaque carré soit un noeud dans le DOM afin de pouvoir interagir avec lui et bien entendu l'afficher.

La première étape consiste donc à créer un tableau équivalent aux nombre de lignes et colonnes de la configuration.

**Exemple:** si la configuration fait 8 lignes et 8 colonnes, alors le tableau sera de 8 lignes contenant chacunes 8 colonnes.

#### Contenu d'une case

Chaque case du tableau est un objet JSON.

Cet objet contient plusieurs clés qui vont nous permettre d'afficher une arrête horizontale, une arrête vertical et un carré.

D'autres clés vont servir à déterminé si les arrêtes sont sélectionnées, si oui, par qui, et également déterminé si le carré est compléter et si oui par qui.

Grâce au `view-model` d'Angular, ces informations vont permettre de changer la couleur des éléments du Front automatiquement.

#### Sélection d'une arrête

Vu qu'une arrête est un noeud du Front, nous pouvons lui associé un `ng-click`.

Cette fonction sera disponible qu'au tour de jeu de l'utilisateur et va sélectionné l'arrête.

Au final, nous allons simplement mettre à jour les informations sur l'objet qui contient l'arrête.  
Cela aura pour résultat de la sélectionnée (visuellement).

#### Réalisation d'un carré

Si nous suivons cette logique d'arrête, une case du plateau est donc un objet qui contient une arrête horizontale et une arrête verticale.

Comment sélectionné la carré ?

Et bien, il faut regarder si il existe une colonne à `n + 1` qui a une arrête verticale sélectionnée.

Si oui, alors nous pouvons regarder si il existe une ligne à `n + 1` qui a une arrête horizontale sélectionnée.

Visuellement, nous aurons donc un carré de quatre arrêtes.

Il ne reste plus qu'à modifier l'objet JSON pour lui dire que telle personne à terminé le carré.

Le front sera alors mise à jour et le carré sera de la couleur du joueur ayant terminé ce carré.

#### Conclusion

La logique peu semblée un peu tordu, mais cela fonctionne très bien.

Bien entendu, ce n'est qu'un vulgaire résumé de ce qu'est la structure du plateau, nous ne détaillons réellement comment tout fonctionne du côté JS et HTML.

C'est une contrainte Front-End pour laquelle nous n'avons pas trouvé d'alternative optimale.

<a href="{{ site.baseUrl }}game/init/" class="btn btn-green">Chapitre suivant: Initialisation</a>
