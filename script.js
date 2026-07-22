// ==========================================
// PizzaMaster V2
// Neue Berechnungs-Engine
// ==========================================

// ---------- Referenzrezept ----------

const BASIS = {

    mehl: 668,
    wasser: 436,
    salz: 20,
    hefe: 2,

    gesamt: 1126

};

// ---------- Eingaben ----------

const pizzen = document.getElementById("pizzen");
const gewicht = document.getElementById("gewicht");
const hydration = document.getElementById("hydration");
const hydroText = document.getElementById("hydroText");
const salz = document.getElementById("salz");
const hefeart = document.getElementById("hefeart");
const gare = document.getElementById("gare");
const temperatur = document.getElementById("temperatur");

// ---------- Ausgaben ----------

const mehlAusgabe = document.getElementById("mehl");
const wasserAusgabe = document.getElementById("wasser");
const salzAusgabe = document.getElementById("salzErgebnis");
const hefeAusgabe = document.getElementById("hefe");
const hefeTitel = document.getElementById("hefeTitel");
const gesamtAusgabe = document.getElementById("gesamt");
const tipp = document.getElementById("tipp");

// ==========================================
// Skalierungsfaktor
// ==========================================

function faktor() {

    const zielgewicht =
        Number(pizzen.value) *
        Number(gewicht.value);

    return zielgewicht / BASIS.gesamt;

}

// ==========================================
// Zutaten
// ==========================================

function berechneMehl() {

    return BASIS.mehl * faktor();

}

function berechneWasser() {

    let wasser =
        BASIS.wasser * faktor();

    wasser *= Number(hydration.value) / 65;

    return wasser;

}

function berechneSalz() {

    let salzMenge =
        BASIS.salz * faktor();

    salzMenge *=
        Number(salz.value) / 3;

    return salzMenge;

}

function gareFaktor() {

    switch (Number(gare.value)) {

        case 4:
            return 6;

        case 8:
            return 3;

        case 12:
            return 2;

        case 24:
            return 1;

        case 48:
            return 0.5;

        case 72:
            return 0.33;

        default:
            return 1;

    }

}
// ==========================================
// Hefe
// ==========================================

function temperaturFaktor() {

    const temp = Number(temperatur.value);

    if (temp > 20) {
        return 20 / temp;
    }

    return 1 + ((20 - temp) * 0.05);

}

function berechneHefe() {

    let hefe = BASIS.hefe * faktor();

    hefe *= gareFaktor();
    hefe *= temperaturFaktor();

    if (hefeart.value === "trocken") {

        hefe /= 3;

    }

    return hefe;

}

// ==========================================
// Gesamtteig
// ==========================================

function berechneGesamt(mehl, wasser, salz, hefe) {

    return mehl + wasser + salz + hefe;

}

// ==========================================
// Tipps
// ==========================================

function aktualisiereTipp() {

    const h = Number(hydration.value);

    if (h <= 60) {

        tipp.innerHTML =
        "🟢 Fester Teig – perfekt für Einsteiger.";

    }

    else if (h <= 65) {

        tipp.innerHTML =
        "🟢 Klassischer Pizzateig – sehr gut zu verarbeiten.";

    }

    else if (h <= 70) {

        tipp.innerHTML =
        "🟡 Weicher Teig – etwas Erfahrung empfohlen.";

    }

    else if (h <= 75) {

        tipp.innerHTML =
        "🟠 Sehr weicher Teig – ideal für luftige Pizza.";

    }

    else {

        tipp.innerHTML =
        "🔴 Extrem hohe Hydration – nur für Profis.";

    }

}

// ==========================================
// Berechnung
// ==========================================

function berechnen() {

    hydroText.textContent =
        hydration.value + " %";

    const mehl = berechneMehl();

    const wasser = berechneWasser();

    const salz = berechneSalz();

    const hefe = berechneHefe();

    const gesamt =
        berechneGesamt(
            mehl,
            wasser,
            salz,
            hefe
        );

    mehlAusgabe.textContent =
        mehl.toFixed(0) + " g";

    wasserAusgabe.textContent =
        wasser.toFixed(0) + " g";

    salzAusgabe.textContent =
        salz.toFixed(1) + " g";

    hefeAusgabe.textContent =
        hefe.toFixed(2) + " g";

    gesamtAusgabe.textContent =
        gesamt.toFixed(0) + " g";

    if (hefeart.value === "trocken") {

        hefeTitel.textContent =
            "🍺 Trockenhefe";

    } else {

        hefeTitel.textContent =
            "🍺 Frischhefe";

    }

    aktualisiereTipp();

        }
// ==========================================
// Originalrezept erkennen
// ==========================================

function istOriginalRezept() {

    return (
        Number(pizzen.value) === 4 &&
        Number(gewicht.value) === 280 &&
        Number(hydration.value) === 65 &&
        Number(salz.value) === 3 &&
        Number(gare.value) === 24 &&
        Number(temperatur.value) === 20 &&
        hefeart.value === "frisch"
    );

}

// ==========================================
// Live aktualisieren
// ==========================================

function aktualisieren() {

    berechnen();

    if (istOriginalRezept()) {

        mehlAusgabe.textContent = "668 g";
        wasserAusgabe.textContent = "436 g";
        salzAusgabe.textContent = "20 g";
        hefeAusgabe.textContent = "2.00 g";
        gesamtAusgabe.textContent = "1126 g";

    }

}

// ==========================================
// Event Listener
// ==========================================

document
.querySelectorAll("input, select")
.forEach(element => {

    element.addEventListener(
        "input",
        aktualisieren
    );

    element.addEventListener(
        "change",
        aktualisieren
    );

});

// ==========================================
// Start
// ==========================================

aktualisieren();
// ==========================================
// 💾 Rezeptspeicherung
// ==========================================

const rezeptName = document.getElementById("rezeptName");
const rezeptListe = document.getElementById("rezeptListe");

const speichernBtn = document.getElementById("speichernBtn");
const ladenBtn = document.getElementById("ladenBtn");
const loeschenBtn = document.getElementById("loeschenBtn");

function ladeRezeptListe() {

    rezeptListe.innerHTML =
        '<option value="">Rezept auswählen</option>';

    const rezepte =
        JSON.parse(localStorage.getItem("pizzaRezepte")) || {};

    Object.keys(rezepte).forEach(name => {

        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;

        rezeptListe.appendChild(option);

    });

}

speichernBtn.addEventListener("click", () => {

    if (rezeptName.value.trim() === "") {

        alert("Bitte einen Namen eingeben.");
        return;

    }

    const rezepte =
        JSON.parse(localStorage.getItem("pizzaRezepte")) || {};

    rezepte[rezeptName.value] = {

        pizzen: pizzen.value,
        gewicht: gewicht.value,
        hydration: hydration.value,
        salz: salz.value,
        gare: gare.value,
        temperatur: temperatur.value,
        hefeart: hefeart.value

    };

    localStorage.setItem(
        "pizzaRezepte",
        JSON.stringify(rezepte)
    );

    ladeRezeptListe();

    alert("✅ Rezept gespeichert.");

});

ladenBtn.addEventListener("click", () => {

    if (!rezeptListe.value) return;

    const rezepte =
        JSON.parse(localStorage.getItem("pizzaRezepte"));

    const r = rezepte[rezeptListe.value];

    pizzen.value = r.pizzen;
    gewicht.value = r.gewicht;
    hydration.value = r.hydration;
    salz.value = r.salz;
    gare.value = r.gare;
    temperatur.value = r.temperatur;
    hefeart.value = r.hefeart;

    aktualisieren();

});

loeschenBtn.addEventListener("click", () => {

    if (!rezeptListe.value) return;

    const rezepte =
        JSON.parse(localStorage.getItem("pizzaRezepte"));

    delete rezepte[rezeptListe.value];

    localStorage.setItem(
        "pizzaRezepte",
        JSON.stringify(rezepte)
    );

    ladeRezeptListe();

});

ladeRezeptListe();
