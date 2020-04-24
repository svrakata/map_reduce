const random = require("random");

const transformArrayRandomly = (arr, transformFn) => {
    const newArr = [...arr];

    if (newArr.length === 0) {
        throw new Error("The provided array must not be empty!")
    }

    let done = false;
    const indexMap = new Map();

    const next = () => {
        if (done) {
            return {
                value: newArr,
                done: true,
            };
        }

        if (indexMap.size === newArr.length) {
            done = true
            return next()
        }

        while (true) {
            const index = random.int(0, newArr.length - 1);
            if (!indexMap.has(index)) {
                const elem = newArr[index];
                const newElement = transformFn(elem, index);

                indexMap.set(index, 0)

                newArr[index] = newElement;

                return {
                    value: newArr,
                    done: false,
                };
            }
        }
    };

    return {
        done: () => done = true,
        next,
    };
};

module.exports = {
    transformArrayRandomly,
}