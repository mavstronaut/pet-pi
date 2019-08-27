import React from "react";

function TestSound() {
    return (
        <div className="container mt-3 text-center">
            <div className="jumbotron jumbotron-fluid bg-info">
                <h3 className="font-weight-bold text-white">Toggle Local Sound</h3>
                <button className="display-4 font-weight-bold text-white localbtn" id="localbtn">{props.value}</button>
            </div>
        </div>
    )
}

export default TestSound;