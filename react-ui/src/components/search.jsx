import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, InputGroup } from 'react-bootstrap';

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.checkInput = this.checkInput.bind(this);

        this.state = {
            value: '',
            errMessage: ''
        };
    }

    handleChange(e) {
        if (e.which === '13') e.preventDefault();
        this.setState({ value: e.target.value, errMessage: '' });
    }

    checkInput(e) {
        let errMessage;
        let value = this.state.value;
        if (value.length > 0) {
            this.props.handleSearch(value);
            value = '';
        } else {
            errMessage = "You must type an artist's name.";
        }
        this.setState({ value, errMessage });
    }

    render() {
        return (
            <div id='searchContainer'>
                <form >
                    <FormGroup
                        controlId="formBasicText"
                    >
                        <ControlLabel>Search for an Artist</ControlLabel>
                        <InputGroup>
                            <FormControl
                                className='searchBox'
                                type="text"
                                value={this.state.value}
                                placeholder="Start typing..."
                                onChange={this.handleChange}
                                autoFocus
                            />
                            <InputGroup.Button>
                                <Button bsClass="btn" type="button" className='searchBox invert-colors' onClick={()=>this.checkInput(this.state.value)}>Search</Button>
                            </InputGroup.Button>
                        </InputGroup>
                        <HelpBlock>{this.state.errMessage}</HelpBlock>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

export default Search;