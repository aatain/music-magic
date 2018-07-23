import React from 'react';
import Artist from './artist.jsx';
import { Row } from 'react-bootstrap';

const relatedArtists = props => {
    let relatedArtists = [];
    if (props.relatedArtistsData.message) {
        relatedArtists = <p>{props.relatedArtistsData.message}</p>; 
    } else {
        props.relatedArtistsData.forEach((el, i) => {
            if (el.spotifyID !== props.matchedArtistID && relatedArtists.length < 10) relatedArtists.push(<Artist origin="RelatedArtists" data={el} key={i} handleArtistClick={props.handleArtistClick}/>);
        })
    }

    return (
        <div id='relatedArtistsContainer' className={props.display ? '' : 'hidden'} >
        <h2>Related Artists</h2>
        <Row className='thumbnail-margin'>{relatedArtists}</Row>
        </div>
    );
}

export default relatedArtists;