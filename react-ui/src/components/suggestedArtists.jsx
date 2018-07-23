import React from 'react';
import StateContext from '../store.jsx'
import { ListGroup, ListGroupItem, Button, Image, Row, Col } from 'react-bootstrap';

const suggestedArtists = props => {
    let suggestedArtists = [];
    if (props.suggestedArtistsData) {
        props.suggestedArtistsData.forEach((el, i) => {
            el.origin = "SuggestedArtist";
            let genres = el.genres.join(',').replace(/,/g, ', ');
            suggestedArtists.push(
                <ListGroupItem key={i} onClick={() => props.handleSuggestedClick(el)}>
                    <Row>
                        <Col xs={2} sm={1} className='img-container'>
                            <Image src={(el.images.length > 0) ? el.images[el.images.length - 1].url : ''} circle responsive />
                        </Col>
                        <Col xs={10} sm={11}>
                            <Row className='artistDesc'>
                                <Col fluid xs={12}>
                                    <Row>
                                        <strong>{el.name}</strong>
                                    </Row>
                                    <Row>
                                        <small className='symbol'><i>Popularity Score: {el.popularity}</i></small>
                                        {el.genres.length > 0 ? <small style={{margin:'0px 0px 0px 5px'}}><i>Genres: {genres}</i></small> : <small><i>{'No genres found for this artist.'}</i></small>}
                                    </Row>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </ListGroupItem>);
        })
    }

    return (
        <StateContext.Consumer>
            {context => {
                return (
                    <div id='suggestedArtistsContainer' className={props.display ? '' : 'hidden'} >
                        {(suggestedArtists.length > 0) ?
                            <div>
                                <p><i><b>Did you mean any of the following?</b></i></p>
                                <ListGroup>
                                    {suggestedArtists}
                                </ListGroup>
                            </div>
                            : ''}
                        <Button bsClass="btn-lg btn-block" className='invert-colors' onClick={() => context.handleFindMore(context.searchInput)}>None of the Above</Button>
                    </div>
                )
            }}
        </StateContext.Consumer>

    );
}

export default suggestedArtists;