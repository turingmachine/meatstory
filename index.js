var soap = require('soap');
var express = require('express');
var https = require('https');
var parseString = require('xml2js').parseString;
var stringify = require('node-stringify');
var moment = require('moment');
moment.locale('de');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req,res) {
  res.sendfile('public/index.html');
});

var races = {
  0: 'Kreuzung',
  1: 'Holstein',
  100: 'Undefiniert',
  101: 'Pustertaler Sprinzen',
  102: 'Bordelaise',
  103: 'Low Line',
  104: 'Welsh Black',
  14: 'Hinterwaelder',
  2: 'Rotfleckvieh',
  21: 'Charolais',
  22: 'Limousin',
  23: 'Weissblaue Belgier',
  24: "Blonde d'Aquitaine",
  25: 'Maine Anjou',
  26: 'Salers',
  27: '"Montbéliard',
  28: 'Aubrac',
  29: 'Gasconne',
  3: 'Jersey',
  31: 'Piemonteser',
  32: 'Chianina',
  33: 'Romagnola',
  34: 'Marchigiana',
  35: 'INRA95',
  4: 'Braunvieh',
  42: 'Angus',
  43: 'Hereford',
  45: 'Highland Cattle',
  47: 'Galloway',
  48: 'Guernsey',
  49: 'Swiss Fleckvieh',
  5: 'Angler',
  50: 'Luing',
  51: 'Kiwicross',
  52: 'Normande',
  53: 'Ayrshire',
  54: 'Abondance',
  55: 'Grauvieh',
  56: 'Dexter',
  57: 'Bazadaise',
  58: 'Tuxer',
  59: 'Murnau Werdenfelser',
  6: 'Original Braunvieh',
  7: 'Red Holstein',
  71: 'Dänische Rotbunte',
  72: 'Schwedische Rotbunte',
  73: 'Norwegische Rotbunte',
  74: 'Pinzgauer',
  78: 'Simmental',
  80: 'Dahomey',
  81: 'Tarentaise',
  82: 'Vosgienne',
  83: 'Texas Longhorn',
  84: 'Gelbvieh',
  87: 'Wasserbüffel',
  88: 'Bison',
  89: 'Yak',
  90: 'Eringer',
  91: 'Evolène',
  92: 'Zebu',
  93: 'Wagyu',
  94: 'Shorthorn',
  95: 'Parthenaise',
  96: 'Rotes Höhenvieh',
  97: 'Valdostana',
  98: 'Zwergzebu',
  99: 'Andere'
}

app.get('/:id([\\.\\d]+)', function (req, res) {
  var xml = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\">" +
  "<soap:Header>" +
  "<wsa:Action xmlns:wsa=\"http://www.w3.org/2005/08/addressing\">http://www.admin.ch/xmlns/Services/evd/Livestock/AnimalTracing/1/AnimalTracingPortType/GetCattleDetail</wsa:Action>" +
  "<wsa:To xmlns:wsa=\"http://www.w3.org/2005/08/addressing\">https://ws-in.wbf.admin.ch/Livestock/AnimalTracing/1</wsa:To>" +
  "</soap:Header>" +
  "<soap:Body>" +
  "<ns:GetCattleDetail xmlns:ns=\"http://www.admin.ch/xmlns/Services/evd/Livestock/AnimalTracing/1\">" +
  "<ns:p_ManufacturerKey>KEY</ns:p_ManufacturerKey>" +
  "<ns:p_LCID>2055</ns:p_LCID>" +
  "<ns:p_WorkingFocus>" +
  "<ns:WorkingFocusItem>" +
  "<ns:WorkingFocusType>0</ns:WorkingFocusType>" +
  "<ns:TVDNumber>0</ns:TVDNumber>" +
  "<ns:MandateGiver>0</ns:MandateGiver>" +
  "</ns:WorkingFocusItem>" +
  "</ns:p_WorkingFocus>" +
  "<ns:p_EarTagNumber>" + req.params.id + "</ns:p_EarTagNumber>" +
  "</ns:GetCattleDetail>" +
  "</soap:Body>" +
  "</soap:Envelope>";

  var http_options = {
    hostname: 'ws-in.wbf.admin.ch',
    port: 443,
    path: '/Livestock/AnimalTracing/1',
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
      'Content-Length': xml.length,
      Authorization: 'Basic CREDS='
    }
  }

  var soapreq = https.request(http_options, (soapres) => {
    soapres.setEncoding('utf8');
    var body = '';
    soapres.on('data', (chunk) => {
      body += chunk;
    });
    soapres.on('end', () => {
      parseString(body, {explicitArray: false}, function (err, result) {
        var cattleDetail = result['s:Envelope']['s:Body']['GetCattleDetailResponse']['GetCattleDetailResult']['CattleDetail'];
        var birthNotificationData = cattleDetail['BirthNotificationData']
        res.render('story',{
          name: birthNotificationData['Name'],
          race: races[birthNotificationData['Race']],
          birthDate: moment(birthNotificationData['BirthDate']).format('LL'),
          birthWeight: birthNotificationData['BirthWeight'],
          nameMother: cattleDetail['NameMother'],
          nameFather: cattleDetail['NameFather'],
        });
      });
    })
  });

  soapreq.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  soapreq.write(xml);
  soapreq.end();
});

app.listen(process.env.PORT || 3000, function () {
  console.log('app listening on port 3000!');
});
