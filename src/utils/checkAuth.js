export default function checkAuth (auth, permissions=[]) {
    let validate = auth?.name === 'admin' || permissions?.length === 0;
    console.log(validate);
    if(!validate)
        permissions.forEach(permission => {
            const privileges = auth?.privileges;
            if(privileges?.map(({ app }) => app)?.includes(permission))
                validate = true;
        });
    return Boolean(validate);
}