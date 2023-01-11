import _carousel_image_watch from '../../../assets/carousel_image_watch.webp';
import _carousel_image_watch_small from '../../../assets/carousel_image_watch.webp';
import _carousel_image_archive from '../../../assets/carousel_image_archive.webp';
import _carousel_image_archive_small from '../../../assets/carousel_image_archive_small.webp';
import _carousel_image_books from '../../../assets/carousel_image_books.webp';
import _carousel_image_books_small from '../../../assets/carousel_image_books_small.webp';
import _carousel_image_lock from '../../../assets/carousel_image_lock.webp';
import _carousel_image_lock_small from '../../../assets/carousel_image_lock_small.webp';
import _carousel_image_pub from '../../../assets/carousel_image_pub.webp';
import _carousel_image_pub_small from '../../../assets/carousel_image_pub_small.webp';

const items = [
    {
        primaryUri: _carousel_image_watch,
        secondaryUri: _carousel_image_watch_small,
        title: "Gain de temps",
        description: `
        Geid permet un véritable gain de temps via un processus 
        de numérisation qui comprime le volume papier et permet d’accéder 
        rapidement au document recherché
        `,
    },
    {
        primaryUri: _carousel_image_books,
        secondaryUri: _carousel_image_books_small,
        title: "Bibliothèque",
        description: `
        La bibliothèque numérique propose de véritables collections de documents budgétaires,
        alimentées d'ouvrages à jour du Ministère.
        Le contenu est organisé pour en faciliter la consultation.
        `,
    },
    {
        primaryUri: _carousel_image_pub,
        secondaryUri: _carousel_image_pub_small,
        title: "Gestion des documents",
        description: `
        Faciliter la recherche ainsi que le partage sans pour autant accroître 
        la complexité de la procédure d’accès aux documents.
        `,
    },
    {
        primaryUri: _carousel_image_archive,
        secondaryUri: _carousel_image_archive_small,
        title: "Archives",
        description: `
        Geid, dans son volet archivage, recueille, classe et conserve le document quel que soit 
        son format (image, vidéo, etc...), en toute sécurité.
       `,
    },
    {
        primaryUri: _carousel_image_lock,
        secondaryUri: _carousel_image_lock_small,
        title: "Sécurité",
        description: `
        La sécurité de l'information demeure un enjeu majeur de garantie de fiabilité d'un système.
        Geid y répond.
        `,
    },

];

export default items;