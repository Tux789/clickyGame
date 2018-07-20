import React from "react";
import "./Image.css";

const Image = props =>
<img className="click-image" src={props.src} name={props.name} alt={props.name} imageid={props.id} {...props} />


export default Image