const width = window.innerWidth * 10;
const height = window.innerHeight * 10;
const left = (window.innerWidth - width) / 2;
const top = (window.innerHeight - height) / 2;

const _args = {
    //url: '',
    width,
    height,
    top,
    left,
    target: '_blank',
    popup: 'yes',
    //fullscreen: 'yes',
    location: 'no',
    menubar: 'no',
    status: 'no'
};

export default function openNewWindow (args = _args) {
    const {url, target, ...otherProps} = {..._args, ...args};
    const options = Object.keys(otherProps).map(key => `${key}=${otherProps[key]}`).join(', ');
    const uri = `${process.env.PUBLIC_URL}${url}`.trim();
    const wd = window.open(uri,
        target,
        options,
    );
    window.addEventListener('beforeunload', () => {
        if(!wd.closed) wd.close();
    });
    return wd;
}