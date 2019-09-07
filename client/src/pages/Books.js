import React, { Component } from "react";
import SearchCard from "../components/SearchCard"; /* this component is used for the save form */
import SearchResult from "../components/SearchResult"; 
import BookItemCard from "../components/BookItemCard"; /* this component is used for the sound cards */
import SaveCard from "../components/SaveResult";
import API from "../utils/API";

// this is for login
// import Login from "../components/LoginCard";

// this is for youtube
// import audioDefault from "../../../models/hardSounds";
//import VideoPlayer from "../components/VideoPlayer";

// hard coded sounds
// import hardSounds from "../utils/hardSounds"


// login form will probably require redux to have secure form secrets



class Books extends Component {

    state = {
        results: [],
        savedSounds: [],
        soundSearch: {title: "", link: "", type: ""},
        link: {link: "", title: "", type: ""},
        localSound: 0,
        login: {user: "", pass: ""}
        // login: [],
        // videoState: 
    };

    componentDidMount (){

        API.getSavedSounds()
                .then(res => {
                    this.setState({
                        savedSounds: res.data
                    })

                })
            //     .catch(API.getHardSounds()
            //         .then(res => {
            //             this.setState({
            //                 savedSounds: res.data
            //             })
            //     })
            // )
    }

    handleSearch = event => {

        event.preventDefault();

        const saveSound = this.state.form;
        console.log(saveSound);

        let soundData = {
            title: saveSound.title,
            link: saveSound.link,
            type: saveSound.type,
            key: saveSound.id
        }

        if (this.state.form) {
            API.searchBooks(soundData.link, soundData)
                .then(res =>
                    this.setState({
                        results: res.data.items
                    })
                    // console.log("reesponse", res.data.items)
                )
                .catch(err => console.log(err));
        }
    }


    //On Button click for adding sounds directly
    handleForm = event => {

        event.preventDefault();

        const saveSound = this.state.form;
        console.log(saveSound);

        let soundData = {
            title: saveSound.title,
            link: saveSound.link,
            type: saveSound.type,
            key: saveSound.id
        }

        if(!soundData.title) {
            if (this.state.form) {
                API.searchBooks(soundData.link, soundData)
                    .then(res =>
                        this.setState({
                            results: res.data.items
                        })
                        // console.log("reesponse", res.data.items)
                    )
                    .catch(err => console.log(err));
            }
        } else {
            // this try / catch won't register. fix with promise .catch 
            // try {
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
            // } 
            // catch {
            //     API.getHardSounds()
            //         .then(res => {
            //             this.setState({
            //                 savedSounds: res.data
            //             })
            //         })
            // }
        }

        

        
    }

    handleInputChange = event => {

        const value = event.target.value;
        let currentSoundSearch = this.state.soundSearch;
        currentSoundSearch[event.target.name] = value;
        this.setState({
            soundSearch: currentSoundSearch
        })
    }

    handleLoginChange = event => {

        const value = event.target.value;
        let currentLogin = this.state.login;
        currentLogin[event.target.name] = value;
        this.setState({
            login: currentLogin
        })
    }

    
    handleSave = event => {
        // saveSound needs to come from the form that was submitted from SearchCard
        const saveSound = this.state.form;
        console.log(saveSound);

        const soundData = {
            title: saveSound.title,
            link: saveSound.link,
            type: saveSound.type,
            key: saveSound.id
        }

        // try {
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
        // } 
        // catch {
        //     API.getHardSounds()
        //         .then(res => {
        //             this.setState({
        //                 savedSounds: res.data
        //             })
        //         })
        // }
    }

    handleSearchSave = event => {
        const login = this.state.login;
        console.log(login);

        const loginField = {
            user: loginField.user,
            pass: loginField.pass,
        }

        API.login(loginField)
            .then(API.getLogin()
                .then(res => {
                    this.setState({
                        login: res.data
                    })
                    
                })
            )

    }    


    handleSave = event => {
        // saveSound needs to come from the form that was submitted from SearchCard
        const saveSound = this.state.form;
        console.log(saveSound);

        const soundData = {
            title: saveSound.title,
            link: saveSound.link,
            type: saveSound.type,
            key: saveSound.id
        }

        // try {
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
        // } 
        // catch {
        //     API.getHardSounds()
        //         .then(res => {
        //             this.setState({
        //                 savedSounds: res.data
        //             })
        //         })
        // }
    }

    handleSearchSave = event => {
        const soundIndex = event.target.attributes.getNamedItem("data-index").value;
        const saveSound = this.state.results[soundIndex];
        console.log(saveSound);

        const soundData = {
            title: saveSound.title,
            link: saveSound.link,
            thumbnail: saveSound.thumbnail,
            type: saveSound.type,
            key: saveSound.id
        }

        // try {
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
        // } 
        // catch {
        //     API.getHardSounds()
        //         .then(res => {
        //             this.setState({
        //                 savedSounds: res.data
        //             })
        //         })
        // }
    }    

    handleDelete = event => {
        const soundIndex = event.target.attributes.getNamedItem("data-index").value;
        const deleteSound = this.state.savedSounds[soundIndex]
        console.log(deleteSound._id)

        API.deleteSound(deleteSound._id).then(
            
            window.location.reload()
        )
        
    }

    handleLocalToggle = event => {
        if (this.state.localSound === 0) {
            this.setState({
                localSound: 1
            })
            console.log(this.state.localSound);
        } else {
            this.setState({
                localSound: 0
            })
            console.log(this.state.localSound);
        }
    }

    handlePlay = event => {
        
        if (this.state.localSound === 1) {
            // logic to play sound locally in window using embedded player    


            API.playSound(this.state.link)
        } else {
            // send the url from the object to the playSound backend controller
            API.playSound(this.state.link)
        }
    }

    /*
    handleVideoPlayer = event => {
        if (this.state.videoState === 0) {
            this.setState({
                videoState: "player"
            })
            console.log(this.state.videoState);
        } else {
            this.setState({
                videoState: 0
            })
            console.log(this.state.videoState);
        }
    }

    handleVideoPlay = event => {
        
        if (this.state.videoState === 1) {
            // logic to play sound locally in window using embedded player    


            API.playVideo(this.state.link)
        } else {
            // send the url from the object to the backend playNodeMediaStream
            API.playLocalVideo(homelink)
        }
    }  
    */




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

                        <SearchResult
                        value={this.state.localSound}
                        onClick={this.handleLocalToggle}>
                            {this.state.results.length ? (

                                this.state.results.map( (sound, i) => {
                                    return (
                                        <BookItemCard
                                            key={sound.id}
                                            href={sound.link}
                                            thumbnail={(sound.thumbnail) ? (sound.thumbnail) : ("https://i.imgur.com/R3q09Me.png")}
                                            save={this.handleSearchSave}
                                            play={this.handlePlay}  
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
                    <div>
                    
                
                    <SaveCard
                        value={this.state.localSound}
                        onClick={this.handleLocalToggle}>
                        {this.state.savedSounds.length ? (

                            this.state.savedSounds.map((sound, i) => {
                                return (
                                    <BookItemCard
                                        key={sound._id}
                                        title={sound.title}
                                        href={sound.link}
                                        thumbnail={(sound.thumbnail) ? (sound.thumbnail) : ("https://i.imgur.com/R3q09Me.png")}   
                                        play={this.handlePlay}                                     
                                        delete={this.handleDelete}
                                        index={i}
                                    />
                                )
                            })
                        ) : ( 
                             <h3> nothing to display </h3>
                            // audioDefault.state.savedSounds.map((sound, i) =>{// function to hold 
                                // return (
                                //     <BookItemCard
                                //         key={sound._id}
                                //         title={sound.title}
                                //         href={sound.link}
                                //         thumbnail={(sound.thumbnail) ? (sound.thumbnail) : ("https://i.imgur.com/R3q09Me.png")}
                                //         play={this.handlePlay}
                                //         delete={this.handleDelete}
                                //         index={i}
                                //     />

                                //     )
                                // })


                                
                            )}
                    </SaveCard>

                    <Login 
                        value={this.state.login}
                        onChange={this.handleLoginChange}
                        onClick={this.handleLogin}
                        /> 
                    </div>
                    
                }
                    
            </div>

                   
                    
        )
    }

}

export default Books;