import { fetchData } from './functions.js';

const data = await fetchData();
console.log(data[500][0]);

function train() {
    let candlePredictor = ml5.neuralNetwork({
        task: "regression",
        debug: true
    });

    for (let i = 0; i < data.length - 1; i++) {
        const previousCandle = data[i];
        const nextCandle = data[i + 1].slice(-1);
        candlePredictor.addData(previousCandle, nextCandle);
    }
    candlePredictor.normalizeData();
    candlePredictor.train({ epochs: 5000 }, () => {
        candlePredictor.save();
        console.log("Finished training");
    });
}

document.getElementById('trainBtn').addEventListener('click', () => { train(); })