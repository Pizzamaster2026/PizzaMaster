function berechnen() {

    const anzahl = Number(document.getElementById("anzahl").value);
    const gewicht = Number(document.getElementById("gewicht").value);
    const hydration = Number(document.getElementById("hydro").value);

    const gesamtTeig = anzahl * gewicht;

    const mehl = gesamtTeig / (1 + hydration / 100 + 0.03);
    const wasser = mehl * hydration / 100;
    const salz = mehl * 0.03;

    // Basis: 2 g Frischhefe für 668 g Mehl
    const hefe = mehl / 668 * 2;

    document.getElementById("mehl").innerHTML =
        mehl.toFixed(0) + " g";

    document.getElementById("wasser").innerHTML =
        wasser.toFixed(0) + " g";

    document.getElementById("salz").innerHTML =
        salz.toFixed(1) + " g";

    document.getElementById("hefe").innerHTML =
        hefe.toFixed(1) + " g";
}

window.onload = berechnen;
