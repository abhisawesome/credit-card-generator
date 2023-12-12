const data = require('./raw-data.json');
const fs = require('fs');

const generateNumber = (start, end) => {
    const resultArray = [];
    for (let i = start; i <= end; i++) {
        resultArray.push(i.toString());
    }
    return resultArray;
};

const converted = data?.map(item => {
    const { iin_bin_ranges, length: lengthArrayOrg } = item;

    let iinRanges = iin_bin_ranges?.split(',').map(x => x?.trim());
    let newIinRange = [];

    iinRanges.forEach(range => {
        if (range.includes('-')) {
            const [start, end] = range.split('-').map(x => x.trim());
            newIinRange = newIinRange.concat(generateNumber(start, end));
        } else {
            newIinRange.push(range);
        }
    });

    let newLength = [];
    let lengthArray = lengthArrayOrg?.toString()?.split(',').map(x => x?.trim());

    lengthArray.forEach(len => {
        if (len.includes('-')) {
            const [start, end] = len.split('-').map(x => x.trim());
            newLength = newLength.concat(generateNumber(start, end));
        } else {
            newLength.push(len);
        }
    });

    return {
        ...item,
        iin_bin_ranges: newIinRange,
        length: newLength
    };
});

const convertedDataJSON = JSON.stringify(converted, null, 2);

fs.writeFile('data.json', convertedDataJSON, 'utf8', function (err) {
    if (err) {
        console.error('Error saving file:', err);
    } else {
        console.log('Conversion and save successful!');
    }
});
