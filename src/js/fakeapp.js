App = {

    web3Provider: null,
    contracts: {},
    scannedData: '',

    init: async function (data) {
        scannedData = data;
        return await App.initWeb3();
    },

    initWeb3: function () {
        if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function () {

        $.getJSON('product.json', function (data) {

            var productArtifact = data;
            App.contracts.product = TruffleContract(productArtifact);
            App.contracts.product.setProvider(App.web3Provider);
        });

        return App.fakeProduct();
    },

    fakeProduct: function () {

        var productInstance;

        var productId = scannedData;
        console.log(productId);

        web3.eth.getAccounts(function (error, accounts) {

            if (error) {
                console.log(error);
            }

            var account = accounts[0];
            console.log(account);

            App.contracts.product.deployed().then(function (instance) {

                productInstance = instance;
                return productInstance.verifyFakeness(web3.fromAscii(productId), { from: account });

            }).then(function (result) {

                console.log(result);
                var productId;
                var pName;
                var pCost;
                var pOwner;
                var locationM;
                var pDate;
                var pStatus;


                productId = web3.toAscii(result[0]);
                pName = web3.toAscii(result[1]);
                pCost = web3.toAscii(result[2]);

                pOwner = web3.toAscii(result[3]);
                locationM = web3.toAscii(result[4]);
                pDate = web3.toAscii(result[5]);



                pStatus = web3.toAscii(result[6]);


                var t = "";


                var tr = "<tr>";
                tr += "<td>" + productId[i] + "</td>";
                tr += "<td>" + pName[i] + "</td>";
                tr += "<td>" + pCost[i] + "</td>";
                tr += "<td>" + pOwner[i] + "</td>";
                tr += "<td>" + locationM[i] + "</td>";
                tr += "<td>" + pDate[i] + "</td>";
                tr += "<td>" + pStatus[i] + "</td>";
                tr += "</tr>";
                t += tr;

                document.getElementById('logdata').innerHTML = t;

            }).catch(function (err) {

                console.log(err.message);
            });
        });
    }
};