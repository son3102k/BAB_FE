import * as React from 'react';
import "../static/css/Sidebar.css"

export default function Sidebar(props) {
    return(
        <div className="sidebar">
            {props.children}
        </div>
    );
}
