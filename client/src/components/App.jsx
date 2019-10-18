import React from 'react';
import axios from 'axios';
import Namelist from './Namelist.jsx';
import RelatedTracks from './RelatedTracks.jsx';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userPictures: [],
            likes: 0,
            likeWord: 'likes',
            songInformation: []


        }
        this.onClickLikes = this.onClickLikes.bind(this);
        this.onClickProfiles = this.onClickProfiles.bind(this);
        this.countRelatedTracksLikes = this.countRelatedTracksLikes.bind(this);

    }

    componentDidMount () {
        axios.get('/userinfo')
            .then( (data) => {
                var array = [];
                for(var i = 0; i<=8; i++){
                    array.push(data.data[i])
                }
                this.setState({userPictures: array}, () =>{
                    // console.log(this.state.userPictures)
                })
                
            })

            axios.get('/songinfo')
                .then( (data) => {
                    var array = [];
                    data.data.forEach( (songInfoObj) => {
                        if(songInfoObj.category === 'Hip-Hop'){
                            array.push(songInfoObj)
                        }
                    })
                    this.setState({songInformation: array}, () => {
                        // console.log('STATE SONG INFO: ', this.state.songInformation)
                    })
                })
                .then(axios.get('/likes')
                    .then ( (data) => {
                        var count = 0
                        data.data.forEach( (songObj) => {
                            if(songObj.song_id === 1){
                                count++
                            }
                        })
                        this.setState({likes: count})
                        if(count === 1) {
                            this.setState({likeWord: 'like'})
                        }
                        // console.log(this.state.likes)
                        
                        var stateSongInfo = this.state.songInformation;
                        stateSongInfo.forEach( (songInfoObj) => {
                            this.countRelatedTracksLikes(data, songInfoObj)
                        })
                        this.setState({songInformation: stateSongInfo}, () => {

                            console.log('This.state.songInfomation: ', this.state.songInformation)
                        })
                    }))
                    .then(axios.get('/userinfo')
                        .then( (data) => {
                            console.log('USERINFO: ', data.data)
                            var stateSongInfo = this.state.songInformation
                            stateSongInfo.forEach( (songObj) => {
                                data.data.forEach( (dataObj) =>{
                                    if(songObj.username_id === dataObj.username_id){
                                        songObj.username = dataObj.username
                                    }
                                })
                            })
                            console.log('STATE SONGINFO: ', stateSongInfo)
                            this.setState({songInformation: stateSongInfo})
                        })
                    )
        

    };


    countRelatedTracksLikes (data, songInfoObj) {
        var count = 0
        data.data.forEach( (songObj) => {
            if(songObj.song_id === songInfoObj.song_id){
                count++
            }
        })
        songInfoObj['likes'] = count;
    }

    onClickLikes () {
        alert('View all likes has been clicked')
    }

    onClickProfiles (username) {
        alert(`${username} has been clicked`)
    }


    render () {
        return (
            <div>
            <div className='relatedTracksBlock'>
                <div className='header'>
                    <div className='iconWords'>
                        <div className='trackIcon' ><img className='waveformImage' src='/images/waveform.png' /></div>
                        <div className='relatedTracksWritten'>{'Related tracks'}</div>
                    </div>
                    <div className='tracksViewall'>{'View all'}</div>
                </div>
                <div className='relatedTracksContainerWithPad'>
                    <div className='relatedTracksContainer'>
                        <ul className='relatedTracksContainer uLRelatedTracks'>
                            {this.state.songInformation.map( (songInformationObj) => {
                                return(
                                <RelatedTracks song={songInformationObj} />
                                )
                            })
                            }
                        </ul>
                    </div>

                </div>
            </div>
            <div className='likeBlock'>
                <div className='header' >
                    <div onClick={this.onClickLikes} className='likeHeader'>
                        <span className='heartLikeBundle'>
                            <span className='heart'><img src='/images/heart.png'></img></span>
                            <span className='likeNumber'>{`${this.state.likes} ${this.state.likeWord}`}</span>
                        </span>
                        <span className='likeHeader viewAllLikes'>{'View all'}</span>
                    </div>
                    <div className='likeContainer'>
                        <ul className='profilePicture'>
                                {
                                this.state.userPictures.map( (pictureObj) => {
                                    return(
                                    <Namelist picture={pictureObj} clickProfile={this.onClickProfiles}/>                        )
                                })}
                        </ul>
                    </div> 
                </div>
            </div>
            </div>
        )
    }
}

export default App; 