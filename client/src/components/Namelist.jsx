import React from 'react';
import Popup from 'reactjs-popup'

function onFollow(username) {
    alert(`${username} has been followed`)
}

function onClickFollowers() {
    alert('Followers has been clicked')
}

function Card(props) {
    return(
        <div className='card'>
            <img className= 'roundImage followHover' src={props.picture.user_picture_url} height="70px" width="70px" onClick={() => props.clickProfile(props.picture.username)}/>
            <div className='cardName'>
                <div className='followerName' onClick={() => props.clickProfile(props.picture.username)}>{props.picture.username}</div>
                <span className='followerNumber' onClick={() => onClickFollowers()}>{props.picture.followers}</span>
                <button className='followButton' onClick={() => onFollow(props.picture.username)}>{'Follow'}</button>
            </div>
        </div>
    )
}

function Namelist(props) {
    return(
        <Popup className='popup'
            trigger ={<li className='pppics' onClick={() => props.clickProfile(props.picture.username)}>
                <img className= 'roundImage' src={props.picture.user_picture_url} height="40px" width="40px"/>
            </li>}
            position='bottom center'
            on='hover'
            >
                <Card picture={props.picture} clickProfile={props.clickProfile}/>
            </Popup>
    )
}




export default Namelist;