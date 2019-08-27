import React from "react"; 

function SoundItemCard(props) { 

    return (
      
            <div className="card mb-3"> 
                
            <div className="row no-gutters">
                <div className="col">
                    {/* Add link to new images */}
                <img src={props.thumbnail} className="card-img" alt={props.title} style={{width: "200px"}}/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">Written By: {props.author}</p>
                    <p className="card-text">Desc: {props.description}</p>

                </div>
                <a href={props.href} target="_blank" className="btn btn-primary" role="button">View</a>
                {window.location.pathname ===  "/" ?  

                    <span data-index={props.index} className="save btn btn-success" onClick={props.save}>Save</span>
                    : 
                    <span data-index={props.index} className="delete btn btn-danger" onClick={props.delete}>Delete</span>
                }
                </div>
            </div>
            </div>
    );
}

export default  SoundItemCard; 