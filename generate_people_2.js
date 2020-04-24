const fs = require("fs");
const path = require("path");
const date = require("date-and-time");
const random = require("random")

const {
    randomIntInRange,
    randomMaleName,
    randomFemaleName,
    randomDisease,
    regionGenerator,
    ageGenerator,
} = require("./utils");


const totalData = []
const datesCasesGenerator = require("./dates_cases_generator.js");
const dates = datesCasesGenerator();
const totalCases = dates.reduce((a, b) => a + b.number, 0);

let deathCount = 0;
let chronicDeaseseCount = 0;

const deathPercent = 0.05;
const chronicDeasesePercent = 0.05;

const totalDeaths = Math.round(totalCases * deathPercent);
console.log(totalDeaths, totalCases)
const totalWithChronicDisease = Math.round(totalCases * chronicDeasesePercent);

const generateUserData = (startDate) => {
    const data = []
    const now = new Date();
    const daysSinceInfected = Math.ceil(date.subtract(now, startDate).toDays());

    const gender = randomIntInRange(0, 2) === 1 ? "M" : "F";
    const name = gender === "M" ? randomMaleName() : randomFemaleName();
    const age = ageGenerator();
    const region = regionGenerator();


    const daysToRecoverMean = 7
    const daysToRecoverDeviation = 4
    const recoverDayDistributed = random.normal(daysToRecoverMean, daysToRecoverDeviation)()


    const user = {
        gender,
        name,
        age,
        region,
        status: "mild_conditions",
    };

    const chance = Math.random()

    if (
        chance > 0.8 &&
        chronicDeaseseCount < totalWithChronicDisease
    ) {
        user.chronic_disease = randomDisease()
        chronicDeaseseCount++
    } else {
        user.chronic_disease = null
    }

    for (let daysPassed = 0; daysPassed < daysSinceInfected; daysPassed++) {


        // generate each case
        const currDate = date.addDays(startDate, daysPassed + 1);
        const chance = Math.random();

        user.date = currDate
        


        if (
            user.status !== "dead" &&
            chance < 0.05
        ) {
            user.status = "critical"
        }

        if (
            user.status !== "dead" &&
            daysPassed > recoverDayDistributed   
        ) {
            user.status = "recovered"
        }

        if (
            age > 45 &&
            chance > 0.9 &&
            deathCount < totalDeaths &&
            daysPassed > 4 &&
            user.status !== "dead" &&
            user.status !== "recovered"
        ) {
            user.status = "dead";
            deathCount++;
        }

        data.push({ ...user });
    }
    totalData.push(...data)
};

for (let i = 0; i < dates.length; i++) {
    const startDate = dates[i].date;
    const numberOfCases = dates[i].number;

    for (let y = 0; y < numberOfCases; y++) {
        generateUserData(startDate);
    }
}

// console.log(totalData)
fs.writeFileSync(path.resolve(__dirname, "data", "people_2.json"),  JSON.stringify(totalData))