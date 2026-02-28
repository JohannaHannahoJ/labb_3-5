
document.addEventListener("DOMContentLoaded", () => {
    /**
     * Hämtar in JSON-data och skapar ett stapel- och ett cirkeldiagram.
     */
    fetch('https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json')

        .then(response => {
            /**
             * Kontrollerar att HTTP-svaret är OK (200–299).
             * @throws {Error} - Om anropet misslyckas.
             */
            if (!response.ok) {
                throw new Error('Något gick fel: ' + response.status);
            }
            /** 
             * Konvertera svar till JSON och returnera det
            */
            return response.json();
        })

        .then(data => {
            /** 
             * Filtrerar kurserna, sorterar dem i popularitetsordning 
             * och spar de sex kurserna som har flest sökande
             * @type {{x: string, y: number}[]} - array som innehåller kurs och antalet sökande
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
             */
            const program = data
                .filter(item => item.type === 'Program')
                .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
                .slice(0, 5);

            /**
             * @type {number[]} - array med antalet sökande
             */
            const series = program.map(p => parseInt(p.applicantsTotal));
            
            /**
             * @type {string[]} - array med programnamn
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