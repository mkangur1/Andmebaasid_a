# Andmebaasid_a
Andmebaaside arvestuse repositoorium.

Õppeaines Programmeerimine II loodud iseseisva töö rakendus.
Arvutivaruosade andmebaas, kus kasutaja saab lisada, luua, muuta vaadata kasutajaid, arvutite varuosasid.
Neil on oma korda küljes tootjad ning staatused.

Andmebaas on loodud lokaalselt Dockeri baasile.

SQL käsud andmebaasi ja tabelite loomiseks on sql kaustas init.sql failis.
Andbemaasi esialgne sisu (default), on sql kaustas seed.sql failis.
(link)

Iga ressursi loomisel, muutmisel, kustutamisel, kuvamisel id vm järgi kasutatakse mysql2.
Ressursid asuvad komponentide (components) kaustas, igal Servicel, kus on sees vastav SQL käsk, on lisaks ka kaustas esindatud kontroller ning moodul:
(link)

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

