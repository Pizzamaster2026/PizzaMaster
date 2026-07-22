function berechnen() {

    // Eingaben
    const anzahl = Number(document.getElementById("anzahl").value);
    const gewicht = Number(document.getElementById("gewicht").value);
    const hydration = Number(document.getElementById("hydro").value);
    const hefeart = document.getElementById("hefeart").value;

    // Originalrezept
    const BASIS_MEHL = 668;
    const BASIS_WASSER = 436;
    const BASIS_SALZ = 20;
    const BASIS_HEFE = 2;
    const BASIS_TEIG = 4 * 280;

    // Gesamtteig
    const gesamtTeig = anzahl * gewicht;

    // Skalierungsfaktor
    const faktor = gesamtTeig / BASIS_TEIG;

    // Zutaten berechnen
    const mehl = BASIS_MEHL * faktor;
    const wasser = mehl * hydration / 100;
    const salz = BASIS_SALZ * faktor;

    let hefe;

    if (hefeart === "frisch") {
        hefe = BASIS_HEFE * faktor;
    } else {
        // Umrechnung Frischhefe -> Trockenhefe
        hefe = (BASIS_HEFE / 3) * faktor;
    }

    // Ausgabe
    document.getElementById("mehl").textContent =
        mehl.toFixed(0) + " g";

    document.getElementById("wasser").textContent =
        wasser.toFixed(0) + " ml";

    document.getElementById("salz").textContent =
        salz.toFixed(1) + " g";

    document.getElementById("hefe").textContent =
        hefe.toFixed(2) + " g";
}

window.onload = berechnen;
