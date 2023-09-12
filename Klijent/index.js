const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const axios = require("axios");
const { response } = require("express");
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let procitajPogledZaNaziv = (naziv) => {
  return fs.readFileSync(
    path.join(__dirname + "/view/" + naziv + ".html"),
    "utf-8"
  );
};

app.get("/", (req, res) => {
  res.send(procitajPogledZaNaziv("index"));
});

app.get("/Oglasi", (req, res) => {
  axios
    .get("http://localhost:3000/Oglasi")
    .then((response) => {
      let prikaz = "";
      let td = `<td>Kategorija</td>
      <td>Tekst</td>
      <td>Cena</td>`;
      response.data.forEach((element) => {
        prikaz += `
                <tr>
                    <td>${element.kategorija}</td>
                    <td>${element.tekst}</td>
                    <td>${element.cena}</td>
                    <td><a href="/detaljnije/${element.id}">Detaljnije</a></td>
                    <td><a href="/izmeniOglas/${element.id}">Izmeni</a></td>
                    <td><a href="/izbrisiOglas/${element.id}">Obrisi</a></td>
                </tr>
            `;
      });
      res.send(
        procitajPogledZaNaziv("Oglasi")
          .replace("#{data}", prikaz)
          .replace("##td", td)
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/detaljnije/:id", (req, res) => {
  axios
    .get(`http://localhost:3000/prihvatiOglasPoID/${req.params["id"]}`)
    .then((response) => {
      let tagovi = response.data.tagovi;
      let resOzn = "";
      for (const tag of tagovi) {
        resOzn += `
          <span class="badge bg-success">${tag}</span>
        `;
      }
      let td = `<td>Kategorija</td>
      <td>Datum</td>
      <td>Cena</td>
      <td>Tekst</td>
      <td>Oznake</td>
      <td>E-mail</td>`;
      let prikaz = "";
      prikaz += `
                <tr>
                    <td>${response.data.kategorija}</td>
                    <td>${response.data.datum}</td>
                    <td>${response.data.cena}</td>
                    <td>${response.data.tekst}</td>
                    <td>${resOzn}</td>
                    <td>${response.data.email}</td>
                    <td><a href="/delete/${response.data.id}">Obrisi</a></td>
                </tr>
            `;
      res.send(
        procitajPogledZaNaziv("Oglasi")
          .replace("#{data}", prikaz)
          .replace("##td", td)
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/izbrisiOglas/:id", (req, res) => {
  axios.delete(`http://localhost:3000/izbrisiOglas/${req.params["id"]}`);
  res.redirect("/Oglasi");
});

app.get("/dodajOglas", (req, res) => {
  res.send(procitajPogledZaNaziv("dodajFormu"));
});

app.post("/dodajOglas", (req, res) => {
  axios.post("http://localhost:3000/dodajOglas", {
    kategorija: req.body.kategorija,
    datum: req.body.datum,
    cena: req.body.cena,
    tekst: req.body.tekst,
    oznake: req.body.oznake.split(","),
    email: req.body.email,
  });
  res.redirect("/Oglasi");
});

app.get("/izmeniOglas/:id", (req, res) => {
  axios
    .get(`http://localhost:3000/izmeniOglas/${req.params["id"]}`)
    .then((response) => {
      let id = response.data.id;
      let kategorija = response.data.kategorija;
      let datum = response.data.datum;
      let cena = response.data.cena;
      let tekst = response.data.tekst;
      let oznake = response.data.oznake;
      let email = response.data.email;
      let view = procitajPogledZaNaziv("forma");
      view = view.replace("##{ID}", id);
      view = view.replace("##{kategorija}", kategorija);
      view = view.replace("##{datum}", datum);
      view = view.replace("##{cena}", cena);
      view = view.replace("##{tekst}", tekst);
      view = view.replace("##{oznake}", oznake);
      view = view.replace("##{email}", email);
      res.send(view);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/izmeniOglas", (req, res) => {
  console.log(req.body);
  axios
    .post(`http://localhost:3000/izmeniOglas/${req.body.id}`, {
      id: parseInt(req.body.id),
      kategorija: req.body.kategorija,
      datum: req.body.datum,
      cena: parseInt(req.body.cena),
      tekst: req.body.tekst,
      oznake: req.body.oznake.split(","),
      email: req.body.email,
    })
    .catch((error) => {
      console.log("err");
    });
  res.redirect("/Oglasi");
});

app.post("/filtKategorija", (req, res) => {
  axios
    .get(
      `http://localhost:3000/filtKategorija?kategorija = ${req.body.kategorija}`
    )
    .then((response) => {
      let prikaz = "";
      let td = `<td>Kategorija</td>
    <td>Tekst</td>
    <td>Cena</td>`;
      response.data.forEach((element) => {
        prikaz += `
              <tr>
                  <td>${element.kategorija}</td>
                  <td>${element.tekst}</td>
                  <td>${element.cena}</td>
                  <td><a href="/detaljnije/${element.id}">Detaljnije</a></td>
                  <td><a href="/izmeniOglas/${element.id}">Izmeni</a></td>
                  <td><a href="/izbrisiOglas/${element.id}">Obrisi</a></td>
              </tr>
          `;
      });
      res.send(
        procitajPogledZaNaziv("Oglasi")
          .replace("#{data}", prikaz)
          .replace("##td", td)
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/filtCena", (req, res) => {
  axios
    .get(`http://localhost:3000/filtCena?cena=${req.body.cena}`)
    .then((response) => {
      let prikaz = "";
      let td = `<td>Kategorija</td>
    <td>Tekst</td>
    <td>Cena</td>`;
      response.data.forEach((element) => {
        prikaz += `
              <tr>
                  <td>${element.kategorija}</td>
                  <td>${element.tekst}</td>
                  <td>${element.cena}</td>
                  <td><a href="/detaljnije/${element.id}">Detaljnije</a></td>
                  <td><a href="/izmeniOglas/${element.id}">Izmeni</a></td>
                  <td><a href="/izbrisiOglas/${element.id}">Obrisi</a></td>
              </tr>
          `;
      });
      res.send(
        procitajPogledZaNaziv("Oglasi")
          .replace("#{data}", prikaz)
          .replace("##td", td)
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`klijent na portu ${port}`);
});
