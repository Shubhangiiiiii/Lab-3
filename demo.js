let myChart;

function updateChart(bmi, emoji, category, warning) {
    var ctx = document.getElementById('bmiChart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    var fontSize = getFontSize();

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['BMI'],
            datasets: [{
                data: [bmi],
                backgroundColor: getBackgroundColor(bmi),
                borderColor: getBorderColor(bmi),
                borderWidth: 2,
            }]
        },
        options: {
            cutout: '70%',
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
        },
        plugins: [{
            beforeDraw: function(chart) {
                var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;

                
                ctx.font = fontSize + "em sans-serif";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(emoji, width / 2, height / 2);
            },
            afterDraw: function(chart) {
                var resultDiv = document.getElementById("result");
                var warningDiv = document.getElementById("warning");

                var text = "Your BMI is: " + bmi.toFixed(2) + " (" + category + ")";
                var warningText = warning ? "<div class='warning'>" + warning + "</div>" : "";

                
                resultDiv.innerHTML = text;
                warningDiv.innerHTML = warningText;
            }
        }]
    });
}

function getFontSize() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth <= 500) {
        return 0.8;
    } else {
        return 1.5;
    }
}

function getBackgroundColor(bmi) {
    if (bmi < 18.5) {
        return ['#f1c40f', '#fff'];
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return ['#2ecc71', '#fff'];
    } else if (bmi >= 25 && bmi < 29.9) {
        return ['#3498db', '#fff'];
    } else {
        return ['#e74c3c', '#fff'];
    }
}

function getBorderColor(bmi) {
    return getBackgroundColor(bmi)[0];
}

function getEmoji(bmi) {
    if (bmi < 18.5) {
        return '🍰'; 
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return '😊'; 
    } else if (bmi >= 25 && bmi < 29.9) {
        return '🥑'; 
    } else {
        return '🤯'; 
    }
}

function getCategory(bmi) {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        return "Overweight";
    } else {
        return "Obesity";
    }
}

function getWarning(bmi) {
    if (bmi < 18.5) {
        return "You may be underweight. Please consult with a healthcare professional.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Your weight is within the normal range. Keep up the good work!";
    } else if (bmi >= 25 && bmi < 29.9) {
        return "You may be overweight. Consider adopting a healthier lifestyle.";
    } else {
        return "You may be obese. Consult a healthcare professional for guidance.";
    }
}

function calculateBMI() {
    var gender = document.getElementById("gender").value;
    var age = parseFloat(document.getElementById("age").value);
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
        alert("Please enter valid values for age, height, and weight.");
        return;
    }

    var heightInMeters = height / 100;
    var bmi = weight / (heightInMeters ** 2);

    var emoji = getEmoji(bmi);
    var category = getCategory(bmi);
    var warning = getWarning(bmi);
    updateChart(bmi, emoji, category, warning);
}

calculateBMI(); 

window.addEventListener('resize', function() {
    calculateBMI();
});
