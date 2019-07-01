let counter = 5;
let periods = ["...", ".", ".."];
let periods_count = 0;

$(function () {
    setInterval(function () {
        counter--;
        if (counter == 0) {
            gotoServer();
        } else if (counter > 0) {
            $('#count').text("Nevigated to the result page after " + String(counter) + " seconds.");
        } else if (counter < 0) {
            $('#count').text("Nevigating to the result page" + periods[periods_count]);
            if (periods_count < 2) {
                periods_count++;
            } else {
                periods_count = 0;
            }
        }
    }, 1000);
})();

function gotoServer() {
    let _tempUrl = window.location.search.substring(1); //url에서 처음부터 '?'까지 삭제
    let _tempArray = _tempUrl.split('!%*');
    let server = _tempArray[0].split('=')[1];
    let qs = _tempArray[1].split('qs=')[1];
    switch (server) {
        case 'google':
            window.location.href = ("http://patents.google.com/?q=" + qs + "&oq=" + qs);
            break;
        case 'uspto':
            window.location.href = ("http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm&r=0&p=1&f=S&l=50&Query=" + qs + "&d=PTXT");
            break;
        case 'kipris':
            searchKipris(decodeURI(qs));
            break;
        case 'escapenet-en':
        case 'escapenet-fr':
        case 'escapenet-de': {
            let loc = server.split('-')[1];
            window.location.href = ("https://worldwide.espacenet.com/searchResults?submitted=true&locale=en_EP&DB=" + loc + ".worldwide.espacenet.com&ST=singleline&query=" + qs + "&Submit=Search");
        }
        default:
    }
}

function searchKipris(queryStringzz) {
    let form = document.createElement('form');
    let objs = document.createElement('input');

    objs.setAttribute('name', 'expression');
    objs.setAttribute('value', queryString);
    form.appendChild(objs);

    objs = document.createElement('input');

    objs.setAttribute('name', 'queryText');
    objs.setAttribute('value', queryString.split('\"').join("&quot;"));
    form.appendChild(objs);


    form.setAttribute('method', 'post');
    form.setAttribute('action', "http://kpat.kipris.or.kr/kpat/resulta.do");

    document.body.appendChild(form);

    form.submit();
    document.body.removeChild(form);
}