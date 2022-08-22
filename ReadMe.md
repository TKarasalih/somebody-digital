# Read Me

### Requirements

-   Node JS
-   ExpressJS
-   SASS

### Server setup

-   Open terminal/cmd and navigate to `biglight-cro-challenge`
-   Type `npm install`
-   Paste this for a self signed certificate: `openssl req -nodes -new -x509 -keyout server.key -out server.cert`
-   Fill in info (doesn't have to be real)
-   Start the server by typing `node app.js`
-   Visit `https://localhost:7000` first and accept that it isn't trusted

### Injector Setup

Be sure to add the following lines into the injector

#### Challenge 1:

-   URL pattern: https://www.onefinestay.com/search/*
-   JS: https://localhost:7000/challenge-1/dist/js/variation-1.js
-   CSS: https://localhost:7000/challenge-1/dist/css/variation-1.css

#### Challenge 2:

-   URL pattern: https://www.onefinestay.com/*
-   JS: https://localhost:7000/challenge-2/dist/js/variation-1.js
-   CSS: https://localhost:7000/challenge-2/dist/css/variation-1.css

### Explanations

Both challenges were relatively simple, however for Challenge 2, the biggest hurdle was getting the JS to run across multiple pages. I had to wrap the entire experience in a Mutation Observer to ensure that the code runs correctly and also stores data without overwriting what is there previously with a blank array.

#### Challenge 1

I looped through all of the destination listings and added the discount to each one individually using a forEach loop. I created a simple helper function in there `calculateDiscount(price)` that can be reused for some shared library work if we ever need it.

#### Challenge 2

The first step was to create an Object with the destination URL and name, I then store that object in localStorage to make it accessible across the site. All of this needed to be nested in a mutation observer, otherwise the code only runs once. Unfortunately, the mutation observer needed to watch something very high up on the page, so I've set it to simply watch `document` - if there is a better way to work around this on OneFineStay I'd love to learn!

From there, it was a matter of rendering it onto the homepage. Again, this is wrapped in the mutation observer and all we're doing here is making sure the `destinationsArr` has 3 or more items in it, then we're looping through those and creating the clickable links/boxes.

### Challenges I faced

The challenges that come with OneFineStay are to do with it being a perfect SPA, once I'm more familiar with the site, I'll be able to write more optimised code to fit around that.
