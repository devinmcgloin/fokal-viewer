import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="sans-serif pa5">
    <h1 className="f-headline code tc">404</h1>
    <h1 className="f2 lh-solid tc">Not Found</h1>
    <p className="i tc f3">
      Perhaps try going <Link to="/">home</Link> and looking again?
    </p>
  </div>
);

const NoResults = () => (
  <div className="sans-serif pa5">
    <h1 className="f-headline-l f2 lh-solid tc code">No Results</h1>
    <p className="i tc f3">
      Perhaps try going <Link to="/">home</Link> or searching for something
      else?
    </p>
  </div>
);

const Error = () => (
  <div className="sans-serif pa5">
    <h1 className="f-headline code tc">500</h1>
    <h1 className="f2 lh-solid tc">Server Error</h1>
    <p className="i tc f3">
      Perhaps try doing that later? We've dispatched our best engineers to
      investigate.
    </p>
  </div>
);

export { NotFound, NoResults, Error };
