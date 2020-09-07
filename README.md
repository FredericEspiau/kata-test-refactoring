# Stated Outcome Assertion

Façon de dire exactement quel est le résultat sans passer la valeur attendue comme argument

Exemples typiques:
- `assertTrue(aBooleanExpression)` va fail si l'expression est `falsy`
- `assertNotNull(anObjectReference)` va fail si l'expression est pas un `object`

http://xunitpatterns.com/Assertion%20Method.html#Stated%20Outcome%20Assertion

# Single Outcome Assertion

Assertion qui se déroule toujours de la même manière

Typiquement utilisé pour écrire une assertion `fail`

- utile dans le cas d'un test qu'on a pas fini d'écrire `Unfinished Test Assertion`
- dans un `try`, quand on s'attend à ce que le `try` échoue mais qu'il ne le fait pas

http://xunitpatterns.com/Assertion%20Method.html#Single%20Outcome%20Assertion

# Du coup

```ts
expect("Invoice should have 1 item").not.toEqual("Invoice should have 1 item");
```

to

```ts
failWithText("Invoice should have 1 item");
```

# Ensuite

Pourquoi autant d'assertions sur le LineItem ?

Du coup on créé un `Expected object`

# Step 3

on fait une assertion sur cet object

# Step 4

on supprime la condition dans le test ``Conditional test logic`` à l'aide de `Guard Assertion`

http://xunitpatterns.com/Conditional%20Test%20Logic.html
http://xunitpatterns.com/Guard%20Assertion.html

on supprime le `if` pour mettre un 

```ts
expect(lineItems.length).toBe(1);
```

# Step 5

On peut rendre l'assertion plus simple encore

L'assertion c'est: il n'y a qu'un item et qu'il a cette valeur là

on fait son propre matcher avec https://jestjs.io/docs/en/expect

# Step 6

Le teardown est pas secure, si le premier statement fail, les autres vont pas être exécutés !

```ts
finally {        
   try {            deleteObject(invoice);         } 
finally {            
try {               deleteObject(product);            } 
finally {               
try {                  deleteObject(customer);               } 
finally {                  
try {                     deleteObject(billingAddress);                  } 
finally {                     deleteObject(shippingAddress);                  }               }            }         }
```

C'est un ``Complex Teardown``

solution, mettre les objets dans une liste

# Step 7

Supprimer les initializations à null devenues inutiles

# step 8

on peut mettre les créations d'objets dans des fonctions de création d'objets

# Step 9

Quels stubs sont vraiment indispensables pour le test ?

il faut virer les valeurs parasites

Autre problème, les données sont insérée en base de données
du coup on peut avoir des tests non répétables
si on exécute les tests en parallèle par exemple

on doit donc faire en sorte de générer un objet unique à chaque itération

``Anonymous Method Creation``

# Step 10

Y'a certaines valeurs dont on se fiche toujours, autant les ignorer complètement

de cette manière, c'est clair qu'on a pas besoin des adresses

# Step 11

On s'occuper des hard coded values

# Step 12

Mais d'où vient le ExtendedPrice ?

On va écrire son calcul complet pour que le lecteur ne se pose pas de question

# Step 13

c'est maintenant facile de créer de nouveaux tests à partir de celui là

# Step 14

et là on se rend compte qu'on peut maintenant refacto entre plusieurs tests

on peut ensuite extraire les fnoctinos pour les réutiliser dans d'autres fichiers de tests