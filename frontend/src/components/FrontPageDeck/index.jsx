import React, { useState, useEffect } from 'react';
import RatingDisplay from '../RatingDisplay';
import ConfirmationDialog from '../ConfirmationDialog';
import MakePDF from '../pdf-file';
import MiniCard from '../MiniCard';
import { deleteScheme } from '../../API/schemes'; 
import { getUserName } from '../../API/users'; 
import './style.css';

const FPDeck = ({data}) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    getUserName(data.scheme.creator).then(data => setUsername(data));
    console.log(data.scheme);
  }, [data]);


    return (
        <div className="scheme-card">
            <div className="scheme-header">
                <div className="scheme-title">
                    <h1>{data.scheme['scheme-name'] ? data.scheme['scheme-name'] : ("--") } <span><RatingDisplay rating={data.averageRating}/></span></h1>
                    <p className="scheme-creator">{username ? (username.name + " " + username.surname) : "Unknown user"}</p>
                </div>
            </div>    
            <div className="card-holder">
                <MiniCard cardId={data.scheme['card-artefact']} type={'artefact'}/>
                <MiniCard cardId={data.scheme['card-assessor']} type={'assessor'}/>
                <MiniCard cardId={data.scheme['card-context']} type={'context'}/>
                <MiniCard cardId={data.scheme['card-format']} type={'format'}/>
                <MiniCard cardId={data.scheme['card-timing']} type={'timing'}/>
                <MiniCard cardId={data.scheme['card-who-is']} type={'who'}/>
                <MiniCard cardId={data.scheme['card-mission-one']}type={'mission'}/>
                <MiniCard cardId={data.scheme['card-mission-two']}type={'mission'}/>
                <MiniCard cardId={data.scheme['card-mission-three']}type={'mission'}/>
            </div>
        </div>
    );
}

export default FPDeck;