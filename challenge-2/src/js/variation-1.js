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

    let lastVisitedLocation;

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
                            callback(Array.prototype.slice.call(elementsCached, 0));
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
            let destinationsArr = [];

            // get destination from location.pathname
            const destinationRaw = location.pathname.split("/")[2],
                destinationDisplay = destinationRaw.split("-").join(" "),
                destinationObject = {
                    destination: destinationDisplay,
                    url: location.href,
                };

            // get localStorage array
            const localStorageArr = JSON.parse(localStorage.getItem("SD_Destinations"));

            // check if localStorage array is empty
            if (localStorageArr === null) {
                // if empty, add new destination to array
                destinationsArr.push(destinationObject);
                localStorage.setItem("SD_Destinations", JSON.stringify(destinationsArr));
            } else {
                // if not empty, check if destination is already in array
                const destinationExists = localStorageArr.some((destination) => destination.destination === destinationDisplay);
                if (!destinationExists) {
                    // if not in array, add new destination to array
                    localStorageArr.push(destinationObject);
                    localStorage.setItem("SD_Destinations", JSON.stringify(localStorageArr));
                }
            }

            // if array is greater than 6, remove first element
            if (localStorageArr.length >= 6) {
                localStorageArr.shift();
                localStorage.setItem("SD_Destinations", JSON.stringify(localStorageArr));
            }
        } catch (e) {
            if (debugMode) console.log(">>> ", e.message);
        }
    };

    // render the last 5 destinations in the homepage
    const renderDestinations = () => {
        try {
            const destinationsArr = JSON.parse(localStorage.getItem("SD_Destinations"));

            // only run if there are 3 or more destinations stored in local storage
            if (destinationsArr.length >= 3) {
                // declare vars
                const homepageContainer = document.querySelector(".b24vno-3.itkUAY:not(.sd-render)"),
                    destinationContainer = document.createElement("div"),
                    destinationFlexContainer = document.createElement("div"),
                    destinationTitle = document.createElement("h2");

                if (!homepageContainer) return;

                homepageContainer.classList.add("sd-render");

                // classes for destination container
                destinationContainer.classList.add("liqrfp-0", "liqrfp-1", "ivhDWa");
                destinationFlexContainer.classList.add("sd-destinations-container");
                // classes for destination title
                destinationTitle.classList.add("sc-15ch3b2-1", "cfYnfE", "sd-destinations-title");

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
                        destinationFlexContainer.appendChild(destinationElement);
                    } catch (e) {
                        if (debugMode) console.log(">>> ", e.message);
                    }
                });

                // insert into DOM
                homepageContainer.insertAdjacentElement("afterbegin", destinationContainer);
                destinationContainer.insertAdjacentElement("afterbegin", destinationTitle);
                destinationTitle.insertAdjacentElement("afterend", destinationFlexContainer);
            }
        } catch (e) {
            if (debugMode) console.log(">>> ", e.message);
        }
    };

    const mutationObserver = () => {
        try {
            const targetNode = document;

            const config = { attributes: true, childList: true, subtree: true };

            const observer = new MutationObserver(function () {
                waitForElements(
                    ".sc-18xxwx2-0.jGcqDJ",
                    false,
                    function () {
                        try {
                            // store destinations - on search pages only
                            if (window.location.pathname.includes("/search")) {
                                if (location.pathname.split("/")[2] !== lastVisitedLocation) {
                                    lastVisitedLocation = location.pathname.split("/")[2];
                                    storeDestination();
                                }
                            }

                            // homepage only
                            if (window.location.pathname === "/") {
                                // render destinations
                                renderDestinations();
                            }

                            if (debugMode) console.log("Challenge 2 is running");
                        } catch (e) {
                            if (debugMode) console.log(">>> ", e.message);
                        }
                    },
                    1000
                );
            });

            observer.observe(targetNode, config);
        } catch (e) {
            if (debugMode) console.log(e.message);
        }
    };

    mutationObserver();
})();
