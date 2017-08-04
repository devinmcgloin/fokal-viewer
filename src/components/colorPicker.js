import React from 'react'
import reactCSS from 'reactcss'
import map from 'lodash/map'
import * as material from 'material-colors'

import {ColorWrap} from 'react-color/lib/components/common'
import CircleSwatch from 'react-color/lib/components/circle/CircleSwatch'


export const Circle = ({width, onChange, onSwatchHover, colors, hex, circleSize, circleSpacing}) => {
    const styles = reactCSS({
        'default': {
            card: {
                width,
                display: 'flex',
                flexWrap: 'wrap',
                marginRight: -circleSpacing,
                marginBottom: -circleSpacing,
                justifyContent: 'center',
                margin: 'auto',
                padding: '2rem'
            },
        },
    });

    const handleChange = (hexCode, e) => onChange({hex: hexCode, source: 'hex'}, e)

    return (
        <div style={styles.card} className="circle-picker">
            {map(colors, (c) => (
                <CircleSwatch
                    key={c}
                    color={c}
                    onClick={handleChange}
                    onSwatchHover={onSwatchHover}
                    active={hex === c.toLowerCase()}
                    circleSize={circleSize}
                    circleSpacing={circleSpacing}
                />
            ))}
        </div>
    )
};

Circle.defaultProps = {
    width: '252px',
    circleSize: 28,
    circleSpacing: 14,
    colors: [
        material.red['100'], material.red['300'],  material.red['500'],
        material.pink['100'],material.pink['300'],material.pink['500'],
        material.purple['100'], material.purple['300'], material.purple['500'],
        material.deepPurple['100'],material.deepPurple['300'],material.deepPurple['500'],
        material.indigo['100'],material.indigo['300'],material.indigo['500'],
        material.blue['100'],material.blue['300'],material.blue['500'],
        material.lightBlue['100'],material.lightBlue['300'],material.lightBlue['500'],
        material.cyan['100'],material.cyan['300'],material.cyan['500'],
        material.teal['100'],material.teal['300'],material.teal['500'],
        material.green['100'],material.green['300'],material.green['500'],
        material.lightGreen['100'],material.lightGreen['300'],material.lightGreen['500'],
        material.lime['100'],material.lime['300'],material.lime['500'],
        material.yellow['100'],material.yellow['300'],material.yellow['500'],
        material.amber['100'],material.amber['300'],material.amber['500'],
        material.orange['100'],material.orange['300'],material.orange['500'],
        material.deepOrange['100'],material.deepOrange['300'],material.deepOrange['500'],
        material.brown['100'],material.brown['300'],material.brown['500'],
        material.blueGrey['100'],material.blueGrey['300'],material.blueGrey['500'],
        '#000'
    ],
};

export default ColorWrap(Circle)