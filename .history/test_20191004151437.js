async function someFunction() {
    const myArray = [1, 2, 3];
    const connection = mysql.createPool({
        options
    });
    let finalArray = myArray.map(async (value) => { // map instead of forEach
        const result = await asyncFunction(connection, value);
        finalValue.asyncFunctionValue = result.asyncFunctionValue;
        return finalValue; // important to return the value
    });
    const resolvedFinalArray = await Promise.all(finalArray); // resolving all promises
    return functionThatUsesResolvedValues(resolvedFinalArray);
};

someFunction()