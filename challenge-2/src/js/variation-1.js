/*
 ** Author: Tan Karasalih
 ** Company: Somebody Digital
 ** Date: 08/2022
 ** Test: Challenge 2
 ** Variation: Variation-1
 ** Description: Show on the homepage the last 5 destinations the user has searched.
 */

(() => {
    const debugMode = 1;

    let destinationsArr = [];

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

    // store destination in local storage
    const storeDestination = () => {
        try {
            const destinationText = document.querySelectorAll(
                ".sc-16ewn0o-0.bRUYKR:not(.sd-stored)"
            );

            destinationText.forEach((destination) => {
                try {
                    destination.classList.add("sd-stored");

                    // if no numbers present in the destination, then store it in local storage
                    if (!destination.innerText.match(/\d/g)) {
                        // get page URL and destination as object
                        const destinationObject = {
                            url: window.location.href,
                            destination: destination.innerText,
                        };

                        // check if destination is already stored in local storage
                        if (!destinationsArr.includes(destinationObject)) {
                            destinationsArr.push(destinationObject);
                            localStorage.setItem(
                                "SD_Destinations",
                                JSON.stringify(destinationsArr)
                            );
                        }
                    }
                    console.log(">>>", destinationsArr);
                } catch (e) {
                    if (debugMode) console.log(">>> ", e.message);
                }
            });
        } catch (e) {
            if (debugMode) console.log(">>> ", e.message);
        }
    };

    // render the last 5 destinations in the homepage
    const renderDestinations = () => {
        try {
            destinationsArr = JSON.parse(
                localStorage.getItem("SD_Destinations")
            );

            // only run if there are 3 or more destinations stored in local storage
            if (destinationsArr.length >= 3) {
                // declare vars
                const homepageContainer = document.querySelector(
                        ".b24vno-3.itkUAY:not(.sd-render)"
                    ),
                    destinationContainer = document.createElement("div"),
                    destinationFlexContainer = document.createElement("div"),
                    destinationTitle = document.createElement("h2");

                if (!homepageContainer) return;

                homepageContainer.classList.add("sd-render");

                // classes for destination container
                destinationContainer.classList.add(
                    "liqrfp-0",
                    "liqrfp-1",
                    "ivhDWa"
                );
                destinationFlexContainer.classList.add(
                    "sd-destinations-container"
                );
                // classes for destination title
                destinationTitle.classList.add(
                    "sc-15ch3b2-1",
                    "cfYnfE",
                    "sd-destinations-title"
                );

                // set destination title text
                destinationTitle.innerText = "Recently searched destinations";

                destinationsArr.forEach((destination) => {
                    try {
                        // declare vars
                        const destinationElement = document.createElement("a");

                        // attributes
                        destinationElement.classList.add("sd-destination");
                        destinationElement.innerText = destination.destination;
                        destinationElement.href = destination.url;

                        // insert into container
                        destinationFlexContainer.appendChild(
                            destinationElement
                        );
                    } catch (e) {
                        if (debugMode) console.log(">>> ", e.message);
                    }
                });

                // insert into DOM
                homepageContainer.insertAdjacentElement(
                    "afterbegin",
                    destinationContainer
                );
                destinationContainer.insertAdjacentElement(
                    "afterbegin",
                    destinationTitle
                );
                destinationTitle.insertAdjacentElement(
                    "afterend",
                    destinationFlexContainer
                );
            }
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
        ".sc-15ch3b2-0.izpEBc, .b24vno-3.itkUAY",
        false,
        function () {
            try {
                // store destinations w/ mutation observer
                storeDestination();
                mutationObserver(storeDestination, ".sc-18xxwx2-0.jGcqDJ");

                // render destinations w/ mutation observer
                renderDestinations();
                mutationObserver(renderDestinations, ".sc-18xxwx2-0.jGcqDJ");
                if (debugMode) console.log("Challenge 2 is running");
            } catch (e) {
                if (debugMode) console.log(">>> ", e.message);
            }
        },
        1000
    );
})();
