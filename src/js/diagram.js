/**
 * Hämtar in JSON-data och skapar ett stapel- och ett cirkeldiagram med apexcharts.
 * @asynk
 * @returns {Promise<Object[]>}
 */

async function loadData() {
    const url = 'https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Något gick fel: ' + response.status);
        }

        const data = await response.json();

        const kurser = data
            .filter(item => item.type === 'Kurs')
            .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
            .slice(0, 6)
            .map(kurs => ({

                x: kurs.name,
                y: kurs.applicantsTotal

            }));

        const program = data
            .filter(item => item.type === 'Program')
            .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
            .slice(0, 5);

        const series = program.map(p => parseInt(p.applicantsTotal));
        const labels = program.map(p => p.name);

        const stapelOptions = {
            title: {
                text: 'De mest sökta kurserna på Mittuniversitetet HT-25',
                align: 'center',
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#4E342E'
                }
            },
            chart: {
                type: 'bar',
                height: 350
            },
            colors: ['#26A69A'],
            series: [{
                name: 'Antal sökande',
                data: kurser,
            }],
            xaxis: {
                labels: {
                    style: {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '10px',
                        colors: '#4E342E'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '10px',
                        colors: '#4E342E'
                    }
                }
            },
        };

        const stapelEl = new ApexCharts(document.querySelector("#stapel"), stapelOptions);
        stapelEl.render();

        const cirkelOptions = {
            chart: {
                type: 'pie',
                height: 350
            },

            series: series,
            labels: labels,
            title: {
                text: 'De mest sökta programmen på Mittuniversitetet HT-25',
                align: 'center',
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#4E342E'
                }
            },
            colors: ['#80CBC4', '#4DB6AC', '#26A69A', '#00897B', '#00695C'],
            legend: {
                position: 'bottom',
                labels: {
                    colors: '#4E342E',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '12px'
                }
            }

        };

        const cirkelEl = new ApexCharts(document.querySelector("#cirkel"), cirkelOptions);
        cirkelEl.render();

    } catch (error) {
        console.error('Något gick fel: ' + error);
    }
}

loadData();