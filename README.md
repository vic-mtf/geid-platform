# GEID Login App

## Description

L'application **GEID Login** est un module d'authentification autonome, développé pour gérer l'accès sécurisé aux services privés de la plateforme GEID (Gestion Électronique de l'Information et des Documents). Elle constitue une porte d’entrée vers les fonctionnalités sensibles telles que l’archivage, la gestion des documents confidentiels et l’administration des utilisateurs.

Ce composant est conçu comme une **application frontale dédiée**, développée avec **React** et **Vite**, et interconnectée avec le backend d’authentification principal de GEID via des API sécurisées.

## Objectifs

- Permettre aux utilisateurs de se connecter de manière sécurisée avec validation des identifiants.
- Gérer les sessions, redirections, et niveaux d’accès en fonction des rôles.
- Intégrer une logique de vérification (authentification, erreurs, expirations).
- Offrir une interface simple, intuitive et conforme aux normes UX.

## Fonctionnalités

- Formulaire de connexion : champ email / mot de passe avec validation.
- Gestion des erreurs d’authentification (utilisateur inconnu, mot de passe incorrect...).
- Redirection automatique vers les modules privés après connexion.
- Affichage des messages contextuels (accès restreint, session expirée).
- Intégration à une API d'authentification (token, refresh, etc.).
- Option de déconnexion sécurisée.
