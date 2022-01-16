//Generating values and important data to user's diet

function bmiFormula (weight, height) {    
    return weight / (height ** 2);
}

function idealWeightFormula (height) {
    return 22.5 * height * height;
}

function bmrFormula (weight, height, userAge, userGender) {
    const heightInCm = height * 100;

    let BMR;

    if (userGender === "f") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * userAge - 150;
    } else {

        BMR = 10 * weight + 6.25 * heightInCm - 5 * userAge + 50;
    }

    return BMR;
}

//ADDING a function that helps generate the calory consumption once the user achieves the ideal weight

function bmrIdealWeight(idealWeight, height, userAge, userGender) {
    const heightInCm = height * 100;

    let bmrIdeal;

    if (userGender === "f") {
        bmrIdeal = 10 * idealWeight + 6.25 * heightInCm - 5 * userAge - 150;
    } else {

        bmrIdeal = 10 * idealWeight + 6.25 * heightInCm - 5 * userAge + 50;
    }

    return bmrIdeal;
    
}

function formulaDailyCalories(basalMetabolicRate, whetherDailyExercises) {
    
    if (whetherDailyExercises === "yes") {
        return 1.6 * basalMetabolicRate;
    } else {
        return 1.4 * basalMetabolicRate;
    
    }
}

function calculateDietWeeks(weightDifference) {
    return Math.abs(weightDifference / 0.5);
}

function dietCaloriesFormula(weightDifference, currentCalories) {
    return weightDifference > 0 ? currentCalories - 500 : currentCalories + 500;
}

//Validations of user's inputs

function checkNumberOfInputs(argv) {
    if (argv.length !== 7) {
        console.log(`
        
        You entered ${argv.length -2} arguments to this program. Please inform us 5 values, in the following sequence, regarding your:
        
        weight in kilograms (kg)
        height in meters (m)
        age in years
        whether you practice daily exercises ('yes' or 'no'), and
        your gender ('m' or 'f')
        
        This is an example of a valid input:
        
        $ node index.js 78 1.80 33 yes f
        
        `);

        process.exit();
    }
}

function checkWeightHeightAndAge(usersWeight, usersHeight, usersAge, argv) {
    if (isNaN(usersWeight) || isNaN(usersHeight) || isNaN(usersAge)) {
        console.log(`
        
        The values weight, height, and age shall be informed as numbers.
        Please enter these values keeping in mind the following instructions:
        weight in kilograms (kg), example: 78 | your entry: '${argv[2]}'
        height in meters (m), example: 1.80   | your entry: '${argv[3]}'
        age in years, example: 33             | your entry: '${argv[4]}'
        
        This is an example of a valid input:
        
        $ node index.js 78 1.80 33 yes f
        `);
        process.exit();
    }
} 

function checkUserAge(usersAge) {
    if (usersAge < 20) {
        console.log(`
        
        This app is designed for people over 20 years old
        Unfortunately, it seems not to apply to you. Please check the other app"

        `);
        process.exit();
    }
}

function checkUserWeight(usersWeight) {
    if (usersWeight < 30 || usersWeight > 300) {
        console.log(`
        
        Ooops, something seems unusual with regards to your weight entry
        Our app considers a weight value that ranges from 30kg to 300kg
        
        Instead of '${usersWeight}', please re-enter your wieght in kilograms (kg)

        This is an example of a valid input:
        
        $ node index.js 78 1.80 33 yes f
        
        `);
        process.exit();
    }
}

function checkDailyExercise(dailyExercise) {
    if (dailyExercise !== "yes" && dailyExercise !== "no") {
        console.log(`
        Please inform if you do exercises daily with a "yes" or "no", instead of
        "${dailyExercise}"

        This is an example of a valid input:
        
        $ node index.js 78 1.80 33 yes f        

        `);

        process.exit();
    }
}

function checkUserGender(userGender) {
    if(userGender !== "f" && userGender !== "m") {
        console.log(`
        
        Please inform your gender either as 'f' or 'm', instead of
        '${userGender}'

        This is an example of a valid input:
        
        $ node index.js 78 1.80 33 yes f 

        `);

        process.exit();
    }
}

//Displaying user's data and diet plan
//I am adding another information to the user (the weight difference between the current and ideal weights)
//ADDING new information: how much calories the user should take, once achieved ideal weight, to keep it


function formatOutput(userObject) {
    
    return `
    :::::::::::::::::::::::::::::::
    WELCOME TO YOUR BMI CALCULATOR
    :::::::::::::::::::::::::::::::

    weight: ${userObject.personWeight} kg
    height: ${userObject.heightInM} m
    age: ${userObject.age} years
    gender: ${userObject.gender}
    do you exercise daily? ${userObject.dailyExercise}


    :::::::::::::::::::::::::::::::
          LET'S GET STARTED!!!
    :::::::::::::::::::::::::::::::
    
    Through processing your personal data, we really expect to help you in your 
    diet, by providing your with customised, helpful information
    

    Your BMI is > ${Math.round(userObject.BMI)} <

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    We calculate that an ideal weight for you would be ${Math.round(userObject.perfectWeight)} kilograms
    It means a weight difference of ${Math.round(Math.abs(userObject.weightDifference))} kilos between your current and your ideal weight
    With your current lifestyle you burn ${userObject.calories} calories a day


    :::::::::::::::
    YOUR DIET PLAN
    :::::::::::::::

    If you want to reach your ideal weight of ${Math.round(userObject.perfectWeight)} kg:

    You should eat ${userObject.dietCalories} calories a day
    This will take a time period of around ${Math.round(userObject.dietWeeks)} weeks

    Once you achieved your ideal weight, to keep it, you shall consume:

    ${Math.round(userObject.idealWeightCaloriesExercise)} kilo calories, if you practice daily exercises, or
    ${Math.round(userObject.idealWeightCaloriesSedentary)} kilo calories, if you don't practice daily exercises

    
    Some last observations:
    - always seek for specialist advice to assess your health conditions and help you when dieting
    - keep a healty life style: do exercises! eat more raw and nutrient-rich food and less processed one!

    ************************
    WE WISH YOU GOOD LUCK!!!
    ************************
    
    ;{)

    `;
}


function bmiCalculator() {

   checkNumberOfInputs(process.argv);
   
    const personWeight = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];

    checkWeightHeightAndAge(personWeight, heightInM, age, process.argv);
    checkDailyExercise(dailyExercise);
    checkUserGender(gender);
    checkUserWeight(personWeight);
    checkUserAge(age);

    const BMI = bmiFormula(personWeight, heightInM);
    const perfectWeight = idealWeightFormula(heightInM);
    const BMR = bmrFormula(personWeight, heightInM, age, gender);
    const calories = formulaDailyCalories(BMR, dailyExercise);
    const weightDifference = (personWeight - perfectWeight);
    const dietWeeks = calculateDietWeeks(weightDifference);
    const dietCalories =  dietCaloriesFormula(weightDifference, calories);

    //ADDING new information: how much calories the user should take, once achieved ideal weight, to keep it
    const idealWeightCaloriesExercise = 1.6 * (bmrIdealWeight(perfectWeight, heightInM, age, gender));  
    const idealWeightCaloriesSedentary = 1.4 * (bmrIdealWeight(perfectWeight, heightInM, age, gender)); 

    const user = {
        personWeight: personWeight,
        heightInM: heightInM,
        age: age,
        dailyExercise: dailyExercise,
        gender: gender,
        BMI: BMI,
        BMR: BMR,
        perfectWeight: perfectWeight,
        calories: calories,
        dietCalories: dietCalories,
        weightDifference: weightDifference,
        dietWeeks: dietWeeks,
        dietCalories: dietCalories,
        idealWeightCaloriesExercise: idealWeightCaloriesExercise,
        idealWeightCaloriesSedentary: idealWeightCaloriesSedentary,
    };

    const output = formatOutput(user);    
    console.log(output);

}

bmiCalculator();