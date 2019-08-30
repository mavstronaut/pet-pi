import React, { Component } from "react";
import SearchCard from "../components/SearchCard"; /* this component is used for the save form */
import SearchResult from "../components/SearchResult"; 
import BookItemCard from "../components/BookItemCard"; /* this component is used for the sound cards */
import SaveCard from "../components/SaveResult";
import API from "../utils/API";

// this is for login
import Login from "../components/LoginCard";

// this is for youtube
import audioDefault from "../utils/hardSounds";
import parse, { parse } from "url";
import ytapi from "simple-youtube-api";
const youtube = new ytapi(YOUTUBE_KEY);
import youtube from"ytdl-core";



class Books extends Component {

    state = {
        results: [],
        savedSounds: [],
        soundSearch: ""
    };

    componentDidMount (){

        API.getSavedSounds()
                .then(res => {
                    this.setState({
                        savedSounds: res.data
                    })

                })
            
    }


    //On Button click for adding sounds directly
    handleForm = event => {

        event.preventDefault();

        const saveSound = this.state.form;
        console.log(saveSound);

        let soundData = {
            title: saveSound.title,
            link: saveSound.Link,
            type: saveSound.type,
            key: saveSound.id
        }

        
        

        let id = (() => {
            const parsed = parse(saveSound, true);
            if (/^(www\.)?youtube\.com/.test(parsed.hostname)) {
              return parsed.query.v;
            } else if (/^(www\.)?youtu\.be/.test(parsed.hostname)) {
              return parsed.pathname.slice(1);
            }
          })();
        
          if (!id) {
        
            let results = await youtube.searchVideos(song, 4);
            id = results[0].id;
            let soundData.link = id;
            API.saveSound(soundData)
            .then(API.getSavedSounds()
                .then(res => {
                    this.setState({
                        savedSounds: res.data
                    })
                    console.log("In state", this.state.savedSounds)
                    console.log("Length", this.state.savedSounds.length)
                })
            )
          } else { 
            API.saveSound(soundData)
                .then(API.getSavedSounds()
                .then(res => {
                    this.setState({
                        savedSounds: res.data
                    })
                    console.log("In state", this.state.savedSounds)
                    console.log("Length", this.state.savedSounds.length)
                })
            )
        }
    }

    handleInputChange = event => {

        const value = event.target.value;

        this.setState({
            soundSearch: value
        })
    }

    handleSave = event => {
        // saveSound needs to come from the form that was submitted from SearchCard
        const saveSound = this.state.form;
        console.log(saveSound);

        const soundData = {
            title: saveSound.title,
            link: saveSound.Link,
            type: saveSound.type,
            key: saveSound.id
        }

        
        API.saveSound(soundData)
            .then(API.getSavedSounds()
                .then(res => {
                    this.setState({
                        savedSounds: res.data
                    })
                    console.log("In state", this.state.savedSounds)
                    console.log("Length", this.state.savedSounds.length)
                })
            )
    }

    handleSearchSave = event => {
        const soundIndex = event.target.attributes.getNamedItem("data-index").value;
        const saveSound = this.state.results[soundIndex];
        console.log(saveSound);

        const soundData = {
            title: saveSound.volumeInfo.title,
            link: saveSound.volumeInfo.previewLink,
            thumbnail: saveSound.volumeInfo.imageLinks.thumbnail,
            type: saveSound.type,
            key: saveSound.id
        }


        API.saveSound(soundData.key, soundData)
            .then(API.getSavedSounds()
                .then(res => {
                    this.setState({
                        savedSounds: res.data
                    })
                    console.log("In state", this.state.savedSounds)
                    console.log("Length", this.state.savedSounds.length)
                })
            )
    }    

    handleDelete = event => {
        const soundIndex = event.target.attributes.getNamedItem("data-index").value;
        const deleteSound = this.state.savedSounds[soundIndex]
        console.log(deleteSound._id)

        API.deleteSound(deleteSound._id).then(
            
            window.location.reload()
        )
        
    }

    handlePlay = event => {
        // create on click event
        API.playSound(clicked)
    }




    render() {
        return (
            <div>
                {window.location.pathname === "/" ?
                    <div>
                        <SearchCard
                            value={this.state.soundSearch}
                            onChange={this.handleInputChange}
                            onClick={this.handleForm}
                        />

                        <SearchResult>
                            {this.state.results.length ? (

                                this.state.results.map( (sound, i) => {
                                    return (
                                        <BookItemCard
                                            key={sound.id}
                                            href={sound.volumeInfo.previewLink}
                                            thumbnail={(sound.volumeInfo.imageLinks) ? (sound.volumeInfo.imageLinks.thumbnail) : ("https://i.imgur.com/R3q09Me.png")}
                                            save={this.handleSearchSave}
                                            index={i}
                                        />
                                    )
                                })
                            ) : (
                                    <h3>No Results to Display</h3>
                                )}
                        </SearchResult>
                    </div>
                    :
                    <SaveCard>
                        {this.state.savedSounds.length ? (

                            this.state.savedSounds.map((sound, i) => {
                                return (
                                    <BookItemCard
                                        key={sound._id}
                                        title={sound.title}
                                        href={sound.link}
                                        thumbnail={(sound.thumbnail) ? (sound.thumbnail) : ("https://i.imgur.com/R3q09Me.png")}                                        
                                        delete={this.handleDelete}
                                        index={i}
                                    />
                                )
                            })
                        ) : (
                            audioDefault.state.savedSounds.map((sound, i) =>{// function to hold 
                                return (
                                    <BookItemCard
                                        key={sound._id}
                                        key={sound.title}
                                        href={sound.link}
                                        thumbnail={(sound.thumbnail) ? (sound.thumbnail) : ("https://i.imgur.com/R3q09Me.png")}
                                        delete={this.handleDelete}
                                        index={i}
                                    />

                                    )
                                })
                            )}
                    </SaveCard>
                }

            </div>
        )
    }

}

export default Books;