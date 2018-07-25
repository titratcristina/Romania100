# Romania100
România100 este o platformă de tip one page care îmbină istoria, cultura şi frumuseţea țării cu ocazia sarbatoriri Centenatul Marii Uniri.
Pagina este împărțită în mai multe secțiuni, prima cea de intro conține un text informativ despre centenar și un buton care conduce la secțiunea dedicată informațiilor istorice.
După intro urmează o listă dispusă sub forma unor carduri pe orizontală cu orașele de mare interes din țară. Cardul orașului este format din imaginea acestuia, numele, o scurtă descriere și două butoane unul pentru like, iar celălalt deschide un modal cu un meniu, unde utilizatorul poate vedea atracțiile turistice din oraș sau zonă și poate lăsa un review.
În urmatoarea secțiune se află o hartă cu pinuri în locțiile cele mai frumoase din țară, acesta fiind făcută cu ajutorul Google Maps.
În pagină mai sunt două secțiuni, una destinată gurmanzilor unde sunt carduri cu mancarea tradițională si un buton care deschide un modal în care se află o hartă cu restaurantele care servesc mâncarea tradițională, iar în cealaltă se află carduri cu tradiții însoțite de câteva informații.

Orașele sunt preluate din baza de date MongoDB, iar pe baza unui API cu ajutorul AngularJS sunt dispuse în pagină. Cand utilizatorul dă like se apelează API endpointul de add like, iar serverul efectuează incrementarea în Mongo și în același timp pe client se memorează la ce a dat like într-o variabilă tip array cu un boolean pentru fiecare oraș, iar pentru persistență se folosește un cookie care conține exact această variabilă, astfel utilizatorul la următoarea vizită poate vedea like-urile date și desigur poate da dislike fiind apelat endpointul care scade valoarea de likes din Mongo. Utilizatorul poate adăuga comantarii, endpointul de add review este apelat, iar serverul răspunde cu o notificare socket.io către toți clienții conectați după o adăugare de review, cât și după una de like. Astfel comentariile și like-urile sunt actualizate în timp real pentru toți utilizatorii conectați.



## Tehnologiile folosite
Pentru realizarea paginii am folosit urmatoarele tehnologii:
- HTML
- CSS
- JavaScript
- AngularJS
- Node.js
- jQuery
- Bootstrap
- JSON
- MongoDB