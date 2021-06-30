import { Role } from "../models/Role";

export default {

    render(role: Role) {
        return {
            id: role.id,
            name: role.name,
            description: role.description,
        }
    },
    renderMany(roles: Role[]) {
        return roles.map(role => this.render(role));
    },
}