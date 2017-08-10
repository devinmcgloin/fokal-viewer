import React from 'react'
import FontAwesome from 'react-fontawesome'

const User = (props) => {
    return (
        <div className="container is-full-hd">
            <h1 className="title">{props.name}</h1>
            <h2 className="subtitle">{props.bio}</h2>
            <FontAwesome name="external-link">
                <a href={props.url}/>
            </FontAwesome>
        </div>
    )
}

export {User};