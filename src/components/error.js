import React from "react";

const NotFound = () => (
    <div className="sans-serif pa5">
        <h1 className="f-headline-l f2 lh-solid tc">404</h1>
    </div>
);

const NoResults = () => (
    <div className="sans-serif pa5">
        <h1 className="f-headline-l f2 lh-solid tc">No Results</h1>
    </div>
);

const NotImplemented = () => (
    <div className="sans-serif pa5">
        <h1 className="f-headline-l f2 lh-solid tc">Not Implemented</h1>
    </div>
);

const Error = () => (
    <div className="sans-serif pa5">
        <h1 className="f-headline-l f2 lh-solid tc">
            Hmmm... Something went wrong...
        </h1>
    </div>
);

export { NotFound, NoResults, NotImplemented, Error };
