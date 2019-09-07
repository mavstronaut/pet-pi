import React from "react";

function LoginCard(props) {
    return (
        <div className="container mt-3">
            <div className="card">
                <h5 className="card-header">Login with your credentials!</h5>
                <div className="card-body">
                    {/* This is where the new code goes */}
                    <form onSubmit={props.onClick}>
                    
                        <div className="form-group">

                            <label >Username:</label>
                            <input type="text" className="form-control" name="user" value={props.value} onChange={props.onChange} placeholder="email" required/>
                        
                            <label >Password:</label>
                            <input type="text" className="form-control" name="pass" value={props.value} onChange={props.onChange} placeholder="password" required/>
                            
                        </div>
                        {/* <button className="btn btn-sm float-right btn-info" type="submit" >Login to Mongo</button>  */}
                        <button className="btn btn-sm float-right btn-info" type="submit" >Gmail</button> 
                    </form>

                </div>
            </div>
        </div>
    )

}

export default LoginCard;