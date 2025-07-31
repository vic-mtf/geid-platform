# GEID - Gestion Électronique de l'Information et des Documents

## Introduction

La Gestion Électronique de l’Information et des Documents (GEID) est une plateforme web développée avec **React** et **Vite**, dont la mission est de révolutionner la manière dont les institutions publiques gèrent, exploitent et diffusent leurs ressources documentaires. Elle a été pensée dans un contexte de transition numérique au sein du **Ministère du Budget**, pour faire face à l'explosion des volumes de données, la dispersion des supports, et le besoin croissant d’accessibilité rapide, sécurisée et centralisée à l'information stratégique.

## Objectif du projet

GEID vise à offrir un **écosystème documentaire complet**, permettant à une organisation publique ou privée de :

- Centraliser tous les documents textuels, visuels et audiovisuels.
- Organiser les contenus selon des logiques fonctionnelles (archives, bibliothèque, publications...).
- Sécuriser les accès via des rôles et permissions adaptés.
- Optimiser le temps de traitement documentaire et l’espace physique de stockage.
- Mettre en place un véritable patrimoine numérique institutionnel à long terme.

Ce projet s’inscrit dans une dynamique de **modernisation des administrations**, avec pour finalité une gestion transparente, structurée et durable de l’information.

## Modules fonctionnels

La plateforme GEID se compose de plusieurs modules autonomes et interconnectés :

### Archives

- Mode d'accès : **Privé**
- Description : Ce module regroupe l’ensemble des techniques destinées à recueillir, classer, conserver et exploiter les documents dès leur création. Il prend en charge divers formats (textes, vidéos, images, sons) et offre une conservation sécurisée à long terme.

### Bibliothèque

- Mode d'accès : **Public**
- Description : Elle propose une collection d’ouvrages et de publications utiles aux agents du ministère, mais aussi à la communauté nationale. Son contenu est mis à jour régulièrement et organisé par thématiques pour faciliter la consultation.

### Filmothèque

- Mode d'accès : **Public**
- Description : Ce module abrite des films documentaires (professionnels ou amateurs) liés aux activités budgétaires, servant à la valorisation institutionnelle et à la mémoire audiovisuelle.

### Photothèque

- Mode d'accès : **Public**
- Description : Elle regroupe des portraits officiels, des photographies d’événements historiques et des visuels emblématiques du Ministère du Budget. Une interface conviviale permet la recherche rapide par mots-clés.

### Production & Publication

- Mode d'accès : **Public**
- Description : Ce module centralise les bulletins périodiques, rapports d’activités, actes de gestion, circulaires et lois budgétaires. Il inclut les fonctions de diffusion et de vulgarisation.

### Lisolo Ba Budget

- Mode d'accès : **Public**
- Description : Outil collaboratif innovant permettant de travailler en équipe, d'organiser des réunions à distance et de partager des documents en temps réel. Il simplifie la coordination entre services administratifs.

## Fonctionnalités techniques

- Interface conditionnelle par **mode d’accès (privé/public)**
- Système sécurisé pour les données sensibles
- Organisation par catégories et indexation des contenus
- Mise à jour automatisée des bibliothèques et bases de données

## Installation du projet

### Prérequis

- Node.js (version recommandée : ≥ 16)
- pnpm installé globalement (`npm install -g pnpm`)

### Étapes

```bash
# Cloner le dépôt
git clone https://github.com/vic-mtf/geid-platform
cd geid

# Installer les dépendances avec pnpm
pnpm install

# Démarrer le serveur de développement
pnpm run dev
