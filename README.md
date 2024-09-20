# Team Manager - Gestion d'Équipes

## Description

Ce projet est une application de gestion d'équipes développée avec **Vue.js** pour le frontend et **Node.js/Express** pour le backend. L'application permet aux utilisateurs de s'inscrire, se connecter, et gérer une équipe. Les fonctionnalités incluent la création d'une équipe, l'ajout de membres, la mise à jour de l'équipe, et la suppression d'équipes ou de membres. 

Les tests sont implémentés avec **Jest** pour les tests unitaires, et **Cypress** pour les tests End-to-End (E2E). Le projet intègre également un pipeline CI/CD avec **GitHub Actions** pour garantir l'intégrité du code à chaque commit.

---

## Fonctionnalités principales

### Gestion des équipes

1. **Inscription et Connexion** :
   - Les utilisateurs peuvent créer un compte, se connecter, et gérer leurs équipes.
   
2. **Création d'équipe** :
   - Les utilisateurs peuvent créer une équipe avec un nom et une description.
   
3. **Modification d'équipe** :
   - Les utilisateurs peuvent modifier le nom et la description de leur équipe.

4. **Ajout de membres** :
   - Les utilisateurs peuvent ajouter des membres à une équipe.

5. **Suppression d'équipe** :
   - Les utilisateurs peuvent supprimer une équipe.

6. **Suppression de membres** :
   - Les membres d'une équipe peuvent être retirés à tout moment.

---

## Technologies utilisées

### Frontend
- **Vue.js** : Framework JavaScript pour construire l'interface utilisateur.
- **Vue Router** : Pour la gestion des routes.
- **Vuex** : (optionnel) pour la gestion de l'état global de l'application.

### Backend
- **Node.js** : Exécution côté serveur.
- **Express.js** : Framework pour construire les API REST.
- **MongoDB** : Base de données NoSQL utilisée pour stocker les utilisateurs, les équipes, et les membres.
- **Mongoose** : ORM pour interagir avec MongoDB.

### Tests
- **Jest** : Pour les tests unitaires (backend et frontend).
- **Cypress** : Pour les tests End-to-End (E2E) du frontend.

### CI/CD
- **GitHub Actions** : Pour l'intégration continue et le déploiement continu (CI/CD).

---

## Installation

### Prérequis
- **Node.js** : Assurez-vous que Node.js est installé sur votre machine.
- **MongoDB** : MongoDB doit être installé localement ou disponible via un service cloud.

### Étapes d'installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/ton-utilisateur/team-manager.git
   cd team-manager
   ```

2. **Installer les dépendances** :
   - Frontend :
     ```bash
     cd frontend
     npm install
     ```

   - Backend :
     ```bash
     cd ../backend
     npm install
     ```

3. **Configurer la base de données** :
   Assurez-vous que **MongoDB** est en cours d'exécution localement ou utilisez un service cloud MongoDB.

4. **Configurer les variables d'environnement** :
   Créez un fichier `.env` dans le répertoire **backend** avec les configurations suivantes :

   ```bash
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/tournament-team-manager
   JWT_SECRET=your_jwt_secret
   ```

5. **Démarrer l'application** :

   - Frontend :
     ```bash
     cd frontend
     npm run serve
     ```

   - Backend :
     ```bash
     cd backend
     npm start
     ```

6. **Accéder à l'application** :
   L'application est disponible à l'URL suivante : `http://localhost:8080`.

---

## Tests

### Tests unitaires

- **Frontend (Vue.js)** :
  Les tests unitaires sont effectués avec **Jest**. Ils vérifient les fonctionnalités des composants Vue.js.
  
  Exécutez les tests unitaires :
  ```bash
  cd frontend
  npm run test:unit
  ```

- **Backend (Node.js)** :
  Les tests unitaires sur le backend utilisent **Jest** et **Supertest** pour tester les routes API.

  Exécutez les tests backend :
  ```bash
  cd backend
  npm run test:backend
  ```

### Tests End-to-End (Cypress)

Les tests End-to-End utilisent **Cypress** pour simuler les actions d'un utilisateur dans l'interface frontend.

- **Lancer Cypress en mode interactif** :
  ```bash
  cd frontend
  npm run test:e2e
  ```

- **Exécuter Cypress en mode CI** :
  ```bash
  cd frontend
  npm run test:e2e:run
  ```

---

## CI/CD avec GitHub Actions

Le projet est configuré avec un pipeline CI/CD utilisant **GitHub Actions**. Chaque commit ou pull request sur la branche **main** déclenchera :

- L'exécution des tests unitaires.
- Le lancement des tests End-to-End avec Cypress.
- La validation des fichiers de configuration et de style de code.

### Configuration du pipeline

Le pipeline est défini dans le fichier **.github/workflows/ci.yml** et peut être déclenché automatiquement ou manuellement via l'interface GitHub.

---

## Contribuer

1. **Forker le projet**.
2. **Créer une branche** :
   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   ```
3. **Faire des modifications**.
4. **Créer une pull request** vers la branche `main`.

---

## Licence

Ce projet est sous licence **MIT**. Veuillez consulter le fichier `LICENSE` pour plus de détails.

---
