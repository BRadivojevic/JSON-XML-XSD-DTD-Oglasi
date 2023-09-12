const { request, response } = require("express");
var express = require("express");
var servisOglasi = require("radSaOglasima");
var app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/Oglasi", (request, response) => {
  response.send(servisOglasi.sviOglasi());
});

app.get("/prihvatiOglasPoID/:id", (request, response) => {
  response.send(servisOglasi.getOglas(request.params["id"]));
});

app.post("/dodajOglas", (request, response) => {
  servisOglasi.addOglas(request.body);
  response.end("OK");
});

app.delete("/izbrisiOglas/:id", (request, response) => {
  servisOglasi.deleteOglas(request.params["id"]);
  response.end("OK");
});

app.get("/izmeniOglas/:id", (request, response) => {
  response.send(servisOglasi.getOglas(request.params["id"]));
});

app.post("/izmeniOglas/:id", (request, response) => {
  console.log(request.body);
  servisOglasi.izmeniOglas(request.params["id"], request.body);
  response.end("OK");
});

app.get("/filtKategorija/", (request, response) => {
  response.send(
    servisOglasi.prihvatiOglasPoKategoriji(request.query["kategorija"])
  );
});

app.get("/filtCena/", (request, response) => {
  response.send(servisOglasi.privatiOglasPoCeni(request.query["cena"]));
});

app.listen(port, () => {
  console.log(`server se startuje na portu ${port}`);
});
