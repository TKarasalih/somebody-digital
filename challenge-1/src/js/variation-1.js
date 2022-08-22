/*
 ** Author: Tan Karasalih
 ** Company: Somebody Digital
 ** Date: 08/2022
 ** Test: Challenge 1
 ** Variation: Variation-1
 ** Description: Add a 20% discount on all properties on all search pages (ignore property details page for this test).
 */

(() => {
    const debugMode = 1;

    const waitForElements = (cssSelector, multi, callback, maxCalls) => {
        try {
            let elementsCached; // [Configurable] Times out after 6 seconds
            const interval = setInterval(() => {
                try {
                    if (multi) {
                        elementsCached = document.querySelectorAll(cssSelector);
                        // Checks if element 'cssSelector' exists
                        if (elementsCached.length) {
                            clearInterval(interval);
                            callback(
                                Array.prototype.slice.call(elementsCached, 0)
                            );
                        }
                    } else {
                        elementsCached = document.querySelector(cssSelector);
                        // Checks if element 'cssSelector' exists
                        if (elementsCached) {
                            clearInterval(interval);
                            callback(elementsCached);
                        }
                    }
                    // After trying to find the element for 6 seconds, it stops
                    if (typeof maxCalls === "number" && --maxCalls < 0) {
                        clearInterval(interval);
                    }
                } catch (e) {
                    if (debugMode) console.log(">>> ", e.message);
                }
            }, 20);
        } catch (e) {
            if (debugMode) console.log(">>> ", e.message);
        }
    };

    // calculate price 20% discount
    const calculateDiscount = (price) => {
        try {
            const discount = price * 0.8;
            // round up to 2 decimal places
            return Math.round(discount * 100) / 100;
        } catch (e) {
            if (debugMode) console.log(">>> ", e.message);
        }
    };

    // add text to listing
    const addDiscount = (listing, listingPrice, price) => {
        try {
            // create elements and declare vars
            const discountElement = document.createElement("span"),
                approxPrice = listing.querySelector("p.imlk2f-0.dTXEZV");

            approxPrice.innerHTML = `approx $${calculateDiscount(
                price
            )} <s>$${price}</s> (-20%) / bedroom`;

            discountElement.classList.add("sd-discount");
            discountElement.innerText = `$${calculateDiscount(price)}`;

            listingPrice.insertAdjacentElement("beforebegin", discountElement);
            listingPrice.insertAdjacentHTML(
                "afterend",
                `<span class="sd-discount-percentage"> (-20%)</span>`
            );
        } catch (e) {
            if (debugMode) console.log(">>> ", e.message);
        }
    };

    // loop through all listings
    const listings = () => {
        try {
            const listings = document.querySelectorAll(
                ".b24vno-2.idQnsN:not(.sd-changed)"
            );

            listings.forEach((listing) => {
                try {
                    // add sd-changed to stop running if element is changed
                    listing.classList.add("sd-changed");

                    // declare vars
                    const listingPrice = listing.querySelector(
                        ".sc-16ewn0o-0.hEyBwM"
                    );

                    // get inner text of listing price
                    const listingPriceText = listingPrice.innerText.replace("");

                    // turn string into number
                    const price = Number(
                        listingPriceText.replace(/[^0-9.-]+/g, "")
                    );

                    // get approx small text
                    const approx = listing.querySelector("p.imlk2f-0.dTXEZV");

                    // calculate discount at 20%
                    calculateDiscount(price);

                    // add discount to DOM
                    addDiscount(listing, listingPrice, price);
                } catch (e) {
                    if (debugMode) console.log(">>> ", e.message);
                }
            });
        } catch (e) {
            if (debugMode) console.log(">>> ", e.message);
        }
    };

    const mutationObserver = (functionToCall, selector) => {
        try {
            const targetNode = document.querySelector(selector);

            const config = { attributes: true, childList: true, subtree: true };

            const observer = new MutationObserver(function () {
                functionToCall();
            });

            observer.observe(targetNode, config);
        } catch (e) {
            if (debugMode) console.log(e.message);
        }
    };

    waitForElements(
        ".b24vno-2",
        false,
        function () {
            try {
                // run for mobile only
                if (window.innerWidth < 768) {
                    listings();
                    mutationObserver(listings, ".sc-18xxwx2-0.jGcqDJ");
                    if (debugMode) console.log("Challenge 1 is running");
                }
            } catch (e) {
                if (debugMode) console.log(">>> ", e.message);
            }
        },
        1000
    );
})();
