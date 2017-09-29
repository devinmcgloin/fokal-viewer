//import Language from "@google-cloud/language";
import googleMaps from "@google/maps";

const key = "AIzaSyAm7OBNwZWAWOCGjO-F4z-yqQilT-zC-L8";

const googleMapsClient = googleMaps.createClient({
    key: "AIzaSyAm7OBNwZWAWOCGjO-F4z-yqQilT-zC-L8"
});

//const language = Language({
//key: "AIzaSyAm7OBNwZWAWOCGjO-F4z-yqQilT-zC-L8"
//});

const DistanceBetween = (p1, p2) => {
    const toRad = d => d * Math.PI / 180;

    const R = 6371e3;
    const dLat = toRad(p2.lat - p1.lat);
    const dLong = toRad(p2.lng - p1.lng);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(p1.lat)) *
            Math.cos(toRad(p2.lat)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return Math.round(d);
};

const tagEntities = (text, callback) => {
    let terms = [],
        point = undefined,
        radius = undefined;

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
                googleMapsClient.geocode(
                    {
                        address: loc
                    },
                    (err, resp) => {
                        if (!err) {
                            console.log(resp);
                            let geo = resp.json.results[0].geometry;
                            point = geo.location;
                            console.log(
                                point,
                                geo.bounds.northeast,
                                geo.bounds.southwest
                            );
                            radius = DistanceBetween(
                                geo.bounds.northeast,
                                geo.bounds.southwest
                            );
                            callback({
                                required_terms: terms,
                                geo: {
                                    lng: point.lng,
                                    lat: point.lat,
                                    radius: radius
                                }
                            });
                        } else {
                            console.log(err);
                            callback({ required_terms: resp.terms });
                        }
                    }
                );
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
