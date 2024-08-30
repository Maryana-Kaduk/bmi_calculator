const form = document.querySelector('form#calculator')
const calculatorExplanation = document.querySelector('article.calculator_explanation')

const inputs = document.querySelector('div.inputs');
const inputWrapper = document.querySelectorAll('article.input_wrapper');

const radioMetric = document.querySelector('input#Metric');
const radioImperial = document.querySelector('input#Imperial');

let inputMetricHeight = document.querySelector('div.inputs input#height');
let inputMetricWeight = document.querySelector('div.inputs input#weight');

let inputImperialHeight;
let inputImperialWeight;
let imperialInput;

let secondInputs;
let firstInputs;
let firstInputsContent;

let metricHeight; 
let metricWeight; 

let option = 'metric';

let calculationResult;
let textResultMetric;
let textResultImperial;

function check(heightValue, weightValue) {
    // heightValue !== 0 && weightValue !== 0 && 
    if(heightValue !== '0' && weightValue !== '0' && heightValue !== '' && weightValue !== '') {
        console.log('HELLL');
        return true;
    } else {
        return false;
    };
};

function optionCheck(option) {
    if(option === 'metric') {
        return true
    } else {
        return false
    }
}

function transformNotInputWeight(weightArray) {
    let kgTransformedToSt = (Number(weightArray[0])/6.35).toFixed(1)
    let kgTransformedToLb = ((kgTransformedToSt-Number(kgTransformedToSt).toFixed())*14).toFixed()

    console.log(kgTransformedToLb)
    let weight = `${kgTransformedToSt}st ${Math.abs(kgTransformedToLb)}lbs`
    let weightTransformed = String(weight)

    return weightTransformed
}

function bmiText(bmi, height) {

    if(bmi < 18.5) {
        // under
        textResultMetric = `Your BMI suggests you’re underweight. Your ideal weight is between ${((height*0.01)**2*18.5).toFixed(1)}kgs-${((height*0.01)**2*24.9).toFixed(1)}kgs.`
        textResultImperial = `Your BMI suggests you’re underweight. Your ideal weight is between ${transformNotInputWeight([(height*0.01)**2*18.5, 0])}-${transformNotInputWeight([(height*0.01)**2*24.9, 0])}.`

        if(optionCheck(option)) {
            return textResultMetric
        } else {
            return textResultImperial
        }
    } else if(bmi >= 18.5 && bmi <= 24.9) {
        // healthy
        textResultMetric = `Your BMI suggests you’re a healthy weight. Your ideal weight is between ${((height*0.01)**2*18.5).toFixed(1)}kgs-${((height*0.01)**2*24.9).toFixed(1)}kgs.`
        textResultImperial = `Your BMI suggests you’re a healthy weight. Your ideal weight is between ${transformNotInputWeight([(height*0.01)**2*18.5, 0])}-${transformNotInputWeight([(height*0.01)**2*24.9,0])}.`

        if(optionCheck(option)) {
            return textResultMetric
        } else {
            return textResultImperial
        }
    } else if(bmi >= 25 && bmi <= 29.9) {
        // overweight
        textResultMetric = `Your BMI suggests you’re overweight. Your ideal weight is between ${((height*0.01)**2*18.5).toFixed(1)}kgs-${((height*0.01)**2*24.9).toFixed(1)}kgs.`
        textResultImperial = `Your BMI suggests you’re overweight. Your ideal weight is between ${transformNotInputWeight([(height*0.01)**2*18.5, 0])}-${transformNotInputWeight([(height*0.01)**2*24.9,0])}.`

        if(optionCheck(option)) {
            return textResultMetric
        } else {
            return textResultImperial
        }
    } else if(bmi >= 30) {
        // obese
        textResultMetric = `Your BMI suggests you’re obese. Your ideal weight is between ${((height*0.01)**2*18.5).toFixed(1)}kgs-${((height*0.01)**2*24.9).toFixed(1)}kgs.`
        textResultImperial = `Your BMI suggests you’re obese. Your ideal weight is between ${transformNotInputWeight([(height*0.01)**2*18.5, 0])}-${transformNotInputWeight([(height*0.01)**2*24.9,0])}.`

        if(optionCheck(option)) {
            return textResultMetric
        } else {
            return textResultImperial
        }
    }
}

function reload() {
    calculatorExplanation.innerHTML = `<h3>Welcome!</h3>
    <p>Enter your height and weight and you’ll see your BMI result here</p>`
    calculatorExplanation.classList.remove('bmi_result')
}

function calculate(heightInputValue, weightInputValue) {
    // console.log(check(heightInput.value, weightInput.value))

    if(check(heightInputValue, weightInputValue)) {
        calculationResult = (Number(weightInputValue)/(Number(heightInputValue)*0.01)**2).toFixed(1)

        calculatorExplanation.innerHTML = `<div class="result">
        <span>Your BMI is...</span>
        <h3 id="bmi"></h3>
        </div>
        <p class="explanation">${bmiText(Number(calculationResult), Number(heightInputValue))}</p>`
        calculatorExplanation.classList.add('bmi_result')

        const bmiHeading = document.querySelector('h3#bmi')
        bmiHeading.textContent = calculationResult
    } else {
        reload()
    }
};

function transformHeight(heightArray) {
    let ftTransformedToCm = Number(heightArray[0].value)*30.48
    let inTransformedToCm = Number(heightArray[1].value)*2.54

    let height = ftTransformedToCm + inTransformedToCm
    let heightTransformed = String(height)

    return heightTransformed
}

function transformWeight(weightArray) {
    let stTransformedToKg = Number(weightArray[0].value)*6.35
    let lbTransformedToKg = Number(weightArray[1].value)*0.45

    let weight = stTransformedToKg + lbTransformedToKg
    let weightTransformed = String(weight)

    return weightTransformed
}

radioImperial.addEventListener('change', () => {
    reload()
    option = 'imperial'

    inputs.style.display = 'none'

    firstInputsContent = `<article class="input_wrapper">
    <label for="height">Height</label>
    <input type="number" id="height" placeholder="0" class="imperial_input imperial_height">
    <span class="unit">ft</span>
    </article>
    <article class="input_wrapper">
        <input type="number" id="" placeholder="0" class="imperial_input imperial_height">
        <span class="unit unit_2">in</span>
    </article>`;

    let secondInputsContent = `<article class="input_wrapper">
    <label for="weight">Weight</label>
    <input type="number" id="weight" placeholder="0" class="imperial_input imperial_weight">
    <span class="unit">st</span>
    </article>
    <article class="input_wrapper">
        <input type="number" id="weight_1" placeholder="0" class="imperial_input imperial_weight">
        <span class="unit unit_2">lbs</span>
    </article>`;

    firstInputs = document.createElement('div');
    firstInputs.classList.add('inputs');
    firstInputs.classList.add('imperial_inputs');

    firstInputs.innerHTML = firstInputsContent;

    secondInputs = document.createElement('div');
    secondInputs.classList.add('inputs');
    secondInputs.classList.add('imperial_inputs');

    secondInputs.innerHTML = secondInputsContent;

    inputs.after(firstInputs);
    inputs.after(secondInputs);

    console.log(option)

    inputImperialWeight = document.querySelectorAll('input.imperial_weight')
    inputImperialHeight = document.querySelectorAll('input.imperial_height')

    imperialInput = document.querySelectorAll('input.imperial_input')

    for(let input of imperialInput) {
        input.addEventListener('input', () => {
            calculate(transformHeight(inputImperialHeight), transformWeight(inputImperialWeight))
        })
    }

    console.dir(inputImperialWeight)
    console.dir(inputImperialHeight)
});

radioMetric.addEventListener('change', () => {
    reload()
    option = 'metric'

    secondInputs.remove();
    firstInputs.remove()
    
    inputMetricHeight.value = ''
    inputMetricWeight.value = ''

    inputs.style.display = 'flex'
});

inputMetricHeight.addEventListener('input', () => {
    metricHeight = inputMetricHeight.value
    console.log(metricHeight);

    calculate(inputMetricHeight.value, inputMetricWeight.value)
})

inputMetricWeight.addEventListener('input', () => {
    metricWeight = inputMetricWeight.value;
    console.log(metricWeight);

    calculate(inputMetricHeight.value, inputMetricWeight.value)
})