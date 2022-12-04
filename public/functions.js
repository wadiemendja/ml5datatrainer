async function fetchData() {
    const data = await fetch('./data/EURUSD_M1_Nov_2022.json')
    const arr = await data.json();
    for (let i = 0; i < arr.length; i++) {
        // clearing unnecessary data
        arr[i].shift();
        arr[i].shift();
        arr[i].pop();
        arr[i].pop();
        arr[i].pop();
        // adding candle type UP/DOWN (1/-1) [0 for even open/close]
        if (arr[i][3]/* close */ - arr[i][0]/* open */ > 0) arr[i].push(1);
        else if (arr[i][3]/* close */ - arr[i][0]/* open */ < 0) arr[i].push(-1);
        else arr[i].push(0);
    }
    // converting [open, Hiegh, Low, Close, UP(1)/DOWN(-1)] to [candle size, body size, up/down]
    let candlesInfo = [];
    for (let i = 0; i < arr.length; i++) {
        const candleSize = Math.abs((arr[i][1] - arr[i][2]).toPrecision(3));
        const bodySize = Math.abs((arr[i][0] - arr[i][3]).toPrecision(3));
        const candleType = arr[i][4];
        candlesInfo.push([candleSize, bodySize, candleType]);
    }
    return candlesInfo /* [candle size, body size, up/down] */;
}

export { fetchData };