import React, { Component } from 'react';

class VideoPlayer extends Component {
    render() {
        return(
            <div>
                <iframe width="100" height="100" src={props.link} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>            
                </div>
        );
    }
}
export default VideoPlayer;