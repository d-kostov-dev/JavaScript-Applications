define(["underscore"], function (_) {
    var MIN_AGE = 18,
        MAX_AGE = 24;

    function firstBeforeLastName(data) {
        // First we filter the results
        var result = _.filter(data, function (item) {
            if (item.firstName.toLowerCase() < item.lastName.toLowerCase()) {
                return true;
            }

            return false;
        });

        // Then we sort them by first + last name
        result = _.sortBy(result, function (item) {
            return item.firstName + " " + item.lastName;
        });

        // Make it DESC
        result.reverse();

        return result;
    }

    function filterByAge(data) {
        // Filtering the results
        var result = _.filter(data, function (item) {
            if (MIN_AGE <= item.age && item.age <= MAX_AGE) {
                return true;
            }

            return false;
        });

        return result;
    }

    function topByMarks(data) {
        // Sorting the results by average marks
        var result = _.sortBy(data, function (item) {
            return getAverageMark(item.marks);
        });

        // sortBy sorts in ASC order so we return the last result = best
        result = _.last(result)

        // Returning as array...that's how the templateModule works.
        // TODO: Fix this;
        return [result];
    }

    function getAverageMark(marksArray) {
        var totalMarksValue = 0;

        _.each(marksArray, function (item) {
            totalMarksValue += item;
        });

        return totalMarksValue / marksArray.length;
    }

    return {
        firstBeforeLast: firstBeforeLastName,
        filterByAge: filterByAge,
        bestStudent: topByMarks
    }
});