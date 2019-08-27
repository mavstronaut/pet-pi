import React from "react";

function SearchCard(props) {
    return (
        <div className="container mt-3">
            <div className="card">
                <h5 className="card-header">Youtube Links (Audio Only)</h5>
                <div className="card-body">
                    <form onSubmit={props.onClick}>
                        <div className="form-group">
                            <label >Audio link:</label>
                            <input type="text" className="form-control" value={props.value} onChange={props.onChange} placeholder="https://youtube.com/?=past_link_here" required/>
                        
                            <select class="form-control" id="sound-type">
                                <option value="alert">Alert</option>
                                <option value="distract">Distract</option>
                                <option value="good">Good Boy</option>
                            </select>

                        </div>
                        <button className="btn btn-sm float-right btn-info" type="submit" >Save</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default SearchCard;