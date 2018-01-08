import React from "react";
import PropTypes from "prop-types";
import { bindAll } from "lodash";

class ColorCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: props.colors,
            active: 0
        };
        bindAll(this, "handleHover");
    }

    handleHover(indx) {
        this.setState({
            active: indx
        });
    }

    render() {
        const colors = this.state.colors,
            active = this.state.active;

        const clrs = colors.map((clr, i) => (
            <div
                key={clr.hex}
                onClick={() => this.handleHover(i)}
                name={i}
                className="fl pa3 br-100 ma1 ba b--black hover grow pointer"
                style={{ background: "#" + clr.hex }}
            />
        ));

        const activeClr = colors[active];

        return (
            <article className="sans-serif bg-white br2 ba b--black-10 shadow-5">
                <div className={"pa3 pa4-ns cf"}>
                    <div className={"w-60 fl br b--black-10 dib"}>{clrs}</div>
                    <div className={"w-40 fl dib pa3"}>
                        <div>#{activeClr.hex}</div>
                        <div>
                            rgb({activeClr.sRGB.r}, {activeClr.sRGB.g},
                            {activeClr.sRGB.b})
                        </div>
                        <div>
                            hsv({activeClr.hsv.h}, {activeClr.hsv.s},
                            {activeClr.hsv.v})
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

ColorCard.propTypes = {
    colors: PropTypes.arrayOf(
        PropTypes.shape({
            hex: PropTypes.string.isRequired
        })
    )
};

ColorCard.defaultProps = {
    colors: []
};

export { ColorCard };
