import _archive_image from '../../../assets/pub_image_archives.webp';
import _film_image from '../../../assets/pub_image_film.webp';
import _library_image from '../../../assets/pub_image_library.webp';
import _photo_image from '../../../assets/pub_image_photo.webp';
import _manager_image from '../../../assets/pub_image_manager.webp';
import _product_image from '../../../assets/pub_image_product.webp';

const pubLits = [
    {
        title: 'Archives',
        src: _archive_image,
        accessMode: 'private',
        href: '/app/archives',
        redirectTo: '/login',
        content: `
        L’ensemble des techniques et moyens employés pour recueillir,
        classer, conserver et exploiter des documents dès leur création`,
        message: `
        Vous n'êtes pas connecté à Geid pour avoir accès aux contenus du service d'archivage.
        Connectez-vous et réessayez à nous pour la visualisation de la section.
        `,
    },
    {
        title: "Bibliothèque",
        src: _library_image,
        accessMode: 'public',
        href: '/app/medialibrary/books',
        content: `
        Collection d’ouvrages susceptibles d’édifier les experts du ministère sur leur
        travail quotidien et toute la communauté nationale sur la place du Ministère du
        Budget`,
    },
    {
        title: "Filmothèque",
        src: _film_image,
        accessMode: 'public',
        href:"/app/medialibrary/films",
        content: `
            Collection des films documentaires professionnels et amateurs relative au
            domaine du Budget.`,
    },
    {
        title: "Photothèque",
        src: _photo_image,
        accessMode: 'public',
        href: '/app/medialibrary/pictures',
        content: `
        Collection des figures de proue du Ministère, des personnalités de référence  dans
        la production budgétaire et évènement mémorial au Ministère du Budget`,
    },
    {
        title: "Production & Publication",
        src: _product_image,
        accessMode: 'public',
        content: `
        Production: des bulletins périodiques sans oublier le recueil des actes de gestion.
        Publication: Diffusion, vulgarisation et dissémination des informations`,
    },
    {
        title: "Gestion de l'information",
        src: _manager_image,
        accessMode: 'public',
        content: `
        Processus d'organisation, traitement, controle, partage et conservation
        de l'information sous toute ses formes en vue d'une meilleure prise de
        décision au sein d'une institution.`
        // content: `
        // La gestion implique la capacité à organiser et contrôler la structure,
        // le traitement et la mise à disposition dans un format exploitable de l’information
        // de manière securisée`,
    }
];
export default pubLits;