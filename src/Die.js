import React from "react";

export default function Die(props) {
    return (
        <div
            className={`die ${props.isHeld ? "selected" : ""}`}
            onClick={props.handleClick}
        >
            {props.value}
        </div>
    );
}
