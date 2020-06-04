
export const getRandomHouse = async () => {
    const response = await fetch('https://www.potterapi.com/v1/sortingHat')
    const houseData = await response.json()
    return houseData
}