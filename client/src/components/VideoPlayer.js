import React, { Component } from 'react';

function VideoPlayer(props) {
    return(
        <div>
            <iframe width="100" height="100" src={props.link} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>            
        </div>
    )
    
}
export default VideoPlayer;