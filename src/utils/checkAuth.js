export default function checkAuth (authArray, permissions) {
    let validate = false;
    authArray?.forEach(auth => {
        const permission = permissions[auth];
        if(permission?.read || permission?.write)
            validate = true;
    });
    return validate || authArray?.length === 0;
}