function berechnen() {

    const anzahl = Number(document.getElementById("anzahl").value);
    const gewicht = Number(document.getElementById("gewicht").value);

    // Originalrezept
    const basisPizzen = 4;
    const basisGewicht = 280;

    const faktor = (anzahl * gewicht) / (basisPizzen * basisGewicht);

    const mehl = 668 * faktor;
    const wasser = 436 * faktor;
    const salz = 20 * faktor;
    const hefe = 2 * faktor;

    document.getElementById("mehl").innerHTML =
        mehl.toFixed(0) + " g";

    document.getElementById("wasser").innerHTML =
        wasser.toFixed(0) + " ml";

    document.getElementById("salz").innerHTML =
        salz.toFixed(1) + " g";

    document.getElementById("hefe").innerHTML =
        hefe.toFixed(1) + " g";
}

window.onload = berechnen;
