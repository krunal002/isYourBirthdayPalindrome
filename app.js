const input = document.querySelector("#input-date");
const checkBtn = document.querySelector("#check-btn");
const outputDiv = document.querySelector("#output");


checkBtn.addEventListener("click", checkPalindrome);

function checkPalindrome(){
    var bdaystr = input.value;

    if(bdaystr !== ''){
        var listOfDate = bdaystr.split('-');

        var date = {
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number(listOfDate[0])
        }

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            outputDiv.innerText ="Yeah!!! Your birthday is palindrome 🤩🥳";
        }
        else{
            var [count, nextDate] = getNextPalindromeDate(date);
            outputDiv.innerText =`The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count}`;
        }
    }
    else{
        outputDiv.innerText ="Please enter date!";
    }

}

function reverseStr(str){
    var array = str.split('');
    var revArray = array.reverse();
    var reverse = revArray.join('');
    return reverse;

    // return str.split('').reverse().join('');
}

function isPalindrome(str){

    var rev = reverseStr(str);
    if(str === rev){
        return true;
    }
    return false;
}

function convertDateToString(date){
    var dateStr = {day:'', month:'', year:''};
    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }else{
        dateStr.day = date.day.toString();
    }
    
    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
    
}

function getAllDateFormats(date){
    var dateStr = convertDateToString(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyy, mmddyy, yymmdd, ddmmyyyy, mmddyyyy, yyyymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var list = getAllDateFormats(date);
    var palindrome = false;
     
    for(var i=0; i<list.length; i++){
        if(isPalindrome(list[i])){
            palindrome = true;
            break;
        }
    }
    return palindrome;
}

function isLeafYear(year){
    if(year % 400 === 0)
        return true;
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0)
        return true;
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30 ,31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeafYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }
    
    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date){
    var count = 0;
    var nextDate = getNextDate(date);

    while(1){
        count++;
        var dateStr = convertDateToString(nextDate);
        var palindromeCheck = checkPalindromeForAllDateFormats(dateStr);
            if(palindromeCheck){
                break;
            }
        nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
}

var date={day: 25, month: 1, year: 2020};
console.log(getNextDate(date));
