import React, { Component } from 'react';
import axios from 'axios';

const context = React.createContext();
const { Provider, Consumer } = context;

class EnhancedProvider extends Component {
    state = {
        showSuggestedArtists: false,
        showMatchingArtists: false,
        showRelatedArtists: false,
        suggestedArtists: [],
        relatedArtists: [],
        recentClicks: [],
        searchInput: '',
        clickedArtistID: ''
    }

    handleSearch = async input => {
        let searchInput = input.toLowerCase().trim().replace(/\s+/g, '');
        let suggestedArtists = [];
        const res = await axios('/api/suggestArtists', {
            params: {
                searchInput
            }
        });
        suggestedArtists = await res.data.data;
        if (suggestedArtists.length === 0) {
            this.handleFindMore(input)
        } else {
            this.setState({
                showSuggestedArtists: true,
                showMatchingArtists: false,
                showRelatedArtists: false,
                relatedArtists: [],
                suggestedArtists,
                searchInput
            });
        }
    }

    handleFindMore = async searchInput => {
        const res = await axios('/api/artistSearch?', {
            params: {
                searchInput
            }
        });
        const matchedArtists = await res.data.data;
        this.setState({
            showSuggestedArtists: false,
            showRelatedArtists: false,
            showMatchingArtists: true,
            searchInput: '',
            matchedArtists,
        });
    }

    handleSuggestedClick = el => {
        let matchedArtists = [el];
        this.setState({
            showSuggestedArtists: false,
            showMatchingArtists: true,
            showRelatedArtists: false,
            matchedArtists,
            suggestedArtists: []
        });
    }

    handleArtistClick = async (clickedArtist, type) => {
        let relatedArtists, clickedArtistID, matchedArtists, { spotifyID, genres, origin } = clickedArtist;
        let recentClicks = this.state.recentClicks;
        (origin === "RelatedArtists" || origin === "SuggestedArtists") ? matchedArtists = [clickedArtist] : matchedArtists = this.state.matchedArtists
        if (genres.length === 0) {
            relatedArtists = { message: 'No Results Found' };
        }
        else if (genres.length >= 7) {
            relatedArtists = { message: 'Sorry, this artist has too many genres to match.' };
        } else {
            const res = await axios('/api/relatedArtistSearch?', {
                params: {
                    genres,
                    type
                }
            });
            relatedArtists = await res.data.data;
            clickedArtistID = spotifyID;
            recentClicks.unshift(clickedArtist);
        }
        this.setState({
            showRelatedArtists: true,
            relatedArtists,
            clickedArtistID,
            matchedArtists
        });
    }

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    handleSearch: this.handleSearch,
                    handleSuggestedClick: this.handleSuggestedClick,
                    handleArtistClick: this.handleArtistClick,
                    handleFindMore: this.handleFindMore
                }}>
                {this.props.children}
            </Provider >
        );
    }
}

const StateContext = { EnhancedProvider, Provider, Consumer };
export default StateContext;