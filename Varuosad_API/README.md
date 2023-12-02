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
