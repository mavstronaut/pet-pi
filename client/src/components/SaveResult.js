import React from "react"; 

// this displays the sounds available to play
// can i bring both props and children in as multiple parameter arguments?
function SavedResult({children}) {  
    return (
      <div className="container mt-3">
        <div className="card">
          <button className="btn btn-sm float-right btn-info" type="button" >Toggle Local Sound</button>
          <h5 className="card-header">Active Sounds</h5>
          <div className="card-body">{children}</div>
        </div>
      </div>
    );
}

export default  SavedResult; 