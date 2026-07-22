// PizzaMaster v0.1

const hydro = document.getElementById("hydro");
const hydroValue = document.getElementById("hydroValue");

const salz = document.getElementById("salz");
const salzValue = document.getElementById("salzValue");

hydro.addEventListener("input", () => {
    hydroValue.textContent = hydro.value + "%";
});

salz.addEventListener("input", () => {
    salzValue.textContent = salz.value + "%";
});

function berechnen() {

    const anzahl = Number(document.getElementById("anzahl").value);
    const gewicht = Number(document.getElementById("gewicht").value);

    const hydration = Number(hydro.value);
    const salzProzent = Number(salz.value);

    const hefeArt = document.getElementById("hefe").value;

    const gesamtTeig = anzahl * gewicht;

    const faktor = 1 + (hydration / 100) + (salzProzent / 100);

    const mehl = gesamtTeig / faktor;
    const wasser = mehl * hydration / 100;
    const salzGramm = mehl * salzProzent / 100;

    // Basis:
    // 668 g Mehl = 2 g Frischhefe

    const frischhefe = mehl / 668 * 2;

    let hefe;

    if (hefeArt === "Frischhefe") {
        hefe = frischhefe;
    } else {
        hefe = frischhefe / 3;
    }

    document.getElementById("mehl").textContent =
        mehl.toFixed(1) + " g";

    document.getElementById("wasser").textContent =
        wasser.toFixed(1) + " g";

    document.getElementById("salzErgebnis").textContent =
        salzGramm.toFixed(1) + " g";

    document.getElementById("hefeErgebnis").textContent =
        hefe.toFixed(1) + " g";

    document.getElementById("gesamt").textContent =
        gesamtTeig.toFixed(0) + " g";
}

berechnen();
