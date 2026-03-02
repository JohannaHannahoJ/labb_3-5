

document.addEventListener("DOMContentLoaded", () => {
    /**
     * Hämtar in JSON-data och skapar ett stapel- och ett cirkeldiagram.
     */
    fetch('https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json')

        .then(response => {
            /**
             * Kontrollerar att HTTP-svaret är OK.
             * @throws {Error} om inte ok
             */
            if (!response.ok) {
                throw new Error('Något gick fel: ' + response.status);
            }
            /** 
             * @returns {object[]} JSON-data
            */
            return response.json();
        })

        .then(data => {
            /** 
             * Filtrerar kurserna, sorterar dem i popularitetsordning 
             * och spar de sex kurserna som har flest sökande i en array
             * x: kursens namn
             * y: antal sökande
             * @type {object[]}
             */
            const kurser = data
                .filter(item => item.type === 'Kurs')
                .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
                .slice(0, 6)
                .map(kurs => ({

                    x: kurs.name,
                    y: kurs.applicantsTotal

                }))


            /**
             * Filtrerar programmen, sorterar dem i popularitetsordning 
             * och spar de fem som har flest sökande
             * name: program
             * applicantsTotal: antal sökande
             * @type {object[]}
             */
            const program = data
                .filter(item => item.type === 'Program')
                .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
                .slice(0, 5);

            /**
             * array med antalet sökande
             * @type {number[]}
             */
            const series = program.map(p => parseInt(p.applicantsTotal));

            /**
             * array med programnamn
             * @type {string[]}
             */
            const labels = program.map(p => p.name);

            /**
             * Stapeldiagram, apexcharts
             */
            const stapelOptions = {
                title: { text: 'De mest sökta kurserna på Mittuniversitetet HT-25' },
                chart: {
                    type: 'bar',
                    height: 350
                },
                series: [{
                    data: kurser,
                }]
            }

            const stapelEl = new ApexCharts(document.querySelector("#stapel"), stapelOptions);
            stapelEl.render();

            /**
            * Cirkeldiagram, apexcharts
            */
            const cirkelOptions = {
                chart: {
                    type: 'pie',
                    height: 350
                },

                series: series,
                labels: labels,
                title: { text: 'De mest sökta programmen på Mittuniversitetet HT-25' }
            }

            console.log(series);

            const cirkelEl = new ApexCharts(document.querySelector("#cirkel"), cirkelOptions);
            cirkelEl.render();

        })
});