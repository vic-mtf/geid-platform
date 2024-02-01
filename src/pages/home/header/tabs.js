import { Link } from "react-router-dom";

const tabs = [
    {
        label: 'Accueil',
        access: 'public',
        id: '_home',
    },
    {
        label: 'Mediathèque',
        access: 'public',
        id: '_medialibary',
        href: '/apps/medialibrary',
        component: 'a',
    },
    {
        label: 'Lisolo na budget',
        access: 'public',
        id: '_meeting',
        href: '/apps/lisolonabudget',
        component: 'a',
    }, 
    {
        label: 'Tableau de bord',
        access: 'private',
        id: '_dashboard',
        href: '',
        to: '/apps/dashboard',
        component: Link,
    }, 
    {
        label: 'Aide',
        access: 'public',
        id: '_help',
        disabled: true,
        href: '/help',
    }

];

export default tabs;