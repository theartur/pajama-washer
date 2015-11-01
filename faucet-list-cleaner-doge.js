var fs = require('fs');
var urlParse = require('url');

var original = fs.readFileSync("clean-addr-doge.txt", 'utf8');

//                     <a href="leave?url=http%3A%2F%2Fbtchd.com" target="_blank">
//                     
//                                         <a href="leave?url=
//                                         http%3A%2F%2Fbtchd.com
//                                         " target="_blank">



// Faucetz.extracted = {
//     "wallet": "DTGBAyUM2t5qz3qQAMyUA6cwWvHnM6WjZ4",
//     "results": [
//         {
//             "clean": "true",
//             "reward": "index satoshi",
//             "interval": "0 min",
//             "description": "timestamp",
//             "link": "http://playbitco.in/?ref=DTGBAyUM2t5qz3qQAMyUA6cwWvHnM6WjZ4",
//             "name": "playbitco.in",
//             "highestdailypayout": "0 satoshi"
//         }

//     ]
// };




var better = original
    .replace(/[\t ]*<a href="leave\?url=/g, '') // strip begins
    .replace(/" target="_blank">/g, '') // strip ends
    .split("\n");

var lista = [];
var listaRaw = better;
    
listaRaw.forEach(function (addr) {
    var url = unescape(addr);

    if (url !== "") {
        lista.push(url);
    }
});

function formatFinalList(list) {
    var goodList = [];
    list.forEach(function (addr, i) {
        if (addr !== "") {
            var parsed = urlParse.parse(addr);
            var query = parsed.search || "";
            var title = parsed.hostname || "";
            var url = addr.substr(0, addr.length - query.length);
            url += "?r=DTGBAyUM2t5qz3qQAMyUA6cwWvHnM6WjZ4";
            
            var cleanFaucet = {
                "clean": "true",
                "reward": (lista.length - i) + " satoshi",
                "interval": "0 min",
                "description": +new Date,
                "link": url,
                "name": title,
                "highestdailypayout": "0 satoshi"
            };
            
            goodList.push(cleanFaucet);
        }
    });
    
    return goodList;
}


//   'http://coinsbit.in',                                                                                                                                                                                      
//   'http://cryptofree.info/',                                                                                                                                                                                 
//   'http://waterbitco.in/?track=faucetbox',   
//   'http://faucetmonkey.com/bitcoin.php',     
//   'http://hundredakerwood.com/faucet-BTC',  
//   'http://playbitco.in/?track=faucetbox',
//   'http://www.bitcoinvsprice.com/?page=faucet&amp;ref=fbox',
//   'http://www.cryptoblox.com/faucets/BitCoin/', 
//   'http://xn-----7kcbbbr8aaficfrsjefbfd6f8fydh.xn--j1amh/', 
    
    {
//             "clean": "true",
//             "reward": "index satoshi",
//             "interval": "0 min",
//             "description": "timestamp",
//             "link": "http://playbitco.in/?ref=DTGBAyUM2t5qz3qQAMyUA6cwWvHnM6WjZ4",
//             "name": "playbitco.in",
//             "highestdailypayout": "0 satoshi"
//         }
}

// console.log(formatFinalList(lista));

var payload = 'Faucetz.doge = {' +
    '"wallet": "DTGBAyUM2t5qz3qQAMyUA6cwWvHnM6WjZ4",' +
    '"results": ' + JSON.stringify(formatFinalList(lista)) +
'};';

fs.writeFile("faucetz-list-clean-doge.js", payload, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Clean faucetz available in 'faucetz-list-clean-doge.js'");
});