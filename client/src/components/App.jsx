import React from 'react';
import axios from 'axios';
import Namelist from './Namelist.jsx';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userPictures: [],
            likes: 0,
            likeWord: 'likes',


        }
        this.onClickLikes = this.onClickLikes.bind(this);
        this.onClickProfiles = this.onClickProfiles.bind(this);

    }

    componentDidMount () {
        axios.get('/userinfo')
            .then( (data) => {
                var array = [];
                for(var i = 0; i<=8; i++){
                    array.push(data.data[i])
                }
                this.setState({userPictures: array}, () =>{
                    console.log(this.state.userPictures)
                })
                
            })

        axios.get('/likes')
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
                console.log(this.state.likes)
            })
    };

    onClickLikes () {
        alert('View all likes has been clicked')
    }

    onClickProfiles (username) {
        alert(`${username} has been clicked`)
    }


    render () {
        return (
            <article className='likeBlock'>
                <div className='header' >
                    <div onClick={this.onClickLikes} className='likeHeader'>
                        <span className='heartLikeBundle'>
                            <span className='heart'><img src='/images/heart.jpeg'></img></span>
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
            </article>
        )
    }
}

export default App; 