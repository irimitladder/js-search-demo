// A list of country-specific courses
let courses = [
    { name: "Courses in England", prices: [0, 100] }, 
    { name: "Courses in Germany", prices: [500, null] }, 
    { name: "Courses in Italy", prices: [100, 200] }, 
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

// Possible user search queries for courses by price
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

// I guess, [1000, null] means that there are only courses for the price of 1000 in a country.
// I guess, [null, 1000] means exactly the same.
// I guess, [null, null] means that there are no courses in a country at all.
// I've done everything here based on these suggestions

let coursesUnsorted = true;

function searchCourses(coursePriceRange) {
    const getCourses = function(coursePriceRange) {

        // Check if the user search query is correct: it has to be an array of length two
        if ((!Array.isArray(coursePriceRange)) || (coursePriceRange.length !== 2)) return [];
        let courseMinPrice, courseMaxPrice;
        if (Number.isInteger(coursePriceRange[0])) {

            // Check if the first value of the course price range is correct: it doesn't have to be less than zero
            if (coursePriceRange[0] < 0) return [];
            courseMinPrice = coursePriceRange[0];
            if (Number.isInteger(coursePriceRange[1])) {

                // Check if the second value of the course price range is correct: it doesn't have to be less than zero or than the first one
                if ((coursePriceRange[1] < 0) || (coursePriceRange[0] > coursePriceRange[1])) return [];
                courseMaxPrice = coursePriceRange[1];

                // Check if the second value of the course price range is correct: if it's not a number it has to be null
            } else if (coursePriceRange[1] === null) courseMaxPrice = courseMinPrice; else return [];

        // Check if the first value of the course price range is correct: if it's not a number it has to be null
        } else if (coursePriceRange[0] === null) {

            // Check if the second value of the course price range is correct: if the first one is null it has to be a number not less than zero
            if (!Number.isInteger(coursePriceRange[1]) || (coursePriceRange[1] < 0)) return [];
            courseMinPrice = coursePriceRange[1];
            courseMaxPrice = courseMinPrice;
        } else return [];
        let suitableCourses = [];

        // Check every country in the list of country-specific courses
        courses.forEach(country => {
            let countryCourseMinPrice, countryCourseMaxPrice;
            if (country.prices[0] === null) {
                if (country.prices[1] === null) return;
                countryCourseMinPrice = country.prices[1];
                countryCourseMaxPrice = countryCourseMinPrice;
            } else {
                countryCourseMinPrice = country.prices[0];
                countryCourseMaxPrice = country.prices[country.prices[1] === null ? 0 : 1];
            }
            if ((courseMinPrice <= countryCourseMaxPrice) && (courseMaxPrice >= countryCourseMinPrice)) suitableCourses.push(country);
        });
        return suitableCourses;
    };

    const sortCourses = function() {
        let countryCoursePrices = [];
        courses.forEach(country => countryCoursePrices.push((country.prices[0] === null) && (country.prices[1] === null) ? [-1, -1] : [country.prices[country.prices[0] === null ? 1 : 0], country.prices[country.prices[1] === null ? 0 : 1]]));
        for (let countryIndex1 = courses.length - 1; countryIndex1 > 0; --countryIndex1) for (let countryIndex2 = 0; countryIndex2 < countryIndex1; ++countryIndex2) if ((countryCoursePrices[countryIndex2][0] > countryCoursePrices[countryIndex2 + 1][0]) || (countryCoursePrices[countryIndex2][0] === countryCoursePrices[countryIndex2 + 1][0]) && (countryCoursePrices[countryIndex2][1] > countryCoursePrices[countryIndex2 + 1][1])) {
            let countryBuffer = courses[countryIndex2];
            courses[countryIndex2] = courses[countryIndex2 + 1];
            courses[countryIndex2 + 1] = countryBuffer;
            countryBuffer = countryCoursePrices[countryIndex2];
            countryCoursePrices[countryIndex2] = countryCoursePrices[countryIndex2 + 1];
            countryCoursePrices[countryIndex2 + 1] = countryBuffer;
        }
    };

    // Sort the list of country-specific courses if it's not sorted
    if (coursesUnsorted) {
        sortCourses();
        coursesUnsorted = false;
    }

    // Get suitable country-specific courses
    let suitableCourses = getCourses(coursePriceRange);

    // Return the search result
    if (suitableCourses.length === 0) console.log("No courses are found."); else suitableCourses.forEach(course => console.log(course.name));
}
