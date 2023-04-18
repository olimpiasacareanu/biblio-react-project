import React, {Component} from 'react';
import classes from "./TitreH1.module.css"

const titreH1 = (props) => {
    const monCss = `${classes.policeTitre} border p-2 mt-2 text-white text-center bg-primary rounded`
    return <h1 className={monCss}>{props.children}</h1>
}

export default titreH1


