import React from 'react';
import Artist from './artist.jsx';
import { Row } from 'react-bootstrap';

const matchingArtists = props => {
    let matchedArtists = [];
    if (props.artistsData) {
        props.artistsData.forEach((el, i) => {
            matchedArtists.push(<Artist data={el} origin="matchingArtists" key={i} handleArtistClick={props.handleArtistClick} />)
        })
    }

    return (
        <div id='matchingArtistsContainer' className={props.display ? '' : 'hidden'}>
            <h2>Matched Artists</h2>
            <Row className='thumbnail-margin'>{matchedArtists}</Row>
        </div>
    );
}

export default matchingArtists;