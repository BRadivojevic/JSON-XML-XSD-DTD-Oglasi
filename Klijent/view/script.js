function Forma() {
  flag = true;
  if (document.querySelector("#kat").value == "") {
    document.getElementById("alert").innerHTML +=
      "Greska. Niste dodali kategoriju.\n";
    flag = false;
  }
  if (document.querySelector("#dat").value == "") {
    document.getElementById("alert").innerHTML +=
      "Greska. Niste dodali datum.\n";
    flag = false;
  }
  if (document.querySelector("#cena").value == "") {
    document.getElementById("alert").innerHTML +=
      "Greska. Niste dodali cenu.\n";
    flag = false;
  }
  if (
    document.querySelector("#tekst").value == "" ||
    document.querySelector("#tekst").value.lenght < 10 ||
    document.querySelector("#tekst").value.lenght > 180
  ) {
    document.getElementById("alert").innerHTML += "Proverite.\n";
    flag = false;
  }
  if (document.querySelector("#ozn").value == "") {
    document.getElementById("alert").innerHTML +=
      "Greska. Niste dodali oznake.\n";
    flag = false;
  }
  if (document.querySelector("#mail").value == "") {
    document.getElementById("alert").innerHTML +=
      "Greska. Niste dodali e-mail.\n";
    flag = false;
  }
  return flag;
}
