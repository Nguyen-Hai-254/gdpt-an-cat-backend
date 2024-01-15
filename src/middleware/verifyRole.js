export const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user) {
            return res.status(401).json('Token is valid')
        }
        const rolesArray = [...allowedRoles];
        const result = rolesArray.includes(req.user.role);
        if (!result) {
            return res.status(403).json('You are not authorized to do this')
        }
        next();
    }
}