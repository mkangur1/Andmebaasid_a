# 28.11.2023

- Lisatud endpoindid tootjate, kasutajate ning varuosade kustutamiseks meetodil, kus tehakse "soft-delete", ehk lisatakse väärtus deletedDate väljale.
- Lisatud endpoindid tootjate, kasutajate ning varuosade muutmiseks, millega luuakse ka ühtlasi väärtus sql tabeli updatedDate lahtrisse.
- Lisatud kustutamine vastavatesse servisitesse ning kontrolleritesse.
- Lisatud muutmine manufacturer, users, spares moodulite jaoks.
- Viidud andmebaas üle dockeri andmebaasile, erinevalt eelnevalt lokaalselt failis olnud andmebaasile.
- Muudetud kõik failid vastavaks mysql2 kasutamiseks.

Käivitamine ja Dockeri sql andmebaasi loomine peale repositooriumi kloonimist:
docker desktop https://www.docker.com/products/docker-desktop/

Visual studio code kaustast avatud terminalis:
npm install
npm install mysql2
docker run -p 3306:3306 -d -v data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysecret-pw mysql

kus järgnevad elemendid tähistavad:
-p 3306:3306 - portide suunamine
-d - konteineri käivitamine taustal
-v data:/var/lib/mysql - andmete salvestamine oma failisüsteemi
-e MYSQL_ROOT_PASSWORD=mysecret-pw - MySQL-i parool
mysql - image

Edasi dockeris Actions all - open in terminal
Edasi terminalis - mysql -u root -p, sisestad parooli mysecret-pw
kopeerid repositooriumis oleva SQL kaustas init.sql sisu ning siis seed.sql sisu, mis loob vastava andmebaasi, kui seda juba pole loodud.


npm start


Võtad eelnevalt paigaldatud thunder client laienduse VSC:
Kasutaja sisse logimine:
LOGIN: thunder client POST- localhost:3000/login
body- json
{
  "email": "mati@maasikas.ee",
  "password": "mati"
}


kopeerid tokeni parempoolsest RESPONSE aknast ja sisestad selle Auth alla.
{
  "success": true,
  "message": "User logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IlVzZXIiLCJpYXQiOjE3MDExMDYzMzYsImV4cCI6MTcwMTEwOTkzNn0.gGZb3jz1HNj63jfDE-zXjbYTm6OAgIne5Ad-YSkTHXE"
}

### Notes for myself
Ära tee esimesena koolitükke, mille tähtaeg on kuu aja pärast, vaid neid, mille tähtaeg on esimesena (ära tee neid viimasena, kui teised tehtud), siis ei jää esitamine viimasesse õhtusse. Ära unusta .gitignore kausta node_modules märkimist.


# Tagasiside 30.10

Keeruline- ei oska kusagilt dokumenteerimisega pihta hakata, kui kood ja selle sisu elab juba oma elu, kas silmas peab pidama MFN nõudeid?
Ilma loengulisa Youtube ning kolmandas loengus kaasa tegemata ei oleks võimalik olnud seda saba ära teha autentimise/autoriseerimise näol ilmselt.
Juhend tokenite ja logini jaoks:
https://www.youtube.com/watch?v=EmjsEYNgi-c



Lisaks pole mahti olnud uurida, kuidas käib loengus mainitud CoPiloti paigaldus.

Node_modules kaust githubis, tean, et seda ei tohiks teha aga lihtsam kui kasutad mitut enda arvutit ning vahelduvalt, siis kui korraga uuendad ka seda. Hiljem vea ja konkreetse käsurea ülesleidmine võib võtta märksa kauem aega kui push/pull kogu repole.

## Tagasiside 19.10

Olles natuke ajahädas, sai kodutöö tehtud väikese viitega. Isegi 061023 klassis kaasa tehtud põhja kasutades, võttis osade kohtade peal errorite lahendamine omajagu aega.
Näiteks lõpuni ma ei saanudki aru, miks kasutajate listi tõmmates parooli eemaldamine toimib, aga kui ma näiteks katsetasin sama moodi, et mingil konkreetsel mudelil mõni osa ära eemaldada, siis ta ei lasknud seda teha ning andis erroriks et value is not declared, kuigi oli kõik korras ja olemas. Middleware on klassis kaasa tehtud loggeri osa- aus põhjus- aja puudus, mis loodetavasti leebub peagi.



## Siia tuleb ajas arendatav ja järjest täiendatav varuosade andmebaas


## Enne 18.10.2023>

Plaan on hakata arendama arvuti varuosade andmebaasi.

## Funktsionaalsus

On kasutaja ja on administraator.
Kasutaja saab vaadata laos olevate varuosade nimistut ning administraator saab neid muuta ja lisada vastavalt vajadusele.


## Ressurssideks saavad olema 
* Kasutaja
  * id,
  * eesnimi,
  * perekonnanimi,
  * email,
  * parool,
  * roll (admin/reader))
* Varuosa
  * id,
  * tüüp,
  * vanus,
  * liik
* Varuosa staatus
  * id,
  * staatus,
  * asukoht laos
* Varuosa tootja
  * id,
  * tüüp,
  * riik

## Esialgsed marsruudid 
- /users 
  - /users/:id
  - /users/:firstName
  - /users/:lastName
  - /users/:email
  - /users/:password
  - /users/:speciality

- /detailStatus
  - /detailStatus/:id  
  - /detailStatus/:status
  - /detailStatus/:location

- /details 
  - /details/:id
  - /details/:type
  - /details/:age
  - /details/:group
  - /details/:status

- /manufacturer
  - /manufacturer/:id
  - /manufacturer/:type
  - /manufacturer/:country

Kasutatud terminali käsud:

npm install jsonwebtoken
npm install json types?
npm i -S jsonwebtoken
copilot install?
npm i --save-dev @types/jsonwebtoken


# Dokumentatsioon

# Dokumentatsioon API kasutamiseks
## Paigaldus ja githubist kloonimine:
Repositoorium, kust kloonida:
https://github.com/TLUHK-RIF22/Programmeerimine_II_Martin_Kangur

Eeldame, et kliendil on olemas varasem kasutuskogemus programmiga Visual Studio code ning programmiga nimega Docker desktop. Kuna hetkel puudub antud programmil antud aine raames veebi kasutajaliides, siis tuleb githubi paigaldada Thunder client laiendus (kui seda juba ei ole).

## Paigaldus
Repositooriumist Code ning seejärel open with GitHub Desktop.
Kui repositoorium on kenasti kloonitud/laetud ning avatud Visual studio codega, siis:
-	Parem hiireklahv Varuosad_API peal ning Open in integrated terminal.
-	Avaneb terminali aken, sinna kirjutada npm install.
-	Seejärel npm install mysql2
-	Seejärel docker run -p 3306:3306 -d -v data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysecret-pw mysql
-	Kus järgnevad elemendid tähistavad:
•	-p 3306:3306 - portide suunamine
•	d - konteineri käivitamine taustal
•	-v data:/var/lib/mysql - andmete salvestamine oma failisüsteemi
•	-e MYSQL_ROOT_PASSWORD=mysecret-pw - MySQL-i parool
•	mysql – image
Seejärel avame Docker Desktopi ning võtame Containers vaate alt vastava loodud konteineri.
-	Seejärel klahvivajutus kolme täpi peal ning open in terminal.
-	Edasi seejärel terminalis sisestad  mysql -u root -p, misjärel terminal küsib parooli, antud juhul parooliks on nagu ka varasemalt VSC terminalis lisatud parool mysecret-pw.
-	Seejärel tuleb liikuda tagasi VSC ning kausta SQL, kus on kaks faili, üks init.sql ning teine on seed.sql. Init.sql sisaldab vajaliku, et luua andmebaas ning seed.sql sisestab andmebaasi „default“ andmed. 
-	Kopeerime init.sql sisu Dockeri terminali aknasse ning vajutame enter, luuakse andmebaas ning vajalikud tabelid.
-	Kopeerime seed.sql sisu Dockeri terminali aknasse ning vajutame enter, sisestatakse varem loodud andmebaasi vajalik default data.
-	Palju õnne, API esmane paigaldus on tehtud.
 
## Sisse logimine
Kui lõime esmast andmebaasi, lõime ka kaks kasutajat. Juhan Juurikas- juhan@juurikas.ee,  parooliga mati, kes on ka ühtlasi Admin ning Mati Maasikas mati@maasikas.ee , parooliga mati, kes on user ehk kasutaja rollis. 
-	VSC lähme terminali ning kirjutame käsu npm start, kui kõik läks siiani edukalt, siis peaks Teile tulema teade „App is running on port 3000“ terminali.
-	Avame thunder client extensioni ning kasutame POST meetodit, aadressil localhost:3000/login. Body- Json ning üks kahest kasutajast:
{
  "email": "mati@maasikas.ee",
  "password": "mati"
}
-	Parempoolsesse Response aknasse kuvatakse kas sucess oli true või false, message“ user logged in“, kui on õnnestunud ning token.
-	Liigume Auth alla ning sealt Bearer ja kopeerime varem saadud Tokeni sinna.
## Erinevate moodulite kasutamine
-	Listi vaatamine, kui olete sisse loginud GET meetod, localhost:3000/manufacturer ning Send, parempoolsesse aknasse kuvatakse manufacturer tabelisse sisestatud andmed.
-	Tootja saamine ID järgi, GET meetor, localhost:3000/manufacturer/1, kus 1 tähendab id:1. Parempoolsesse aknasse kuvatakse ID1 tootja.
-	Tootja LOOMISEKS, POST meetod, localhost:3000/manufacturer ning Send, eeldusel, et Body Json alt on täidetud varem nõutud väljad: name, title, description. Seejärel kuvatakse õnne korral parempoolsesse aknasse success:true, message: manufacturer created, manufacturer id. 
-	Tootja KUSTUTAMISEKS, DELETE meetod, localhost:3000/:id, kus id asemele tuleb panna id number.  Vajalik tootja ID, saab kätte näiteks varem näidatud GET meetodil listist. Pole vajalik Json aknasse midagi täiendavalt lisada.
-	Muutmiseks, kasutame PUT meetodit, localhost:3000/:id, kus id asemele tuleb panna id number, mida muuta soovitakse. Vajalik andmete uuendamiseks body- json aknas nimi, tiitel, kirjeldus. Näide:
-	{
 	   "name": "AMD_updated",
    "title": "Advanced Micro Devices",
   "description": "A multinational semiconductor company, very famous."
}
-	Kui muutmine õnnestus, siis kuvatakse teade „ Manufacturer updated“




## NB! Sama loogika on kõikide endpointide puhul.
### app.use('/users', usersRoutes);
- router.post('/', usersControllers.createUser);,

- router.get('/', isAdmin, usersControllers.getUsers);,

- router.get('/:id', usersControllers.getUserById);,

- router.delete('/:id', usersControllers.deleteUser);,

### app.use('/statuses', statusesRoutes);
- router.get('/s', statusesControllers.getStatuses);,

- router.get('/:id', statusesControllers.getStatusById);
### app.use('/spares', sparesRoutes);
- router.get('/', sparesControllers.getSpares);,

- router.get('/:id', sparesControllers.getSparesById);,

- router.post('/', sparesControllers.createSpare);,

- router.delete('/:id', sparesControllers.deleteSpare);,

- router.put(':id', sparesControllers.updateSpare);
### app.use('/manufacturer', manufacturerRoutes);
- router.get('/', manufacturerControllers.getManufacturers);,

- router.get('/:id', manufacturerControllers.getManufacturersById);,

- router.post('/', manufacturerControllers.createManufacturer);,

- router.delete('/:id', manufacturerControllers.deleteManufacturer);,

- router.put('/:id', manufacturerControllers.updateManufacturer);



