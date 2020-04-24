const fs = require("fs");
const path = require("path");
const dateLib = require("date-and-time");
const random = require("random");

const {
    randomIntInRange,
    randomMaleName,
    randomFemaleName,
    randomDisease,
    regionGenerator,
    ageGenerator,
} = require("./utils");

const datesCasesGenerator = require("./dates_cases_generator.js");
const cases = datesCasesGenerator();
const { transformArrayRandomly } = require("./randomness.js");
const infectedPeopleCount = cases.reduce((a, b) => a + b.number, 0);

const addChronicDisease = (people) => {
    const minimumAge = 55;
    const chronicDiseasePercent = 0.01;
    const totalPeopleWithDisease = Math.round(
        chronicDiseasePercent * people.length
    );

    let peopleWithDiseaseCount = 0;


    return people.map((human) => {
        const { age } = human;

        if (
            peopleWithDiseaseCount < totalPeopleWithDisease &&
            age >= minimumAge
        ) {
            peopleWithDiseaseCount++;
            return Object.assign({}, human, {
                chronic_disease: randomDisease(),
            });
        }

        return Object.assign({}, human, { chronic_disease: null });
    });
};

const addDeath = (people) => {
    const deathPercent = 0.5;
    const totalDeadPeople = Math.round(deathPercent * people.length);
    let deadPeopleCount = 0;
    let transformedPeople = people

    const transform = transformArrayRandomly(people, (human, index) => {
        const minimumAge = 65;
        const { age } = human;
        if (age > minimumAge) {
            deadPeopleCount++
            return Object.assign({}, human, {
                status: "dead",
            });
        } else {
            return human
        }

    })

    while(true) {
        transformedPeople = transform.next()

        if (transformedPeople.done || deadPeopleCount === totalDeadPeople) {
            break
        }
    }

    return transformedPeople.value
};

// cases.forEach(({ date, number }) => {
//     const newCases = []
//     for (let i = 0; i < number; i++) {

//         // set conditions for new cases

//         newCases.push({ date, name, gender, age, region });
//     }

//     uniqueCases.push(...newCases)

//     const oldCases = uniqueCases.map((cs) => Object.assign({}, cs, { date }));
//     totalCases.push(...oldCases, ...newCases)
// });

const generatePeople = (peopleCount) => {
    let infectedPeople = [];

    for (let i = 0; i < peopleCount; i++) {
        const gender = randomIntInRange(0, 2) === 1 ? "M" : "F";
        const name = gender === "M" ? randomMaleName() : randomFemaleName();
        const age = ageGenerator();
        const region = regionGenerator();

        infectedPeople.push({
            gender,
            name,
            age,
            region,
        });
    }

    return addDeath(addChronicDisease(infectedPeople));
};

console.log(
    generatePeople(10).filter((p) => p.status === "dead").length
);

// const generateStatus = (people = []) => {
//     let augmented = []
//     let deathCount = 0
//     let chronicDiseasesCount = 0
//     const totalCases = people.length;
//     const deathPercent = 0.05;
//     const chronicDiseasePercent = 0.01;
//     const deathCases = Math.round(totalCases * deathPercent);
//     const chronicDiseaseCases = Math.round(totalCases * chronicDiseasePercent);

//     augmented = people.map((cs) => {
//         const { age, gender, date } = cs;
//         const chance = Math.random();
//         const status = "dead";
//         const augmentCase = { ...cs };

//         if (deathCount < deathCases && age > 55 && dateLib.subtract(new Date(), date).toDays() < 7) {
//             deathCount++;
//             if (chance > 0.4 && gender === "F") {
//                 if (chance > 0.7) {
//                     chronicDiseasesCount++;
//                     return { ...cs, status, chronic_disease: randomDisease() };
//                 }
//                 return { ...cs, status };
//             }
//             return { ...cs, status };
//         }

//         if (chronicDiseasesCount < chronicDiseaseCases) {
//             chronicDiseasesCount++;
//             augmentCase.chronic_disease = randomDisease();
//         }

//         if (chance < 0.05) {
//             return { ...augmentCase, status: "critical" };
//         }

//         if (chance < 0.1 && dateLib.subtract(new Date(), date).toDays() > 15) {
//             return { ...augmentCase, status: "recovered" };
//         }

//         return { ...augmentCase, status: "mild_condition" };
//     });

//     return augmented;
// };

// const allCases = generateStatus(uniqueCases);

// const writeStream = fs.createWriteStream(
//     path.resolve(__dirname, "data", "people.json")
// );

// writeStream.write("[");

// for (let i = 0; i < allCases.length; i++) {
//     if (i !== allCases.length - 1) {
//         writeStream.write(JSON.stringify(allCases[i]));
//         writeStream.write(",");
//     } else {
//         writeStream.write(JSON.stringify(allCases[i]));
//     }
// }

// writeStream.write("]");
