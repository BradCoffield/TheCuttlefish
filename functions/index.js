const functions = require("firebase-functions");
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });
const cors = require("cors")({ origin: true });

// This function calls the Primo VE API and gets our new books and caches that data inside Firestore for later use.
exports.cacheNewBooks = functions
  .runWith({
    // Ensure the function has enough memory and time
    // to process large files
    timeoutSeconds: 480,
    
  })
  .https.onRequest(async (req, res) => {
    cors(req, res, () => {
      const fetch = require("node-fetch");
      let probe = require("probe-image-size");

      let urlToUse = {};
      urlToUse.url = `https://api-na.hosted.exlibrisgroup.com/primo/v1/search?q=any,contains,new%20books&vid=01TRAILS_ROCKY:01TRAILS_ROCKY&tab=LibraryCatalog&limit=150&scope=MyInstitution&apikey=l8xx79d281ecc1e44f9f8b456a23c8cb1f47&qInclude=location_code,include,3380%E2%80%93463253560003380%E2%80%93newbooks`;
      // urlToUse.url = `https://api-na.hosted.exlibrisgroup.com/primo/v1/search?q=lsr03,exact,newbooks}&vid=01TRAILS_ROCKY&tab=default_tab&limit=150&scope=P-01TRAILS_ROCKY&apikey=l8xx79d281ecc1e44f9f8b456a23c8cb1f47`;
      // urlToUse.url = `https://api-na.hosted.exlibrisgroup.com/primo/v1/search?q=lsr03,exact,newbooks}&vid=01TRAILS_ROCKY&tab=default_tab&limit=150&scope=P-01TRAILS_ROCKY&apikey=${
      //   process.env.PRIMO_API_KEY
      // }`;

      fetch(urlToUse.url)
        .then((resp) => resp.json())
        .then(async function (result) {
          // res.send(result)

          let realResults = result.docs;
          let toSend = [];

          for (let i = 0; i < realResults.length; i++) {
            if (realResults[i].pnx.addata.isbn) {
              let tempEh = await probe(
                `https://syndetics.com/index.aspx?isbn=${realResults[i].pnx.addata.isbn[0]}/MC.JPG&client=primo`
              );
              console.log("here1");
              if (tempEh.width > 1) {
                console.log("here2");
                toSend.push({
                  isbn: realResults[i].pnx.addata.isbn,
                  title: realResults[i].pnx.display.title,
                  type: realResults[i].pnx.display.type,
                  recordid: realResults[i].pnx.control.recordid,
                  coverImage: `https://syndetics.com/index.aspx?isbn=${realResults[i].pnx.addata.isbn[0]}/MC.JPG&client=primo`,
                });
              }
            }
          }

          admin
            .firestore()
            .collection(`primo-book-searches`)
            .doc("new-books")
            .set(
              {
                field: "any",
                precision: "exact",
                typeOfSearch: "book",
                searchTerm: "newbooks",
                results: toSend,
                uid: "new-books",
              },
              { merge: false }
            )
            .then((params) => {
              res.send("Done!");
            });
        });
    });
  });

// This function is what our frontend uses to get our new books records we have previously stored inside Firestore
exports.readPrimoBooks = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    console.log("readPrimoBooks");
    (async () => {
      const primoBooks = await admin
        .firestore()
        .collection("primo-book-searches")
        .get();
      theData = [];
      primoBooks.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());

        theData.push({ [doc.id]: doc.data() });
      });
      res.send(theData);
    })();
  });
});
