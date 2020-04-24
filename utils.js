const maleNames = require("./data/male_names.json");
const maleSurnames = require("./data/male_surnames.json");
const femaleNames = require("./data/female_names.json");
const femaleSurnames = require("./data/female_surnames.json");
const bigRegions = require("./data/big_regions.json");
const smallRegions = require("./data/small_regions.json");
const chronicDiseases = require("./data/chronic_deseases.json");

const randomIntInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

const randomMaleName = () => {
    const name = maleNames[randomIntInRange(0, maleNames.length)];
    const surname = maleSurnames[randomIntInRange(0, maleSurnames.length)];

    return `${name} ${surname}`;
};

const randomFemaleName = () => {
    const name = femaleNames[randomIntInRange(0, femaleNames.length)];
    const surname = femaleSurnames[randomIntInRange(0, femaleSurnames.length)];

    return `${name} ${surname}`;
};

const ageGenerator = () => {
    const chance = Math.random();

    if (chance > 0.7) {
        return randomIntInRange(60, 91);
    } else if (chance < 0.1) {
        return randomIntInRange(6, 18);
    } else {
        return randomIntInRange(18, 61);
    }
};

const randomDisease = () =>
    chronicDiseases[randomIntInRange(0, chronicDiseases.length)];

const regionGenerator = () => {
    const chance = Math.random();
    const sofia = { name: "София (столица)", id: "sofiia_stolitsa" };

    if (chance > 0.6) {
        return sofia;
    } else if (chance > 0.3) {
        return bigRegions[randomIntInRange(0, bigRegions.length)];
    } else {
        return smallRegions[randomIntInRange(0, smallRegions.length)];
    }
};

module.exports = {
    randomIntInRange,
    randomMaleName,
    randomFemaleName,
    randomDisease,
    regionGenerator,
    ageGenerator,
};
