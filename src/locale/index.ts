export function getCardName(cardName: string) {
    let name = cardName

    switch (name.toLowerCase()) {
        case "institute":
            name = "Институт"
            break
        case "school":
            name = "Школа"
            break 
        case "friends":
            name = "Друзья"
            break
        case "cap":
            name = "Кепка"
            break
        case "raincoat":
            name = "Дождевик"
            break
        case "boots":
            name = "Ботинки"
            break
        case "jacket":
            name = "Куртка"
            break
        case "exercises":
            name = "Зарядка"
            break
        case "gym":
            name = "Спортзал"
            break
    }
    return name
}