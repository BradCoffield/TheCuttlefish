const functions = require("firebase-functions");
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });
const cors = require("cors")({ origin: true });

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.cacheNewBooks = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    const fetch = require("node-fetch");
    let probe = require("probe-image-size");

    let urlToUse = {};
    urlToUse.url = `https://api-na.hosted.exlibrisgroup.com/primo/v1/search?q=lsr03,exact,newbooks}&vid=01TRAILS_ROCKY&tab=default_tab&limit=150&scope=P-01TRAILS_ROCKY&apikey=l8xx79d281ecc1e44f9f8b456a23c8cb1f47`;
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
          if (realResults[i].pnx.search.isbn) {
            let tempEh = await probe(
              `https://syndetics.com/index.aspx?isbn=${realResults[i].pnx.search.isbn[0]}/MC.JPG&client=primo`
            );
            console.log("here1");
            if (tempEh.width > 1) {
                console.log("here2");
              toSend.push({
                isbn: realResults[i].pnx.search.isbn,
                title: realResults[i].pnx.display.title,
                type: realResults[i].pnx.display.type,
                sourceid: realResults[i].pnx.control.sourceid,
                sourcerecordid: realResults[i].pnx.control.sourcerecordid,
                coverImage: `https://syndetics.com/index.aspx?isbn=${realResults[i].pnx.search.isbn[0]}/MC.JPG&client=primo`,
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
              field: "lsr03",
              precision: "exact",
              typeOfSearch: "book",
              searchTerm: "newbooks",
              results: toSend,
              uid: "new-books",
            },
            { merge: false }
          ).then((params) => {
              res.send("Done!")
          });
      });
  });
});

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
