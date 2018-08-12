import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Why = props => (
  <article className="sans-serif cf mw9 center">
    <header className="w-100 pa3 pa4-m pa5-l mb3 mb5-l mw7 center">
      <h1 className="f2 fw9 f1-l lh-title b mt0 tc">
        Fokal helps you find images you&#39;ll love and get your own images seen.
      </h1>
      <h2 className="f5 fw5 lh-title tc">
        We use cutting edge machine intelligence in order to make sure your best images rise to the
        top and help you find the images that you&#39;re looking for.
      </h2>
    </header>
    <section className="fl w-100 bg-white">
      <SmallFeature
        logo="search"
        title="Search"
        body={
          <span>
            Fokal makes complicated search queries easy. We use best in class machine learning and
            image recognition to analyze your queries and match them the relevant images. All
            content is uploaded with the permissive Unsplash Liscence, allowing you to use the
            images you find for personal or commercial use.
          </span>
        }
      />
      <SmallFeature
        logo="globe"
        title="Mapping"
        body={
          <span>
            Each Image can be found in relation to the place it was taken. You can search for{' '}
            <Link className="link dim" to="/search?q=mountains%20in%20California">
              Mountains in California
            </Link>
            , or{' '}
            <Link className="link dim" to="/search?q=architecture%20in%20New%20York">
              Architecture in New York
            </Link>
            . If you&#39;re planning a road trip, or traveling you can get images from a specific
            region and decide what places to spend your time. It also means you can search for
            images from a specific small town or national park.
          </span>
        }
      />

      <SmallFeature
        logo="paint-brush"
        title="Color"
        body={
          <span>
            In addition to search based on geography, it&#39;s also possible to search based on
            color. For example{' '}
            <Link className="link dim" to="/search?q=cars%20rgb(200,200,0)">
              Cars rgb(200, 200, 0)
            </Link>{' '}
            shows images of yellow cars. For any given image you can also view the color components,
            allowing color pallates to be generated from an image.
          </span>
        }
      />
      <SmallFeature
        logo="terminal"
        title="API &amp; Opensource"
        body={
          <span>
            Fokal operates off an extensible API. Allowing developers to build off Fokal&#39;s
            advanced image tagging and searching. This allows custom domains and more advanced
            features to be implemented quicker. The code for Fokal is opensource, and welcomes pull
            requests.
          </span>
        }
      />
    </section>
    <Feature
      background="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?dpr=1&auto=compress,format&fit=crop&w=2702&h=&q=80&cs=tinysrgb&crop="
      title="For Photographers"
      subtitle="Fokal is a place for your images to be found and enjoyed."
      body={
        <span>
          We&#39;re frustrated by the hundreds of good photos sitting in your archives that only
          friends and family have seen. With Fokal, those images have a higher chance of being seen
          than other platforms. Our specific search allows local winner photographs to be found.
        </span>
      }
    />
    <Feature
      background="https://images.unsplash.com/photo-1503289408281-f8314bf417c3?dpr=1&auto=compress,format&fit=crop&w=3152&h=&q=80&cs=tinysrgb&crop="
      left
      last
      title="For Creatives"
      subtitle="Fokal is about finding high quality, high resolution photos that you can use in any of your projects."
      body={
        <span>
          Our balance between machine curation and human tagging, as well as an emphasis on metadata
          means you can find the photo you&#39;re looking for. Fokal handles queries complex like{' '}
          <span className="b">cafes in Paris </span> or <span className="b">London skyline</span> as
          you would expect. The goal of all this is to help you find images you&#39;ll love.
        </span>
      }
    />

    <section className="w-100">
      <div className="fl w-100">
        <h3
          className="w-100 overflow-hidden fw5 ma0 absolute light-gray z-0"
          style={{
            fontSize: '15rem'
          }}
        >
          Join
        </h3>
      </div>
      <div className="fl w-100 tc pa6-ns pa3">
        <p className="lh-copy relative z-1">
          Join to collect images, post your own or find your next travel destination.
        </p>
        <Link to="/join" className="no-underline">
          <button className="relative z-1 f6 br2 ph5 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white no-underline">
            Join
          </button>
        </Link>
      </div>
    </section>
  </article>
);

const SmallFeature = ({ logo, title, body }) => (
  <div className="fl w-100 w-50-m w-25-l pa3 pa4-l">
    <div className="tc w-100">
      <FontAwesome name={logo} size="3x" />
    </div>

    <h3 className="f3 fw8 tc">{title}</h3>

    <p className="f6 lh-copy measure">{body}</p>
  </div>
);

SmallFeature.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired
};

const Feature = ({ icon_id, background, last, left, title, subtitle, body }) => (
  <section
    className={'bg-dark-gray white cover fl w-100 pa3 ' + (!last ? 'pb4' : '')}
    style={{
      background: 'url(' + background + ') no-repeat center'
    }}
  >
    <div
      key={'copy'}
      className={(left ? 'fl' : 'fr') + ' w-80 h-100 w-40-l pa5-ns pa3 bg-dark-gray br2 shadow-5'}
    >
      <h3 className="f2 lh-title bb">{title}</h3>
      {subtitle && <h4 className="f3 lh-copy measure-narrow">{subtitle}</h4>}
      <p className="f5 lh-copy">{body}</p>
    </div>
  </section>
);

Feature.propTypes = {
  icon_id: PropTypes.string.isRequired,
  background: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  body: PropTypes.node.isRequired,
  last: PropTypes.bool,
  left: PropTypes.bool
};

export { Why };
