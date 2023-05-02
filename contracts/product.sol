pragma solidity ^0.8.12;

contract product {
    bytes32[] products;
    bytes32[] names;
    bytes32[] prices;
    bytes32[] owners;
    bytes32[] locations;
    bytes32[] dates;
    bytes32[] pStatus;

    mapping(bytes32 => bool) public vProducts;

    function setProduct(
        bytes32 productId,
        bytes32 pName,
        bytes32 pCost,
        bytes32 pOwner,
        bytes32 locationM,
        bytes32 pDate
    ) public {
        require(!vProducts[productId]);
        vProducts[productId] = true;

        products.push(productId);
        names.push(pName);
        prices.push(pCost);
        owners.push(pOwner);
        locations.push(locationM);
        dates.push(pDate);
        pStatus.push("Available");
    }

    function viewProducts()
        public
        view
        returns (
            bytes32[] memory,
            bytes32[] memory,
            bytes32[] memory,
            bytes32[] memory,
            bytes32[] memory,
            bytes32[] memory,
            bytes32[] memory
        )
    {
        return (products, names, prices, owners, locations, dates, pStatus);
    }

    // function sellProduct (bytes32 sProductId) public {
    //     bytes32 status;
    //     uint i;
    //     uint j=0;

    //     if(products.length>0) {
    //         for(i=0;i<products.length;i++) {
    //             if(products[i]==sProductId) {
    //                 j=i;
    //             }
    //         }
    //     }

    //     status=pStatus[j];
    //     if(status=="Available") {
    //         pStatus[j]="NA";
    //     }
    // }

    function verifyFakeness(
        bytes32 vProductId
    )
        public
        view
        returns (bytes32, bytes32, bytes32, bytes32, bytes32, bytes32, bytes32)
    {
        bool status = false;
        uint i;
        uint j = 0;

        if (products.length > 0) {
            for (i = 0; i < products.length; i++) {
                if (products[i] == vProductId) {
                    j = i;
                    status = true;
                }
            }
        }

        if (status == true) {
            if (pStatus[j] == "Available")
                return (
                    products[j],
                    names[j],
                    prices[j],
                    owners[j],
                    locations[j],
                    dates[j],
                    "Original"
                );
            else
                return (
                    products[j],
                    names[j],
                    prices[j],
                    owners[j],
                    locations[j],
                    dates[j],
                    "Fake"
                );
        } else {
            return ("NA", "NA", "NA", "NA", "NA", "NA", "Fake");
        }
    }
}
