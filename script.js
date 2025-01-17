console.log("script.js loaded");

const onesText = ["jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć"];
const teensText = ["jedenaście", "dwanaście", "trzynaście", "czternaście", "piętnaście", "szesnaście", "siedemnaście", "osiemnaście", "dziewiętnaście"];
const tensText = ["dwadzieścia", "trzydzieści", "czterdzieści", "piędziesiąt", "sześćdziesiąt", "siedemdziesiąt", "osiemdziesiąt", "dziewiędziesiąt"];
const hundredsText = ["sto", "dwieście", "trzysta", "czterysta", "pięćset", "sześćset", "siedemset" , "osiemset", "dziewięcset"];

const Case = {
    SINGULAR: 0,
    PLURAL: 1,
    GENETIVE: 2
};

function getCase(number)
{
    let numberInStr = number.toString();

    const charactersToAdd = 2-numberInStr.length;
    for (let i = 0; i < charactersToAdd; i++)
    {
        numberInStr = '0' + numberInStr;
    }

    let ones = parseInt(numberInStr[numberInStr.length - 1]);  
    let tens = parseInt(numberInStr[numberInStr.length - 2]); 
    if (ones == 1 && tens == 0)
    {
        return Case.SINGULAR;
    }
    if (tens == 1)
    {
        return Case.GENETIVE;
    }
    if (ones == 2 || ones == 3 || ones == 4)
    {
        return Case.PLURAL;
    }

    return Case.GENETIVE;
}

function getThreeDegits(number = 0)
{
    let numStr = number.toString();

    if (numStr.length > 3)
    {
        return;
    }

    const charactersToAdd = 3-numStr.length;
    for (let i = 0; i < charactersToAdd; i++)
    {
        numStr = '0' + numStr;
    }

    let ones = parseInt(numStr[numStr.length - 1]);  
    let tens = parseInt(numStr[numStr.length - 2]); 
    let hundreds = parseInt(numStr[numStr.length - 3]);

    let result = "";

    if (tens == 0 && ones != 0)
    {
        result = onesText[ones-1];
    }
    else if (tens == 1)
    {
        result = teensText[ones-1];
    }
    if (tens == 1 && ones == 0)
    {
        result = "dziesięć";
    }

    if (tens > 1)
    {
        result = tensText[tens-2] + " " + onesText[ones-1];
    }
    if (tens > 1 && ones == 0)
    {
        result = tensText[tens-2];
    }

    if (hundreds == 0)
    {
        return result;
    }
    result = hundredsText[hundreds-1] + " " + result;
    return result;
}

function convertNum() {
    let numInWords = "";
    let numInInt = parseInt(document.getElementById("NumberBox").value);
    const resultId = "Result";

    if (isNaN(numInInt))
    {
        document.getElementById(resultId).innerHTML = "Not a Proper Number";
        return;
    }

    let numStr = numInInt.toString();

    if (numStr.length > 15)
    {
        document.getElementById(resultId).innerHTML = "Not a Proper Number";
        return;
    }

    const charactersToAdd = 15-numStr.length;
    for (let i = 0; i < charactersToAdd; i++)
    {
        numStr = '0' + numStr;
    }

    let ones = parseInt(numStr[numStr.length - 1]) + parseInt(numStr[numStr.length - 2]) * 10 + parseInt(numStr[numStr.length - 3]) * 100;  
    let thousands = parseInt(numStr[numStr.length - 4])+ parseInt(numStr[numStr.length - 5]) * 10+ parseInt(numStr[numStr.length - 6]) * 100;
    let milions = parseInt(numStr[numStr.length - 7]) + parseInt(numStr[numStr.length - 8]) * 10 +parseInt(numStr[numStr.length - 9]) * 100;
    let billions = parseInt(numStr[numStr.length - 10]) + parseInt(numStr[numStr.length - 11]) * 10 +parseInt(numStr[numStr.length - 12]) * 100;
    let trilions = parseInt(numStr[numStr.length - 13]) + parseInt(numStr[numStr.length - 14]) * 10 +parseInt(numStr[numStr.length - 15]) * 100;


    if (ones != 0)
    {
        numInWords = getThreeDegits(ones);
    }
    if (thousands != 0)
    {
        switch(getCase(thousands))
        {
            case Case.SINGULAR:
                numInWords = "tysiąc " + numInWords;
                break;
            case Case.PLURAL:
                numInWords = getThreeDegits(thousands) + " tysiące " + numInWords;
                break;
            case Case.GENETIVE:
                numInWords = getThreeDegits(thousands) + " tysięcy " + numInWords;
                break;
        }
    }
    if (milions != 0)
    {
        switch(getCase(milions))
        {
            case Case.SINGULAR:
                numInWords = "milion " + numInWords;
                break;
            case Case.PLURAL:
                numInWords = getThreeDegits(milions) + " miliony " + numInWords;
                break;
            case Case.GENETIVE:
                numInWords = getThreeDegits(milions) + " milionów " + numInWords;
                break;
        }
    }
    if (billions != 0)
    {
        switch(getCase(billions))
        {
            case Case.SINGULAR:
                numInWords = "miliard " + numInWords;
                break;
            case Case.PLURAL:
                numInWords = getThreeDegits(billions) + " miliardy " + numInWords;
                break;
            case Case.GENETIVE:
                numInWords = getThreeDegits(billions) + " miliardów " + numInWords;
                break;
        }
    }
    if (trilions != 0)
    {
        switch(getCase(trilions))
        {
            case Case.SINGULAR:
                numInWords = "bilion " + numInWords;
                break;
            case Case.PLURAL:
                numInWords = getThreeDegits(trilions) + " biliony " + numInWords;
                break;
            case Case.GENETIVE:
                numInWords = getThreeDegits(trilions) + " bilionów " + numInWords;
                break;
        }
    }
    
    if (numInWords == "")
    {
        numInWords = "zero";
    }
    document.getElementById(resultId).innerHTML = numInWords.charAt(0).toUpperCase() + numInWords.slice(1);
}
