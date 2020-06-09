export const getRandomHouse = async () => {
  const response = await fetch("https://www.potterapi.com/v1/sortingHat");
  const houseData = await response.json();
  return houseData;
};

export const getAdvice = async () => {
  const url = "https://api.adviceslip.com/advice";

  try {
    const response = await fetch(url, {
      cache: "no-cache",
    });
    const advice = await response.json();
    return advice;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSpells = async () => {
  const url =
    "https://www.potterapi.com/v1/spells?key=$2a$10$qrr46GleJRJDlrmt/wH4lubKz67jvDjOwTjpDGqCcXoV8MX9i5qNC";

  try {
    const response = await fetch(url);
    const spellsData = await response.json();
    return spellsData;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCharacters = async () => {
  const url =
    "https://www.potterapi.com/v1/characters?key=$2a$10$qrr46GleJRJDlrmt/wH4lubKz67jvDjOwTjpDGqCcXoV8MX9i5qNC";

  try {
    const response = await fetch(url);
    const charactersData = await response.json();
    const promises = charactersData.map((character) => {
      return {
        id: character._id,
        name: character.name,
        role: character.role,
        house: character.house,
        ministryOfMagic: character.ministryOfMagic,
        orderOfThePhoenix: character.orderOfThePhoenix,
        dumbledoresArmy: character.dumbledoresArmy,
        deathEater: character.deathEater,
        bloodStatus: character.bloodStatus,
        species: character.species,
      };
    });
    return Promise.all(promises);
  } catch (error) {
    console.log(error.message);
  }
};
