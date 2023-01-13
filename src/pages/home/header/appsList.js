import _archives_logo from '../../../assets/archives_workbooks.webp';
import _media_logo from '../../../assets/5a229b479641b7.26338722151221741.webp';
import _arcives_server_logo from '../../../assets/kisspng-paper-drawer-archive-rin.webp';
import _group_speak_logo from '../../../assets/group_speak.webp';
import _checklist_logo from '../../../assets/kisspng-hand-stop-sign-symbol-cl.webp';
import _workspace_logo from '../../../assets/5a3636b951df37.87798883151350239.webp';

const appsList = [
    {
        name: 'Archives',
        src: _archives_logo,
        href: '/apps/archives',
        permissions: ['archives']
    },
    {
        name: 'Service d\'archivage',
        src: _arcives_server_logo,
        href: '/apps/archivingservice',
        permissions: ['archives']
    },
    {
        name: 'Lisolo na budget',
        src: _group_speak_logo,
        href: '/apps/lisolonabudget',
        permissions: []
    },
    {
        name: 'Service de censure',
        src: _checklist_logo,
        href: '/apps/censorshipservice',
        permissions: ['phototheque', 'bibliotheque', 'filmotheque'],
    },
    {
        name: 'Mediathèque',
        src: _media_logo,
        href: '/apps/medialibrary',
        permissions: [],
    }, 
    {
        name: 'Espace de personnel',
        src: _workspace_logo,
        href: '/apps/workspace',
        permissions: ['workspace'],
    }
];

export default appsList;