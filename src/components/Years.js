// creating years list from 1980 to current year
const movieYears =[];                                   // initialize array for store years
const curYear = new Date().getFullYear();               // get current year
let i =0;
// create loop for store years
for (let index = 1980; index <= curYear; index++) {
    movieYears[i] = index;
    i++;
}
export{movieYears}