import React from 'react';
import { resolvePreset } from '@babel/core';
import { timingSafeEqual } from 'crypto';
import axios from 'axios';


class RelatedTracks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            songInformation: props.song
        }

    this.postLike = this.postLike.bind(this);
    }


    postLike (songId, usernameId, likes) {
            var value = {songId, usernameId, likes};
            axios.post('/likePost', value)
                .then( (data) => {
                    // console.log('Like Posted')
                    var updatedLikes = value.likes + 1;
                    // console.log('updated likes: ', updatedLikes)
                    var songInfoArray = this.state.songInformation;
                    // console.log('songInfoArray: ', songInfoArray)
                    songInfoArray.likes = updatedLikes
                    
                    this.setState({songInformation: songInfoArray}, ()=>{
                        // console.log('new state array: ', this.state.songInformation)
                    })
                    console.log('Posted Data: ', data.data)
                })
        }

    render(){
        return(
            <li className='singleTrackContainer'>
                <div className='singleTrackInformation'>
                    <span className='relatedTrackPicHolder'>
                        <span className='rtImageBox'>
                            <img className='rtImage' src={this.state.songInformation.song_picture_url} height="50px" width="50px" />
                            <img className='rtImageOverlay' src='/images/playoverlay.png' heigth='30px' width='30px' />
                        </span>
                    </span>
                    <span className='trackArtistSongInfo'>
                        <div className='artistSongName'>
                            <div className='relatedArtistNameBox'>
                                <div className='relatedArtistName'>{this.state.songInformation.username}</div>
                            </div>
                            <div className='relatedSongNameBox'>
                                <div className='relatedSongName'>{this.state.songInformation.title}</div>
                                <div className='relatedMenuOptions'>
                                    <span className='likeRelatedSong'>
                                        <img className='likeRelatedSongBlackHeart' src='/images/blackheart.png' height='12px' width='12px' onClick={() => {this.postLike(this.state.songInformation.song_id, this.state.songInformation.username_id, this.state.songInformation.likes)}}></img>
                                    </span>
                                    <span className='relatedDropDownMenu'>
                                        <img className='menuRelatedSongImage' src='/images/menu.png' height='12px' width='14px'></img>
                                    </span>
                                </div>
                            </div>
                            <ul className='relatedTrackIconList'>
                                <li className='relatedlist'>
                                    <span className='relatedPlayContainer'>
                                        <span className='relatedPlayIcon'>
                                            <img src='/images/triangledark.png' height='12px' width='15px'></img>
                                        </span>
                                        <span className='relatedTimesPlayed'>
                                            <div className='relatedPlayContainerInserts'>{this.state.songInformation.times_played}</div>
                                        </span>
                                    </span>
                                </li>
                                <li className='relatedlist'>
                                    <span className='relatedLikesContainer'>
                                        <span className='relatedLikesIcon'>
                                            <img src='/images/heart.png'></img>
                                        </span>
                                        <span className='relatedLikes'>
                                            <div className='relatedPlayContainerInserts'>{this.state.songInformation.likes}</div>
                                        </span>
                                    </span>
                                </li>
                                <li className='relatedlist'>
                                    <span className='relatedRepostsContainer'>
                                        <span className='relatedRepostsIcon'>
                                            <img src='/images/repost.png' height='11px' width='14px'></img>
                                        </span>
                                        <span className='relatedReposts'>
                                            <div className='relatedPlayContainerInserts'>{this.state.songInformation.reposts}</div>
                                        </span>
                                    </span>
                                </li>
                                <li className='relatedlist'>
                                    <span className='relatedcommentsContainer'>
                                        <span className='relatedCommentsIcon'>
                                            <img src='/images/comments.png' height='12px' width='12px'></img>
                                        </span>
                                        <span className='relatedComments'>
                                            <div className='relatedPlayContainerInserts'>{this.state.songInformation.comments}</div>
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </span>
                </div>
            </li>
        )
    }
};

export default RelatedTracks;