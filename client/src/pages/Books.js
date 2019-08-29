import React, { Component } from "react";
import SearchCard from "../components/SearchCard"; /* this component is used for the save form */
import SearchResult from "../components/SearchResult"; 
import BookItemCard from "../components/BookItemCard"; /* this component is used for the sound cards */
import SaveCard from "../components/SaveResult";
import API from "../utils/API";

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
        const soundIndex = event.target.attributes.getNamedItem("data-index").value;
        const saveSound = this.state.results[soundIndex];
        console.log(saveSound);

        const soundData = {
            title: saveSound.volumeInfo.title,
            link: saveSound.volumeInfo.previewLink,
            thumbnail: saveSound.volumeInfo.imageLinks.thumbnail,
            author: saveSound.volumeInfo.authors[0],
            description: saveSound.volumeInfo.description,
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
                                            thumbnail={(sound.volumeInfo.imageLinks) ? (sound.volumeInfo.imageLinks.thumbnail) : ("http://blogs.smithsonianmag.com/design/files/2013/03/smiley-face-1.jpg")}
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
                                        thumbnail={(sound.thumbnail) ? (sound.thumbnail) : ("http://blogs.smithsonianmag.com/design/files/2013/03/smiley-face-1.jpg")}                                        delete={this.handleDelete}
                                        index={i}
                                    />
                                )
                            })
                        ) : (
                                <h3>No Saved Sounds</h3>
                            )}
                    </SaveCard>
                }

            </div>
        )
    }

}

export default Books;