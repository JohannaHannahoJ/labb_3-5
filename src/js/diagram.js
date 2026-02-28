

const stapelOptions = {
    chart: {
        type: 'bar'
    },
    series: [{
        data: [{
            x: 'Kurs 1',
            y: 70
        }, {
            x: 'Kurs 2',
            y: 500
        }, {
            x: 'Kurs3',
            y: 300
        }, {
            x: 'Kurs4',
            y: 30
        }, {
            x: 'Kurs5',
            y: 55
        }, {
            x: 'Kurs6',
            y: 80
        }]
    }]
}

const stapelEl = new ApexCharts(document.querySelector("#stapel"), stapelOptions);

stapelEl.render();

const cirkelOptions = {
    chart: {
        type: 'pie'

    },
    
    series: [44, 55, 13, 33],
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
}

const cirkelEl = new ApexCharts(document.querySelector("#cirkel"), cirkelOptions);

cirkelEl.render();