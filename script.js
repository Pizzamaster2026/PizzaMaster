// ================================
// PizzaMaster V2
// Berechnungs-Engine
// ================================

// Referenzrezept
const BASIS = {
    mehl: 668,
    wasser: 436,
    salz: 20,
    hefe: 2,
    pizzen: 4,
    gewicht: 280
};

// Eingaben
const pizzen = document.getElementById("pizzen");
const gewicht = document.getElementById("gewicht");
const hydration = document.getElementById("hydration");
const hydroText = document.getElementById("hydroText");
const salz = document.getElementById("salz");
const hefeart = document.getElementById("hefeart");
const gare = document.getElementById("gare");
const temperatur = document.getElementById("temperatur");

// Ausgaben
const mehlAusgabe = document.getElementById("mehl");
const wasserAusgabe = document.getElementById("wasser");
const salzAusgabe = document.getElementById("salzErgebnis");
const hefeAusgabe = document.getElementById("hefe");
const hefeTitel = document.getElementById("hefeTitel");
const gesamtAusgabe = document.getElementById("gesamt");
const tipp = document.getElementById("tipp");

function faktor(){

    return (

        Number(pizzen.value) *
        Number(gewicht.value)

    ) /

    (

        BASIS.pizzen *
        BASIS.gewicht

    );

}

function berechneMehl(){

    return BASIS.mehl * faktor();

}

function berechneWasser(mehl){

    return mehl * (Number(hydration.value)/100);

}

function berechneSalz(mehl){

    return mehl * (Number(salz.value)/100);

}

function gareFaktor(){

    switch(Number(gare.value)){

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

function temperaturFaktor(){

    const temp = Number(temperatur.value);

    if(temp>20){

        return 20/temp;

    }

    return 1+((20-temp)*0.05);

}

function berechneHefe(mehl){

    let hefe = BASIS.hefe;

    hefe *= faktor();

    hefe *= gareFaktor();

    hefe *= temperaturFaktor();

    if(hefeart.value==="trocken"){

        hefe /=3;

    }

    return hefe;

}
function aktualisiereTipps(hydrationWert){

    if(hydrationWert<=60){

        tipp.textContent =
        "🟢 Fester Teig – ideal für Anfänger.";

    }

    else if(hydrationWert<=65){

        tipp.textContent =
        "🟢 Klassischer Pizzateig – leicht zu verarbeiten.";

    }

    else if(hydrationWert<=70){

        tipp.textContent =
        "🟡 Weicher Teig – benötigt etwas Übung.";

    }

    else if(hydrationWert<=75){

        tipp.textContent =
        "🟠 Sehr weicher Teig – für erfahrene Pizzabäcker.";

    }

    else{

        tipp.textContent =
        "🔴 Extrem hohe Hydration – nur für Profis.";

    }

}

function berechnen(){

    hydroText.textContent =
    hydration.value + " %";

    const mehl = berechneMehl();

    const wasser = berechneWasser(mehl);

    const salzMenge = berechneSalz(mehl);

    const hefe = berechneHefe(mehl);

    const gesamt =
        mehl +
        wasser +
        salzMenge +
        hefe;

    mehlAusgabe.textContent =
        mehl.toFixed(0) + " g";

    wasserAusgabe.textContent =
        wasser.toFixed(0) + " g";

    salzAusgabe.textContent =
        salzMenge.toFixed(1) + " g";

    hefeAusgabe.textContent =
        hefe.toFixed(2) + " g";

    gesamtAusgabe.textContent =
        gesamt.toFixed(0) + " g";

    if(hefeart.value==="trocken"){

        hefeTitel.textContent =
        "🍺 Trockenhefe";

    }

    else{

        hefeTitel.textContent =
        "🍺 Frischhefe";

    }

    aktualisiereTipps(Number(hydration.value));

}

document
.querySelectorAll("input,select")
.forEach(element=>{

    element.addEventListener(
        "input",
        berechnen
    );

    element.addEventListener(
        "change",
        berechnen
    );

});

berechnen();
