import React from 'react';
import { Col, Row } from 'react-bootstrap';
import StateContext from '../store.jsx'

const RecentlyMatched = props => {
    return (
        <StateContext.Consumer>
            {context => {
                let clickedItems = [];
                if (context.recentClicks.length > 0) {
                    clickedItems = context.recentClicks.map((el, i) => {
                        return <li key={i}>
                            {el.name}
                        </li>;
                    });
                } else {
                    clickedItems = <div>No recent searches</div>
                }

                return (
                    <div>
                        <Row className="show-grid" >
                            <Col xs={12} className='col'>
                                <h3>Recently Matched Artists</h3>
                                <ul>{clickedItems}</ul>
                            </Col>
                        </Row>
                    </div>
                )
            }}
        </StateContext.Consumer>
    );
}

export default RecentlyMatched;