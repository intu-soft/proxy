let counter = 5;
let periods = ["...", ".", ".."];
let periods_count = 0;

let _tempUrl = window.location.search.substring(1); //url에서 처음부터 '?'까지 삭제
let _tempArray = _tempUrl.split('!%*');
let _server = _tempArray[0].split('=')[1];
let _qs = _tempArray[1].split('qs=')[1];

function load() {
    gotoServer(_server, _qs);
}

function gotoServer(server, qs) {
    switch (server) {
        case 'google':
            window.location.href = ("http://patents.google.com/?q=" + qs + "&oq=" + qs);
            break;
        case 'uspto':
            window.location.href = ("http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm&r=0&p=1&f=S&l=50&Query=" + qs + "&d=PTXT");
            break;
        case 'kipris(kr)':
            searchKipris(decodeURI(qs).replaceAll("%3d", "=").replaceAll("%2b", "+"), true).replaceAll("%2f", "/");
            break;
        case 'kipris(!kr)':
            searchKipris(decodeURI(qs).replaceAll("%3d", "=").replaceAll("%2b", "+"), false);
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

function searchKipris(queryString, kr) {
    let form = document.createElement('form');

    let objs = document.createElement('input');
    objs.setAttribute('name', 'expression');
    objs.setAttribute('value', queryString);
    form.appendChild(objs);

    objs = document.createElement('input');
    objs.setAttribute('name', 'queryText');
    objs.setAttribute('value', queryString.split('\"').join("&quot;"));
    form.appendChild(objs);

    if (!kr) {
        objs = document.createElement('input');
        objs.setAttribute('name', 'collectionValues');
        objs.setAttribute('value', ['US_T.col', 'EP_T.col', 'WO_T.col', 'PAJ_T.col', 'CN_T.col', ]);
        form.appendChild(objs);
    } 

    form.setAttribute('method', 'post');
    form.setAttribute('Cookie', 'JSESSIONID=JtV3MmUbbCYZ8JVPkibxIfGrMEanqukZ4x7YDgELb1oa1VNUyWx5kqcKqctyDQdU.amV1c19kb21haW4va3BvcnRhbDQ=;');
    if (!kr) {
        form.setAttribute('action', "http://abpat.kipris.or.kr/abpat/resulta.do");
    } else {
        form.setAttribute('action', "http://kpat.kipris.or.kr/kpat/resulta.do");
    }
    document.body.appendChild(form);

    form.submit();

    if (!kr) {
        form.setAttribute('action', "http://abpat.kipris.or.kr/abpat/searchLogina.do?next=MainSearch");
        form.submit();
    }

    document.body.removeChild(form);
}

//replaceAll prototype 선언
String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}