const date = require("date-and-time");
const random = require("random")

const getCasesPerDay = (startCases, span, growthCoef) => {
    const cases = (startCases * growthCoef - startCases) / span;
    return cases;
};

const dateCasesNumberGenerator = ({
    growthCoef = 2.5,
    startCases = 4,
    span = 7,
    startDate = new Date(2020, 2, 9),
} = {}) => {
    const now = new Date();
    const cases = [
        {
            date: startDate,
            number: startCases,
        },
    ];
    let daysPassed = 0;
    let casesPerDay = getCasesPerDay(startCases, span, growthCoef);
    let totalCases = startCases;

    while (true) {


        totalCases += casesPerDay;

        if (daysPassed % Math.round(span) === 0 && daysPassed !== 0) {
            casesPerDay = getCasesPerDay(totalCases, span, growthCoef);
        }

        const mu = casesPerDay
        const sigma = casesPerDay * 0.2
        const normalDist = random.normal(mu, sigma)
    
        daysPassed++;
        const newDate = date.addDays(startDate, daysPassed);
        const newCase = {
            date: newDate,
            number: Math.round(normalDist()),
        };

        cases.push(newCase);

        if (date.isSameDay(now, newDate)) {
            break;
        }
    }
    // console.log(totalCases + casesPerDay)
    return cases;
};

module.exports = dateCasesNumberGenerator;
