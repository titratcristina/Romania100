//activarea scroll-ului smooth
var scroll = new SmoothScroll('a[href*="#"]:not([data-easing]):not([data-toggle="tab"])');

//functia pentru deshiderea modalului cu atractiile orasului
function openModal() {
    $('#Modal').modal('show');
}

//in modalul din zona atractii exista un meniu care afiseaza in functie de tab atractiile sau panorama
$('#nav-tab a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');
});

//activarea functiei care ascunde/ afiseaza un div/o portiune de text 
$('.collapse').collapse()

// funcţia care stochează vizitatorii într-un cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// funcţia care returnează valoarea unui cookie specific
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
