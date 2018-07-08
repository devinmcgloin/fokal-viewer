import React from 'react';
import PropTypes from 'prop-types';

const ColorDisplay = props => {
  const style = {
    background: '#' + props.hex,
    flexGrow: props.pixel_fraction,
    display: 'block',
    float: 'left',
    padding: '10px',
  };
  return <div style={style} />;
};

ColorDisplay.propTypes = {
  hex: PropTypes.string.isRequired,
  pixel_fraction: PropTypes.number.isRequired,
};

const Colors = props => {
  const total = props.colors.reduce((sum, clr) => (sum += clr.score), 0) / 100;

  const clrs = props.colors.map((clr, i) => {
    return (
      <ColorDisplay
        key={i}
        hex={clr.Hex}
        pixel_fraction={clr.pixel_fraction / total}
      />
    );
  });

  const container = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '3px',
    margin: 'auto',
  };

  return <div style={container}>{clrs}</div>;
};

Colors.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      sRGB: {
        R: PropTypes.number.isRequired,
        G: PropTypes.number.isRequired,
        B: PropTypes.number.isRequired,
      },
      Hex: PropTypes.string.isRequired,
      HSV: {
        H: PropTypes.number.isRequired,
        S: PropTypes.number.isRequired,
        V: PropTypes.number.isRequired,
      },
      shade: PropTypes.string.isRequired,
      color_name: PropTypes.string.isRequired,
      pixel_fraction: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export { Colors };
