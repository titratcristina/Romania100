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

