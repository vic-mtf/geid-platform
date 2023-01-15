export default function download ({url, name}) {
        const link = document.createElement('a');
        const _name = name && name?.toString().toLowerCase().replace(/\s+/,'_');
        link.href = url;
        link.download = url || _name;
        link.click();
}