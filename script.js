
const months = [31,28,31,30,31,30,31,31,30,31,30,31];

function ageCalculate(){
    let today = new Date();
    let inputDate = new Date(document.getElementById("date-input").value);
    let birthMonth,birthDate,birthYear;
    let birthDetails = {
        date:inputDate.getDate(),
        month:inputDate.getMonth()+1,
        year:inputDate.getFullYear()
    }
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    let currentDate = today.getDate();

    leapChecker(currentYear);

    if(
        birthDetails.year > currentYear ||
        ( birthDetails.month > currentMonth && birthDetails.year == currentYear) || 
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)
    ){
        alert("Not Born Yet");
        displayResult("-","-","-");
        return;
    }

    birthYear = currentYear - birthDetails.year;

    if(currentMonth >= birthDetails.month){
        birthMonth = currentMonth - birthDetails.month;
    }
    else{
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    /*
//     If the current month is earlier than the birth month:
// The person hasn’t reached their birthday in the current year yet, so:
// Subtract 1 from birthYear to adjust for the incomplete year.
// Calculate birthMonth by wrapping around the months (as if "borrowing" a year):
// Add 12 to the current month and then subtract the birth month. This handles the negative difference.
// Example Scenarios:
// Case 1: Birthday Already Passed This Year
// Current Date: December 31, 2024

// Birth Date: May 15, 1990

// Calculation:

// birthYear = 2024 - 1990 = 34
// currentMonth = 12, birthDetails.month = 5
// Since 12 >= 5, calculate:
// birthMonth = 12 - 5 = 7
// Result: 34 years, 7 months.

// Case 2: Birthday Not Yet Reached This Year
// Current Date: March 15, 2024

// Birth Date: June 10, 1990

// Calculation:

// birthYear = 2024 - 1990 = 34
// currentMonth = 3, birthDetails.month = 6
// Since 3 < 6, adjust:
// birthYear = 34 - 1 = 33
// birthMonth = 12 + 3 - 6 = 9
// Result: 33 years, 9 months.
// */

    if(currentDate >= birthDetails.date){
        birthDate = currentDate - birthDetails.date;
    }
    else{
        birthMonth--;
        let days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetails.date;
        if(birthMonth < 0){
            birthMonth = 11;
            birthYear--;
        }
    }
    displayResult(birthDate,birthMonth,birthYear);
}

function displayResult(bDate,bMonth,bYear){
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

function leapChecker(year){
    if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
        months[1] = 29;
    }
    else{
        months[1] = 28;
    }
}