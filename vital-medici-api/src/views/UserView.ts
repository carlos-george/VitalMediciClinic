import { User } from '../models/User';

export default {
    render(user: User) {

        const roleId = user.role ? user.role.id : '';

        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            datebirth: user.datebirth,
            role_id: roleId,
            role: user.role,
            isactive: user.isactive,
        };

    },
    renderMany(users: User[]) {
        return users.map(user => this.render(user));
    }
}