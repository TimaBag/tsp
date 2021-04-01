import $ from 'jquery';

var webSocket = new WebSocket('wss://127.0.0.1:13579/');
var heartbeat_msg = '--heartbeat--';
var heartbeat_interval = null;
var missed_heartbeats = 0;
var missed_heartbeats_limit_min = 3;
var missed_heartbeats_limit_max = 50;
var missed_heartbeats_limit = missed_heartbeats_limit_min;
var callback = null;
var filePathData = null;
export var data = {};
var data_send = {};
var data_send_key = {};
//var rw = null;


function setMissedHeartbeatsLimitToMax() {
    missed_heartbeats_limit = missed_heartbeats_limit_max;
}

function setMissedHeartbeatsLimitToMin() {
    missed_heartbeats_limit = missed_heartbeats_limit_min;
}

function blockScreen() {
    $.blockUI({
        message: '<img src="js/loading.gif" /><br/>Подождите, идет загрузка Java-апплета...',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}



function unBlockScreen() {
    $.unblockUI();
}

webSocket.onopen = function (event) {
    if (heartbeat_interval === null) {
        missed_heartbeats = 0;
        
    }
    console.log("Connection opened");
};

webSocket.onclose = function (event) {
    if (event.wasClean) {
        console.log('connection has been closed');
    } else {
        console.log('Connection error');
    }
    console.log('Code: ' + event.code + ' Reason: ' + event.reason);
};

webSocket.onmessage = function (event) {
    if (event.data === heartbeat_msg) {
        missed_heartbeats = 0;
        return;
    }

    var result = JSON.parse(event.data);

    if (result != null) {
        var rw = {
            code: result['code'],
            message: result['message'],
            responseObject: result['responseObject'],
            getResult: function () {
                return this.result;
            },
            getMessage: function () {
                return this.message;
            },
            getResponseObject: function () {
                return this.responseObject;
            },
            getCode: function () {
                return this.code;
            }
        };
        if(callback === "showFileChooserBack"){
            showFileChooserBack(rw);
        }
        if(callback === "getKeyInfoBack"){
            getKeyInfoBack(rw);
        }
        if(callback === "createCMSSignatureFromFileBack"){
            createCMSSignatureFromFileBack(rw);
        }
    }
    console.log(event);
    setMissedHeartbeatsLimitToMin();
};

function getActiveTokens(callBack) {
    var getActiveTokens = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "getActiveTokens"
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(getActiveTokens));
}

function getKeyInfo(storageName, callBack) {
    var getKeyInfo = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "getKeyInfo",
        "args": [storageName]
    };
    callback = callBack;
    console.log("!!!!", getKeyInfo);
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(getKeyInfo));
}

function signXml(storageName, keyType, xmlToSign, callBack) {
    var signXml = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "signXml",
        "args": [storageName, keyType, xmlToSign, "", ""]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(signXml));
}

function createCMSSignatureFromFile(storageName, keyType, filePath, flag, callBack) {
    var createCMSSignatureFromFile = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCMSSignatureFromFile",
        "args": [storageName, keyType, filePath, flag]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(createCMSSignatureFromFile));
}

function showFileChooser(fileExtension, currentDirectory, callBack) {
    var showFileChooser = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "showFileChooser",
        "args": [fileExtension, currentDirectory]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(showFileChooser));
}

/*function sendAuth() {
    keyId = $('#keyId').val(); //key_id
    certSerial = $('#serialNumber').val(); //cert_serial
    dateFrom = $('#notbefore').val(); //cert_date_from
    dateTo = $('#notafter').val(); //cert_date_to
    uzId = $('#authorityKeyIdentifier').val(); //uz_cert_id
    issuerInfo = $('#issuerDn').val(); //issuer_info
    
    signer = $('#subjectDn').val();
    signer = signer.split(',');
    for(i = 0; i < signer.length; i++){
        signer[i] = signer[i].split('=');
    }
    signer_obj = {}
    for(i = 0; i < signer.length; i++){
        signer_obj[signer[i][0]] = signer[i][1];
    }
    
    signer_obj['C']; //signer_citizenship
    signer_obj['CN']; //signer_surname_name
    signer_obj['E']; //signer_email
    signer_obj['G']; //signer_patrynomic
    signer_obj['L']; //signer_location
    signer_obj['O']; //signer_organisation
    signer_obj['OU']; //signer_organisation_bin
    signer_obj['S']; //signer_city
    signer_obj['SERIALNUMBER']; //signer_iin
    signer_obj['SURNAME']; //signer_surname
}*/

function getActiveTokensCall() {
    getActiveTokens("getActiveTokensBack");
}

function getActiveTokensBack(result) {
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var listOfTokens = result['responseObject'];        
        $('#storageSelect').empty();
        $('#storageSelect').append('<option value="PKCS12">PKCS12</option>');
        for (var i = 0; i < listOfTokens.length; i++) {
            $('#storageSelect').append('<option value="' + listOfTokens[i] + '">' + listOfTokens[i] + '</option>');
        }
    }
}

export function getKeyInfoCall() {
    getKeyInfo("PKCS12", "getKeyInfoBack");
}

function getKeyInfoBack(result) {
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];

        var keyId = res['keyId'];
        var subjectDn = res['subjectDn'];
        var issuerDn = res['issuerDn'];
        var serialNumber = res['serialNumber'];
        var dateString_to = res['certNotAfter'];
        var date_to = new Date(Number(dateString_to)).toLocaleString();
        var dateString_from = res['certNotBefore'];
        var date_from = new Date(Number(dateString_from)).toLocaleString();
        var authorityKeyIdentifier = res['authorityKeyIdentifier'];

        var signer = subjectDn.split(',');
        for(var i = 0; i < signer.length; i++){
            signer[i] = signer[i].split('=');
        }
        var signer_obj = {}
        for(var i = 0; i < signer.length; i++){
            signer_obj[signer[i][0]] = signer[i][1];
        }

        $("#keyId").val(keyId);
        $("#serialNumber").val(serialNumber);
        $("#date_from").val(date_from);
        $("#date_to").val(date_to);
        $("#authorityKeyIdentifier").val(authorityKeyIdentifier);
        $("#subjectDn").val(subjectDn);
        $("#signer_obj_c").val(signer_obj['C']);
        $("#signer_obj_e").val(signer_obj['E']);
        $("#signer_obj_cn").val(signer_obj['CN']);
        $("#signer_obj_g").val(signer_obj['G']);
        $("#signer_obj_l").val(signer_obj['L']);
        $("#signer_obj_o").val(signer_obj['O']);
        $("#signer_obj_ou").val(signer_obj['OU']);
        $("#signer_obj_s").val(signer_obj['S']);
        $("#signer_obj_serialnumber").val(signer_obj['SERIALNUMBER']);
        $("#signer_obj_surname").val(signer_obj['SURNAME']);
    }
}

function signXmlCall() {
    var xmlToSign = $("#xmlToSign").val();
    var selectedStorage = $('#storageSelect').val();
    $.blockUI();
    signXml(selectedStorage, "SIGNATURE", xmlToSign, "signXmlBack");
}

function signXmlBack(result) {
    $.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#signedXml").val(res);
    }
}

export function createCMSSignatureFromFileCall() {
    var selectedStorage = $('#storageSelect').val();
    if (filePathData !== null && filePathData !== "") {
        /*$.blockUI();*/
        createCMSSignatureFromFile("PKCS12", "SIGNATURE", filePathData,false, "createCMSSignatureFromFileBack");
    } else {
        alert("Не выбран файл для подписи!");
    }
}

function createCMSSignatureFromFileBack(result) {
    /*  */
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#cms_sign").val(res)
        
    }
}

export function showFileChooserCall() {
    showFileChooser("ALL", "", "showFileChooserBack");
}

function showFileChooserBack(result) {
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        filePathData = res;
    }
}
