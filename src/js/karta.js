
/**
 * Läser in kartan och sätter startkoordinat
 */
const map = L.map('map').setView([62.3908, 17.3069], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/**
 * Hämtar lattitud och longitud för inmatad plats
 * @param {string} location - den inmatade platsen
 * @returns {object} - Lattitud och longitud
 */

async function hittaPlats(location) {
    const url = `https://nominatim.openstreetmap.org/search?${new URLSearchParams({ format: "json", q: location })}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Misslyckad hämtning");
    }

    const data = await response.json();

    return {
        lat: Number(data[0].lat),
        lon: Number(data[0].lon)
    };
}

/**
* Vid klick på "Sök".
* Hämtar inmatad text, hämtar koordinater från Nominatim,
* sätter markör på platsen.
*
* @param {Event} event - submit-eventet för formuläret
*/
document.getElementById("sökfunktion").addEventListener("submit", async (event) => {
    event.preventDefault();
    const location = document.getElementById("platssök").value.trim();
    if (!location) return;

    try {
        const coords = await hittaPlats(location);
        map.setView([coords.lat, coords.lon], 13);
        L.marker([coords.lat, coords.lon]).addTo(map);
    } catch (err) {
        alert(err.message);
    }
});
