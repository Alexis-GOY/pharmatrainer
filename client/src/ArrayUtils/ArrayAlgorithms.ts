export function firstOfCond<T>(array: Array<T>, cond: (el: T) => boolean, defaultValue?: T): T | undefined {
    for (const el of array) {
        if (cond(el)) return el;
    }

    return defaultValue;
}

export function toggleArrayElem<T>(array: T[], value: any): T[] {
    if (array.includes(value)) return array.filter(el => el !== value);

    return array.concat(value);
}

export function swapValues<T>(value1: T, value2: T): T[] {
    return [value2, value1];
}

export function randomizeArray<T>(array: T[]): T[] {
    const availableIndexes = [...array.keys()];
    let randomizedArray = [] as T[];
    while (availableIndexes.length) {
        randomizedArray.push(array[availableIndexes
            .splice(Math.floor(Math.random() * availableIndexes.length), 1)[0]]);
    }

    return randomizedArray;
}

export function areFlatArraysEqual<T>(lhs: T[], rhs: T[]) : boolean {
    if(lhs === null || rhs === null) return false;
    if(lhs === undefined || rhs === undefined) return false;
    if(lhs.length !== rhs.length) return false;

    for(let i = 0; i < lhs.length; i++) {
        if(lhs[i] !== rhs[i]) return false;
    }

    return true;
}

// export function toggleArrayElem<T>(array: T[], value: T) : T[] {
//     if(array.includes(value)) return array.filter(el => el !== value);
//
//     return array.concat(value);
// }

