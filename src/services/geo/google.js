//import Language from "@google-cloud/language";
//import googleMaps from "@google/maps";

import geodist from 'geodist';

/* global process */
const key = process.env.REACT_APP_GOOGLE_KEY;

const tagEntities = (text, callback) => {
  // Instantiates a Document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects entities in the document
  fetch(
    'https://language.googleapis.com/v1/documents:analyzeEntities?key=' + key,
    {
      method: 'POST',
      body: JSON.stringify({
        document: document,
        encodingType: 'UTF8',
      }),
    },
  )
    .then(resp => resp.json())
    .then(results => {
      let terms = [];

      let entities = results.entities,
        loc = undefined;

      entities.forEach(entity => {
        if (
          entity.mentions[0].type === 'PROPER' &&
          entity.type === 'LOCATION'
        ) {
          loc = entity.name;
        } else {
          terms.push(entity.name);
        }
      });

      if (loc) {
        fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            loc +
            '&key=' +
            key,
        )
          .then(resp => resp.json())
          .then(resp => {
            let geo = resp.results[0].geometry;

            let diameter = geodist(
              geo.bounds ? geo.bounds.northeast : geo.viewport.northeast,
              geo.bounds ? geo.bounds.southwest : geo.viewport.southwest,
              { exact: true, unit: 'km' },
            );
            callback({
              required_terms: terms,
              geo: {
                lng: geo.location.lng,
                lat: geo.location.lat,
                radius: diameter / 2,
              },
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
      console.error('ERROR:', err);
      callback({ required_terms: text.split(' '), geo: null });
    });
};

export { tagEntities };
