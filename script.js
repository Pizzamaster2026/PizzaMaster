const BASIS = {
    pizzen: 4,
    gewicht: 280,
    hydration: 65,
    salz: 3.0,
    hefe: 2
};

const pizzen = document.getElementById("pizzen");
const gewicht = document.getElementById("gewicht");
const hydration = document.getElementById("hydration");
const hydroText = document.getElementById("hydroText");
const salz = document.getElementById("salz");
const hefeart = document.getElementById("hefeart");
const gare = document.getElementById("gare");
const temperatur = document.getElementById("temperatur");

const mehlAusgabe = document.getElementById("mehl");
const wasserAusgabe = document.getElementById("wasser");
const salzAusgabe = document.getElementById("salzErgebnis");
const hefeAusgabe = document.getElementById("hefe");
const hefeTitel = document.getElementById("hefeTitel");
const gesamtAusgabe = document.getElementById("gesamt");
const tipp = document.getElementById("tipp");

function berechne() {

    hydroText.textContent = hydration.value + " %";

    const zielGewicht =
        Number(pizzen.value) *
        Number(gewicht.value);

    const hydro =
        Number(hydration.value) / 100;

    const salzProzent =
        Number(salz.value) / 100;

    const mehl =
        zielGewicht /
        (1 + hydro + salzProzent);

    const wasser =
        mehl * hydro;

    const salzGramm =
        mehl * salzProzent;

    let hefe =
        BASIS.hefe;

    hefe *= 24 / Number(gare.value);

    if (Number(temperatur.value) > 20) {

        hefe *= 20 / Number(temperatur.value);

    } else {

        hefe *= 1 + ((20 - Number(temperatur.value)) * 0.05);

    }

    hefe *= mehl / 668;

    if (hefeart.value === "trocken") {

        hefe /= 3;

        hefeTitel.textContent = "🍺 Trockenhefe";

    } else {

        hefeTitel.textContent = "🍺 Frischhefe";

    }

    const gesamt =
        mehl +
        wasser +
        salzGramm +
        hefe;

    mehlAusgabe.textContent =
        mehl.toFixed(0) + " g";

    wasserAusgabe.textContent =
        wasser.toFixed(0) + " ml";

    salzAusgabe.textContent =
        salzGramm.toFixed(1) + " g";

    hefeAusgabe.textContent =
        hefe.toFixed(2) + " g";

    gesamtAusgabe.textContent =
        gesamt.toFixed(0) + " g";

    if (hydration.value <= 60) {

        tipp.textContent =
        "Fester Teig – ideal für Anfänger.";

    }

    else if (hydration.value <= 68) {

        tipp.textContent =
        "Sehr ausgewogener Teig mit guter Verarbeitung.";

    }

    else if (hydration.value <= 75) {

        tipp.textContent =
        "Weicher Teig – etwas Erfahrung ist hilfreich.";

    }

    else {

        tipp.textContent =
        "Sehr hohe Hydration – nur für erfahrene Pizzabäcker.";

    }

}

document.querySelectorAll("input, select").forEach(element => {

    element.addEventListener("input", berechne);

    element.addEventListener("change", berechne);

});

berechne();
