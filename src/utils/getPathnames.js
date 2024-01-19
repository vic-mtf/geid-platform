const getPathnames = input => {
    const paths = input.startsWith('http') ? (new URL(input)).pathname : input;
    return paths.split('/').filter(Boolean);
};

export default getPathnames;
