import React, { Component } from "react";
import SearchCard from "../components/SearchCard"; /* this component is used for the save form */
import SearchResult from "../components/SearchResult"; 
import BookItemCard from "../components/BookItemCard"; /* this component is used for the sound cards */
import SaveCard from "../components/SaveResult";
import API from "../utils/API";
import audioDefault from "../utils/hardSounds";

// this is for login
import Login from "../components/LoginCard";

// this is for youtube



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


    //On Button click for searching sounds 
    handleSearch = event => {

        event.preventDefault();

        if (this.state.soundSearch) {
            API.searchSounds(this.state.soundSearch)
                .then(res =>
                    this.setState({
                        results: res.data.items
                    })
                    // console.log("reesponse", res.data.items)
                )
                .catch(err => console.log(err));
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
                            onClick={this.handleSearch}
                        />

                        <SearchResult>
                            {this.state.results.length ? (

                                this.state.results.map( (sound, i) => {
                                    return (
                                        <BookItemCard
                                            key={sound.id}
                                            href={sound.volumeInfo.previewLink}
                                            thumbnail={(sound.volumeInfo.imageLinks) ? (sound.volumeInfo.imageLinks.thumbnail) : ("https://i.imgur.com/R3q09Me.png")}
                                            save={this.handleSave}
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
                            this.state. // function to hold
                                    <BookItemCard
                                        key={sound._id}
                                        key={sound.title}
                                        href={sound.link}
                                        thumbnail={(sound.thumbnail) ? (sound.thumbnail) : ("https://i.imgur.com/R3q09Me.png")}
                                    />
                        
                                )
                                <h3>No Saved Sounds</h3>
                            )}
                    </SaveCard>
                }

            </div>
        )
    }

}

export default Books;