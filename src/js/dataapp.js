App = {
    web3Provider: null,
    contracts: {},

    init: async function () {
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

        return App.getData();
    },

    getData: function () {

        var productInstance;

        web3.eth.getAccounts(function (error, accounts) {

            if (error) {
                console.log(error);
            }

            var account = accounts[0];
            console.log(account);

            App.contracts.product.deployed().then(function (instance) {

                productInstance = instance;
                return productInstance.viewProducts.call();

            }).then(function (result) {

                var productId = [];
                var pName = [];
                var pCost = [];
                var pOwner = [];
                var locationM = [];
                var pDate = [];
                var pStatus = [];

                for (var k = 0; k < result[0].length; k++) {
                    productId[k] = web3.toAscii(result[0][k]);
                }

                for (var k = 0; k < result[1].length; k++) {
                    pName[k] = web3.toAscii(result[1][k]);
                }

                for (var k = 0; k < result[2].length; k++) {
                    pCost[k] = web3.toAscii(result[2][k]);
                }

                for (var k = 0; k < result[3].length; k++) {
                    pOwner[k] = web3.toAscii(result[3][k]);
                }

                for (var k = 0; k < result[4].length; k++) {
                    locationM[k] = web3.toAscii(result[4][k]);
                }

                for (var k = 0; k < result[5].length; k++) {
                    pDate[k] = web3.toAscii(result[5][k]);
                }

                for (var k = 0; k < result[6].length; k++) {
                    pStatus[k] = web3.toAscii(result[6][k]);
                }

                var t = "";
                for (var i = 0; i < productId.length; i++) {

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
                }
                document.getElementById('logdata').innerHTML += t;
                document.getElementById('add').innerHTML = account;
            }).catch(function (err) {
                console.log(err.message);
            })
        })
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    })
})