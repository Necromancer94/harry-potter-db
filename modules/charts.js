const countChars = {
    allGryffindor: 0,
    allSlytherin: 0,
    allRavenclaw: 0,
    allHufflepuff: 0,
    allNoHouse: 0,
    allMale: 0,
    allFemale: 0,
    allOtherGender: 0,
    allHuman: 0,
    allNonHuman: 0
}

function createChart (elementID, chartType, labelsArray, dataArray){

    const newChart = new Chart(document.getElementById(elementID), {
        type: chartType,
        data: {
            labels: labelsArray,
            datasets: [{
                label: 'Characters',
                data: dataArray,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    return newChart
}

const genderLabels = ['Male', 'Female', 'Neither']
const genderData = [countChars.allMale, countChars.allFemale, countChars.allOtherGender]

const genderChart = createChart('genderChart', 'pie', genderLabels, genderData)

const speciesLabels = ['Human', 'Non-human']
const speciesData = [countChars.allHuman, countChars.allNonHuman]

const speciesChart = createChart('speciesChart', 'doughnut', speciesLabels, speciesData)

const houseLabels = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff' , 'Neither']
const houseData = [countChars.allGryffindor, countChars.allSlytherin, countChars.allRavenclaw, countChars.allHufflepuff, countChars.allNoHouse]

const houseChart = createChart('houseChart', 'bar', houseLabels, houseData)

function updateChart(chartName, dataArray) {

    if(chartName){
        chartName.data.datasets[0].data = dataArray
        chartName.update()
    }
}

export { updateChart, genderChart, houseChart, speciesChart, countChars, houseData, speciesData, genderData}