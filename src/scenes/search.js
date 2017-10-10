import React, { Component } from "react";
import { Search } from "../services/api/search";
import { bindAll } from "lodash";
import { Error } from "../components/error";
import { Loading } from "../components/loading";
import { Controls } from "../components/collectionControls";
import { Route, Switch } from "react-router-dom";
import {
    SearchImagesView,
    SearchTagsView,
    SearchUsersView
} from "../components/search";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import queryString from "query-string";

import convert from "color-convert";

const rgbRegex = /rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/,
    hexRegex = /#[A-Fa-f0-9]{6}/,
    hslRegex = /hsl\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/;
const extractTags = str => {
    // eslint-disable-next-line no-useless-escape
    const exc = /\-\w+/,
        opt = /\+\w+/;

    let optional_terms = str.match(opt);
    str = str.replace(opt, "");

    let excluded_terms = str.match(exc);
    str = str.replace(exc, "");

    return [
        str.trim(),
        optional_terms ? optional_terms.splice(-2, 2).map(t => t.slice(1)) : [],
        excluded_terms ? excluded_terms.splice(-2, 2).map(t => t.slice(1)) : []
    ];
};

const extractColor = str => {
    const digits = /\d+/g;
    if (str.search(rgbRegex) !== -1) {
        let m = str.match(rgbRegex);
        let values = m[0].match(digits);
        let hex = convert.rgb.hex(values[0], values[1], values[2]);
        let query = str.replace(rgbRegex, "");
        return [query.trim(), "#" + hex];
    } else if (str.search(hslRegex) !== -1) {
        let m = str.match(hslRegex);
        let values = m[0].match(digits);
        let hex = convert.hsl.hex(values[0], values[1], values[2]);
        let query = str.replace(hslRegex, "");
        return [query.trim(), "#" + hex];
    } else if (str.search(hexRegex) !== -1) {
        let m = str.match(hexRegex);
        let query = str.replace(hexRegex, "");
        return [query.trim(), m[0]];
    } else return [str.trim(), null];
};

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        let q = queryString.parse(props.location.search);
        this.state = {
            results: {
                images: [],
                users: [],
                tags: []
            },
            q: q.q || "",
            failed: false,
            loading: false,
            type: props.match.params.type,
            history: props.history
        };
        bindAll(
            this,
            "handleTextChange",
            "handleSubmit",
            "parseQuery",
            "loadImages"
        );
    }

    componentDidMount() {
        this.handleSubmit();
    }

    parseQuery(str) {
        let query_body = {};
        let [q, color] = extractColor(str);
        if (color) {
            query_body.color = {
                hex: color,
                pixel_fraction: 0.15
            };
        }

        let [t, optional_terms, excluded_terms] = extractTags(q);
        if (optional_terms.length !== 0)
            query_body.optional_terms = optional_terms;
        if (excluded_terms.length !== 0)
            query_body.excluded_terms = excluded_terms;

        query_body.document_types = ["user", "image", "tag"];
        query_body.required_terms = t.split(" ");
        console.log(query_body, t);

        this.loadImages(query_body);
    }

    handleTextChange(e) {
        this.setState({
            q: e.target.value
            // results: {images: [], users: [], tags: []}
        });
    }

    loadImages(query) {
        let t = this;
        Search("/search", query)
            .then(data => {
                if (data.ok)
                    data.body.then(d =>
                        t.setState({
                            results: d,
                            loading: false,
                            failed: false
                        })
                    );
                else
                    t.setState({
                        failed: true,
                        loading: false
                    });
            })
            .catch(err => {
                t.setState({
                    failed: true,
                    loading: false
                });
            });
    }

    handleSubmit() {
        this.setState({
            loading: true
        });
        const q = this.state.q;

        if (q === "") {
            this.setState({
                loading: false
            });
            return;
        }

        this.state.history.push({
            search: "?q=" + encodeURIComponent(q)
        });
        console.log(q);

        this.parseQuery(q);
    }

    render() {
        let content = null;
        if (this.state.loading) content = <Loading />;
        else if (this.state.failed) content = <Error />;

        const results = this.state.results;
        const controllerOptions = [
            {
                link: "/search/images",
                tag: "images"
            },
            {
                link: "/search/users",
                tag: "users"
            },
            {
                link: "/search/tags",
                tag: "tags"
            }
        ];

        return (
            <div className="ph3 ph4-ns">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        this.handleSubmit();
                    }}
                    className="sans-serif mw7 pa5-ns pa2 pb6 ma2 tc br2 center"
                >
                    <input
                        className="f5 input-reset bn fl white bg-black-70 pa3 lh-solid w-75 w-80-l br2 br--left ba b--black-70 h3"
                        type="text"
                        id={"query"}
                        name={"query"}
                        onChange={this.handleTextChange}
                        value={this.state.q}
                        style={{
                            height: "3rem"
                        }}
                    />
                    <button
                        onClick={e => {
                            e.preventDefault();
                            this.handleSubmit();
                        }}
                        className="f5 button-reset fl pv3 tc bn bg-animate bg-black-80 hover-bg-black white pointer w-25 w-20-l br2 br--right"
                        style={{
                            height: "3rem"
                        }}
                    >
                        <FontAwesome name={"search"} />
                    </button>
                </form>
                <Controls
                    options={controllerOptions}
                    selected={this.state.type}
                    layout="grid"
                    handleLayoutChange={() => {}}
                    handleTypeChange={t =>
                        this.setState({
                            type: t
                        })}
                    query={"?q=" + encodeURIComponent(this.state.q)}
                />
                {content ? (
                    content
                ) : (
                    <Switch>
                        <Route
                            path={"/search/images"}
                            render={() => (
                                <SearchImagesView images={results.images} />
                            )}
                        />
                        <Route
                            path={"/search/users"}
                            render={() => (
                                <SearchUsersView users={results.users} />
                            )}
                        />
                        <Route
                            path={"/search/tags"}
                            render={() => (
                                <SearchTagsView tags={results.tags} />
                            )}
                        />
                    </Switch>
                )}
            </div>
        );
    }
}

SearchContainer.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export { SearchContainer, extractColor, extractTags };
