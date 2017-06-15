# Très difficile

#### Intro

Lorsque nous utilisons le mot 'jeu' dans un contexte d'Intelligence Artificielle nous ne l'utilisons pas dans le sens 'loisir', nous le définirons plutôt ainsi :

Un environnement dans lequel des agents s'affrontent ou coopèrent sur des tâches particulières selon des critères spécifiques de manière plus explicite, dans notre cas un agent sera un joueur, la tâche principale de remporter le jeu (obtenir plus de carrés que l'adversaire à l'état grille pleine), enfin les critères seront simplement les règles du jeu.


#### Caractéristiques du jeu

Pour une Intelligence Artificielle ou un humain il est évident que ce qui détermine les actions des joueurs est la règle du jeu : 

Quel est le but de la partie? 

Combien de joueurs participent? 

Jouent-ils simultanément? 

Quelles sont les actions autorisées ou non? 

Et autant d'éléments venant influencer la stratégie de jeu. Afin de modéliser correctement notre IA il nous faut donc tout d'abord bien définir et caractériser ce jeu du carré :

- 2 joueurs jouant tour à tour (une seule action par tour + rejouer à la complétion d'un carré)
- Information complète, tout est connu par les 2 joueurs
- Jeu à somme nulle (le gain du joueur A et égal à la perte du joueur B et réciproquement)

#### Conséquences stratégiques

Etant donné les règles du jeu il est évident qu'une stratégie basée sur le hasard serait peu performante.

Ici nous baserons notre réflexion sur le comportement de l'adversaire, le jeu se jouant tout à tour, les 1ères stratégies qui nous viennent en tête sont « fermer un carré dès que possible », ou alors « toujours empêcher l'adversaire de fermer un carré », ou encore de manière prophylactique « ne jamais construire l‘avant dernier côté d’un carré ».

Aussi intuitives qu’elles peuvent paraître ce sont des stratégies performantes puisque le but est de marquer plus de carrés que l'adversaire, cependant il nous faudra la pousser plus loin que le simple fait de jouer par réaction au coup par coup. 	

En effet, à l'instar d'une partie de dames ou d'échecs, pour maximiser nos chances de gain nous devrons prévoir les coups possibles à venir afin de prendre les meilleures décisions de jeu. 

Pour modéliser cela sur le plan mathématique nous utiliserons ici un graph.

#### Méthodologie

Une fois les règles du jeu en tête la tâche fondamentale pour la création d'une Intelligence Artificielle est de convertir notre description verbale de « ce qu'il y a à faire pour placer le meilleur coup » en une description formelle compréhensible et utilisable par un ordinateur, c'est la Définition Formelle.

C'est une étape très importante car cela conditionnera la facilité et la qualité de conception de notre IA par la suite. Notre méthodologie consistera à utiliser les éléments suivants :

  - Une liste finie d'états; Où un état correspond à une configuration possible de la grille de jeu.
  - Une liste finie d'agents; Simple dans notre cas, toujours au nombre de 2, humain Vs machine ou machine1 Vs machine2.
  - Une liste finie d'actions; Ici aussi assez simple car il n'y qu'une seule action possible, « s'attribuer un segment vide ».
  - Une fonction de transition; Celle-ci retournera l'état de la grille à partir de l'état précédent et de l'action jouée.
  - Une fonction de test terminal; Qui retournera simplement un booléen témoin du remplissage complet de la grille.
  - Une fonction de score; Qui évaluera le gain potentiel d’un coup à travers les coups suivants envisageables.

Tous ces éléments serviront à la construction et au parcours de notre graph de décision.

#### Liste d'états

Comme mentionné dans notre méthodologie, un élément important de notre IA est une liste des états du jeu, nous devons donc réfléchir à comment définir un état de façon informatique.

Nous avons dit qu'un état était une représentation à un instant T de la grille de jeu, ce qui est assez simple à représenter par une matrice, cependant nous aurons aussi besoin d'informations complémentaires telles que « à qui est-ce le tour de jouer », « est-ce la fin du jeu », etc.

Par conséquent, le plus approprié à notre sens serait de créer une classe « Etat » depuis laquelle chaque état spécifique serait instancié. Enfin, pour des raisons de performance évidentes il serait appréciable d'avoir un constructeur par copie pour passer d'un état à un autre plutôt que de devoir créer notre instance depuis zéro à chaque coup joué.


#### Agent AI

D'une manière générale lorsque l'on parle d'IA on s'intéresse toujours à sa capacité à jouer « le meilleur coup possible », cependant ici nous créerons plusieurs niveaux de difficultés allant du plus simple jouant au hasard au plus complexe que vous ne pourrez jamais battre. 

Nous utiliserons une classe AI permettant donc d'instancier des joueurs de type machine.

Le plus important, l'agent AI doit pouvoir prendre une décision sur le coup à jouer, c'est la résultante du parcours de notre graph. 

Nous utiliserons une fonction MiniMax pour cela (algorithme que nous expliquerons en détail par la suite) qui prendra en paramètre un état et retournera un nombre. Il nous restera plus qu'à notifier notre AI lorsque c'est son tour de jouer.


#### Algorithmie

Après notre présentation stratégique et méthodologique il est temps de s'attaquer réellement au coeur de notre IA. Notre fonction score est notre façon de mesurer le bénéfice de jouer telle ou telle action. 

De façon basique, notre IA interrogera notre fonction ainsi : "Est-ce que cette action me donne un score important ou au contraire faible?".

Nous avions donc établi pour méthode de construire un arbre décrivant les différentes configurations de la grille de jeu pour chaque coup possible jusqu'à la complétion de cette dernière et nous avions parlé d'utiliser l'algorithme Minimax pour le parcourir. 

Cette algorithme adapté aux jeux à somme nulle comme le notre se base sur le fait que tour à tour le joueur va essayer de maximiser ses chances tandis que l'adversaire lui tentera de les minimiser.

En voici un exemple illustré :

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/benoitcompere/image/upload/v1497526301/exhaustive_graph.png"
     alt="Exhaustive graph"
     title="Arbre de décision idéal">

Ici on détermine toutes les possibilités de jeu jusqu’à la fin de la partie et nous pouvons donc déterminer à l’issue du dernier coup s’il s’agit d’une victoire ou d’une défaite.

On peut par exemple en déduire visuellement ici que dans le cas où le 1er joueur choisirai la branche gauche il s’assure la victoire et ce quels que soient après cela les coups de son adversaire.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/benoitcompere/image/upload/v1497526301/bottom_up_info.png"
     alt="Bottom-up info"
     title="Bottom-up info">

Si nous avons pu en déduire un coup idéal en visualisant l’ensemble des scenari de fin de partie comment faire concrètement  remonter l’information depuis cet état terminal jusqu’à ce qui nous intéresse réellement : le coup immédiat à jouer.

Soit le nœud racine affecté d’un index 0, sa 1ère génération d’un index 1, etc, jusqu’ici la 4e d’un index 4. Les nœuds pairs seront des nœuds Max et a contrario les noeuds impairs seront des nœuds Min. 

La méthodologie consiste à remonter l’information depuis les feuilles jusqu’à la racine sachant qu’un nœud de type Min prendra toujours la plus petite valeur de ses enfants et qu’un nœud de type Max lui prendra toujours la valeur maximale parmi eux.

En parcourant visuellement ce graph on constate bien que l’avant dernière génération retient bien le pire des cas en priorité puisque correspondant à un coup adverse alors que la génération précédente est affectée du meilleur des cas puisque correspondant à notre tour de jeu.

Cependant une recherche exhaustive jusqu'à complétion totale de la grille est rarement possible dans un temps de calcul acceptable, c'est pourquoi nous limiterons notre arbre à 4 générations et utiliserons une fonction d'évaluation affectant des scores à chaque noeud afin de prendre une décision raisonnable.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/benoitcompere/image/upload/v1497526301/minimax_algo.png"
     alt="Minimax algorithm"
     title="Algortihme du minimax">

L’atteinte de l’état terminal dans notre graph étant rarement possible c’est ici que notre fonction de score viendra étiqueter nos feuilles d’une valeur témoin du bénéfice stratégique à jouer tel ou tel coup. 

Puis de la même manière on fera remonter l’information récursivement jusqu’à la racine afin de décider du coup à jouer.

Ici il est évident que plus la recherche sera profonde plus notre décision de jeu sera juste. 

C’est pourquoi à des fins d’optimisation, nous utiliserons un élagage Alpha-Beta, procédure venant améliorer notre algorithme minimax en se débarrassant des branches présentant un score non pertinent.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/benoitcompere/image/upload/v1497526301/alpha_beta_prunning.png"
     alt="Alpha Beta prunning"
     title="Elagage alpha beta">

En effet, lors de la phase de parcours récursif visant à remonter l’information, il est assez simple de définir une valeur seuil parmi les nœuds frères et de ne pas explorer les sous-graphs dans le cas où leur valeur résiduelle sera de toute manière ignorée (en fonction du type de nœud parent). 

Ce gain de performance nous permettra d’explorer une plus grande profondeur de notre arbre.

Par exemple, ici une coupure se produit en A car dans le cadre d’un parcours en profondeur nous avons déjà en connaissance la valeur du nœud min de 10. 

Le parent étant un nœud max on pose alpha > 10. Ici le 2nd nœud min a la possibilité de prendre la valeur 9 dès l’exploration de son 1er enfant. 

Nul ne sert de continuer, on parle de coupure alpha.

De la même façon une coupure se produit en B car nous avons un nœud max de valeur 10 avec un parent de type min. 

Nous posons beta < 10. Le second nœud max a la possibilité de prendre un score de 14 encore une fois il est inutile de poursuivre. Ici il s’agit d’une coupe beta.

Notons que l’arbre parcouru grâce à cette optimisation est ici représenté en gras. Un simple minimax aurait lui parcouru l’ensemble du graph.

Il existe sur le plan mathématique d’autres procédés d’améliorations de notre parcours de graph encore plus perfectionnés tels que le NegaScout (ou Principal Variation Search), le MTD-f, ou encore le Monte-Carlo, et même l’utilisation de tables de transposition. Cependant, leur étude et implémentation auraient été trop chronophages au regard de la date de rendu des projets.

Pour en revenir à ce qui va être déterminant dans l’intelligence de notre machine c’est évidemment notre fonction de score. En effet, nos graphs étant heuristiques il nous faut définir précisément ce qui qualifie un coup joué de bon ou mauvais.

Une spécificité de notre jeu est le fait de pouvoir rejouer à la complétion d'un carré. C'est un avantage primordial car sur le plan stratégique, quelle que soit l'action envisagée elle pourra toujours être réalisée après avoir compléter un carré.
	
Au-delà de la stratégie de jeu performante au sens mathématique, cela permettra de plus de limiter le temps de recherche car ainsi nous pourrons démarrer un nouvel arbre minimax à la suite.

Pour ce qui est des scores attribués aux différentes positions, plusieurs possibilités sont envisageables en fonction du niveau d’expertise de la machine envisagé, depuis le mode aléatoire, au simple comptage des points, en passant par l’attribution de coefficients aux segments, etc. 

Notre choix de stratégie sera le suivant ; Nous attribuerons les scores de la façon suivante :

  - Possibilité de compléter un carré -> 1000
  - Possibilité  de jouer le 2e segment d’un carré -> 100
  - Possibilité  de jouer le 1e segment d’un carré -> 10
  - Possibilité  de jouer le 3e segment d’un carré -> 1

Il y a certainement possibilité de qualifier plus finement les différentes actions possibles et de produire une IA encore plus perfectionnée mais malheureusement mon étude humaine des critères stratégiques de ce jeu a elle aussi ses limites ;)

#### Choix du langage de programmation

Lorsque l’on parle d’IA le 1er langage qui nous vient généralement en tête c’est python pour sa syntaxe lisible et ses nombreux modules dédiés. Cependant, ayant pris le parti de développer une interface de jeu sur un navigateur web, et l’implémentation d’un algorithme de parcours en profondeur n’étant pas la mission la plus difficile qui soit, nous avons opté pour le langage Javascript.

Nous aurions pu le développer en C pour des questions de performance mais de cette façon nous avons l’ensemble de notre projet (interface graphique et AI) au sein de la même application exécutable immédiatement par n’importe quel navigateur web sans avoir à interfacer quoi que ce soit.

#### Difficultés rencontrées

Bien que passionnantes, les lectures mathématiques nécessaires au préalable à la réalisation d'une telle Intelligence Artificielle ont été très chronophages.

C'est pourquoi, pris par le manque de temps nous n'avons pu conclure le développement de cette super IA.

Cependant, l'ensemble du code relatif à la création du graph reprenant les différents états, la fonction de score affectant un coefficient de bénéfice à chaque noeud, ainsi que l'algorithme minimax parcourant notre arbre à la recherche du meilleur coup sont réalisés.

Seule la finalisation, c'est à dire la phase de tests et debug nous a manqué.
