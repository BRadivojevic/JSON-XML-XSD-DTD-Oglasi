const exp = require("constants");
const fs = require("fs");
const PATH = "oglasi.json";

let procitajPodatke = () => {
  let oglas = fs.readFileSync(PATH, (err, data) => {
    if (err) throw err;
    return data;
  });
  return JSON.parse(oglas);
};

let snimiOglas = (data) => {
  fs.writeFileSync(PATH, JSON.stringify(data));
};

exports.Oglasi = () => {
  return procitajPodatke();
};

exports.dodajOglas = (noviOglas) => {
  let id = 1;
  let oglasi = this.Oglasi();
  if (oglasi.length > 0) {
    id = oglasi[oglasi.length - 1].id + 1;
  }
  noviOglas.id = id;
  oglasi.push(noviOglas);
  snimiOglas(oglasi);
};

exports.izbrisiOglas = (id) => {
  snimiOglas(this.Oglasi().filter((oglas) => oglas.id != id));
};

exports.prihvatiOglasPoID = (id) => {
  return this.Oglasi().find((x) => x.id == id);
};

exports.izmeniOglas = (id, body) => {
  let oglasi = this.Oglasi();
  let index = oglasi.findIndex((x) => x.id == id);
  oglasi[index] = body;
  snimiOglas(oglasi);
};

exports.prihvatiOglasPoCeni = (cena) => {
  return this.sviOglasi().filter(
    (oglas) => parseInt(oglas.cena) >= parseInt(cena)
  );
};

exports.prihvatiOglasPoKategoriji = (kategorija) => {
  return this.sviOglasi().filter((oglas) =>
    oglas.kategorija.toLowerCase().includes(kategorija.toLowerCase())
  );
};
