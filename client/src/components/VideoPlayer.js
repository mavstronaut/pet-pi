import React from 'react';

function VideoPlayer(props) {
    return(
        <div>
            <iframe width="100" height="100" name="player" title="player" src={props.link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>            
        </div>
    )
    
}
export default VideoPlayer;