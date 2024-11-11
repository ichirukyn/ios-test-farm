export const getRoleByLevel = (level: number) => {
    switch (level) {
        case 1:
            return "Листовщик"
        case 2:
            return "Продавец"
        case 3:
            return "Администратор"
        default:
            return "Листовщик"
    }   
}