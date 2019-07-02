let counter = 5;
let periods = ["...", ".", ".."];
let periods_count = 0;

let _tempUrl = window.location.search.substring(1); //url에서 처음부터 '?'까지 삭제
let _tempArray = _tempUrl.split('!%*');
let _server = _tempArray[0].split('=')[1];
let _qs = _tempArray[1].split('qs=')[1];

function load() {
    if (_server === 'uspto') {
        gotoServer(_server, _qs);
        counter = 0;
    } else {
        document.getElementById('count').innerHTML = "Nevigated to the result page after 5 seconds.";
    }

    setInterval(function () {
        counter--;
        if (counter == 0) {
            gotoServer(_server, _qs);
        } else if (counter > 0) {
            document.getElementById('count').innerHTML = "Nevigated to the result page after " + String(counter) + " seconds.";
        } else if (counter < 0) {
            if (periods_count < 2) {
                periods_count++;
            } else {
                periods_count = 0;
            }
            document.getElementById('periods').innerHTML = periods[periods_count];
        }
    }, 1000);
}

function gotoServer(server, qs) {
    document.getElementById('count').style.marginLeft = '250px';
    document.getElementById('count').innerHTML = "Nevigating to the result page";
    document.getElementById('periods').innerHTML = periods[periods_count];

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

function searchKipris(queryString) {
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