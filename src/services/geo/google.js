//import Language from "@google-cloud/language";
//import googleMaps from "@google/maps";

/* global process */
const key = process.env.REACT_APP_GOOGLE_KEY;

const DistanceBetween = (northeast, southwest) => {
    const center = {
        lat: (northeast.lat + southwest.lat) / 2,
        lng: (northeast.lng + southwest.lng) / 2
    };
    const toRad = d => d * Math.PI / 180;

    const R = 6371e3;
    const dLat = toRad(northeast.lat - center.lat);
    const dLong = toRad(northeast.lng - center.lng);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(center.lat)) *
            Math.cos(toRad(northeast.lat)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return Math.round(d);
};

const tagEntities = (text, callback) => {
    // Instantiates a Document, representing the provided text
    const document = {
        content: text,
        type: "PLAIN_TEXT"
    };

    // Detects entities in the document
    fetch(
        "https://language.googleapis.com/v1/documents:analyzeEntities?key=" +
            key,
        {
            method: "POST",
            body: JSON.stringify({
                document: document,
                encodingType: "UTF8"
            })
        }
    )
        .then(resp => resp.json())
        .then(results => {
            let terms = [];

            let entities = results.entities,
                loc = undefined;

            entities.forEach(entity => {
                if (
                    entity.mentions[0].type === "PROPER" &&
                    entity.type === "LOCATION"
                ) {
                    loc = entity.name;
                } else {
                    terms.push(entity.name);
                }
            });

            if (loc) {
                fetch(
                    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                        loc +
                        "&key=" +
                        key
                )
                    .then(resp => resp.json())
                    .then(resp => {
                        let geo = resp.results[0].geometry;

                        let diameter = DistanceBetween(
                            geo.bounds
                                ? geo.bounds.northeast
                                : geo.viewport.northeast,
                            geo.bounds
                                ? geo.bounds.southwest
                                : geo.viewport.southwest
                        );
                        callback({
                            required_terms: terms,
                            geo: {
                                lng: geo.location.lng,
                                lat: geo.location.lat,
                                radius: diameter / 2
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        callback({ required_terms: terms });
                    });
            } else {
                callback({ required_terms: terms });
            }
        })
        .catch(err => {
            console.error("ERROR:", err);
            callback({ required_terms: text.split(" "), geo: null });
        });
};

export { tagEntities, DistanceBetween };
