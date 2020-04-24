const flightData = [
  {
    flightNumber: "az-543312",
    from: {
      country: "Iraq",
      city: "Baghdat",
      airfleet: "Mohhamed",
    },
    to: {
      country: "Bulgaria",
      city: "Sofia",
      airfleet: "Sofia Airport",
    },
    date: "12.12.2019 22:22:22",
    delayIn: 15,
    delayOut: 15,
    flightStatus: "crashed",
    company: "BulgariaAir",
    companyOrigin: "Bulgaria",
    passengers: [
      {
        id: 221321,
        name: "John",
        class: 2,
        ticketPrice: 234,
        buyingDate: "12.12.2019 22:22:22",
      },
      {
        id: 221321,
        name: "John",
        class: 2,
        ticketPrice: 234,
        buyingDate: "12.12.2019 22:22:22",
      },
      {
        id: 221321,
        name: "John",
        class: 2,
        ticketPrice: 234,
        buyingDate: "12.12.2019 22:22:22",
      },
    ],
  },
];

const simpleSetOfData = [
  {
    name: "john",
    age: 33,
    sex: "Male",
    city: "Washington",
  },
  {
    name: "john",
    age: 45,
    sex: "Male",
    city: "Sidney",
  },
  {
    name: "JohN",
    age: 75,
    sex: "Male",
    city: "Sidney",
  },
  {
    name: "Paul",
    age: 22,
    sex: "Male",
    city: "New York",
  },
  {
    name: "Maria",
    age: 45,
    sex: "Female",
    city: "Boston",
  },
  {
    name: "Genny",
    age: 32,
    sex: "Female",
    city: "Chicago",
  },
];

const Map_ = (entities, fnMap) => {
  const result = new Map();
  const emmiter = (key, value) => {
    if (!result.has(key)) {
        console.log(key)
        result.set(key, []);
    }

    result.get(key).push(value);
  };

  entities.forEach((entity) => fnMap(entity, emmiter));
  return result;
};



const mapResult = Map_(simpleSetOfData, (entity, emmiter) => {
  const { age, name,sex, city } = entity;

//   if (age < 30) {
//       emmiter("<30", age)
//   } else if (age > 30 && age < 40) {
//       emmiter("30-40", age)
//   } else {
//       emmiter(">40", age)
//   }


    emmiter(`${name}, ${sex}`, age)
});

console.log(mapResult);
