import React, { Component } from 'react';
import RecentlyMatched from '../components/recentlyMatched.jsx';
import Search from '../components/search.jsx';
import Suggestions from '../components/suggestedArtists.jsx';
import MatchingArtists from '../components/matchingArtists.jsx';
import RelatedArtists from '../components/relatedArtists.jsx';
import { Col, Row, Glyphicon, Button } from 'react-bootstrap';
import StateContext from '../store.jsx'

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewOption: 'Recently Matched Artists'
        }
    }

    handleIconClick = (currentView) => {
        console.log(currentView);
        let viewOption;
        (currentView === 'Go Back') ? viewOption = 'Recently Matched Artists' : viewOption = 'Go Back';
        this.setState({ ...this.state, viewOption });
    }

    render() {
        return (
            <StateContext.Consumer>
                {context => {
                    let searchView = <div>
                        <Row className="show-grid" >
                            <Col xs={12} s={12}>
                                <Search handleSearch={context.handleSearch} />
                            </Col>
                            <Col xs={12}>
                                <Suggestions display={context.showSuggestedArtists} suggestedArtistsData={context.suggestedArtists} handleSuggestedClick={context.handleSuggestedClick} />
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={6} >
                                <MatchingArtists display={context.showMatchingArtists} artistsData={context.matchedArtists} handleArtistClick={context.handleArtistClick} />
                            </Col >
                            <Col xs={6} >
                                <RelatedArtists display={context.showRelatedArtists} relatedArtistsData={context.relatedArtists} matchedArtistID={context.clickedArtistID} handleArtistClick={context.handleArtistClick} />
                            </Col>
                        </Row>
                    </div>;
                    return (
                        <div id="MainContainer">
                            <Row className="show-grid" >
                                <Col xs={12} className='col'>
                                    <Button bsClass='btn btn-outline-light rounded' id='homeBtn' onClick={() => this.handleIconClick(this.state.viewOption)}>
                                        <Glyphicon glyph="music" /><span className='btn-text'>{this.state.viewOption}</span>
                                    </Button>
                                </Col>
                            </Row>
                            {(this.state.viewOption === 'Recently Matched Artists') ? searchView : <RecentlyMatched />}
                        </div>

                    )
                }}
            </StateContext.Consumer>
        );
    }
}

export default MainContainer;