import React from 'react';
import { Col, Thumbnail, Button } from 'react-bootstrap';

const artists = props => {
    let clickedArtist = { ...props.data, origin: props.origin }
    return (
            <Col xs={12} sm={6} lg={4}>
                <Thumbnail fluid src={(props.data.images.length > 0) ? props.data.images[0].url : ''}  alt="242x200">
                    <p>{props.data.name}</p>
                    <p>Popularity Score: {props.data.popularity}</p>
                    <p>
                        <Button bsStyle="default" bsSize="small" className='btn-artistClick rounded' onClick={()=>props.handleArtistClick(clickedArtist, 'any')}>View Related Artists</Button>
                        <Button bsStyle="default" bsSize="small" className='btn-artistClick rounded' onClick={()=>props.handleArtistClick(clickedArtist, 'all')}>Discover PERFECT Matches</Button>
                    </p>
                </Thumbnail>
            </Col>
    );
}

export default artists;