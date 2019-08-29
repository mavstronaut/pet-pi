import React from "react";

function SearchCard(props) {
    return (
        <div className="container mt-3">
            <div className="card">
                <h5 className="card-header">Sound Search</h5>
                <div className="card-body">
                    <form onSubmit={props.onClick}>
                        <div className="form-group">
                            <label >Sound</label>
                            <input type="text" className="form-control" value={props.value} onChange={props.onChange} placeholder="Example: http://youtube.com/?= Youtube Link" required/>
                        
                            <select class="form-control" id="sound-type">
                                <option value="alert">Alert</option>
                                <option value="distract">Distract</option>
                                <option value="good">Good Boy</option>
                            </select>
                        </div>
    <button className="btn btn-sm float-right btn-info" type="submit" >Save</button>  {/* Previously was the search button */}
                    </form>
                </div>
            </div>
        </div>
    )

}

export default SearchCard;