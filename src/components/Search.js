import React, { Component } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import SearchResults from './SearchResults';
import fetchHelper from '../utils/fetchHelper';

class Search extends Component {
    state = {
        organization: {},
        search_input: "",
        error: ""
    }

    fetchSearchResult = searchTerm => {
        const promise = fetchHelper(`https://api.github.com/orgs/${ searchTerm }`);
        promise
            .then(result => { this.setState({ organization: result }) })
            .catch(this.setState({ error: `No results found for '${ searchTerm }'` }))
    }

    render() {
        const { organization, search_input, error } = this.state

        const handleInputChange = event => {
            this.setState({ search_input: event.target.value })
        }

        const handleSearch = event => {
            event.preventDefault();
            this.fetchSearchResult(search_input);
            this.setState({ search_input: "" })
        }

        return (
            <div>
                <h3 className="list-label">Search for Organizations</h3>
                <Form
                    className="search-form"
                    onSubmit={ handleSearch }
                >
                    <Form.Group as={ Row }>
                        <Col sm="9" className="no-padding">
                            <Form.Control
                                type="text"
                                placeholder="Find an organization..."
                                onChange={ handleInputChange }
                                value={ search_input }
                                className="text-input"
                            />
                        </Col>
                        <Col sm="3" className="no-padding">
                            <Form.Control
                                type="submit"
                                value="Search"
                                className="button"
                            />
                        </Col>
                    </Form.Group>
                </Form>

                { organization.id ?
                    <SearchResults organization={ organization }/>
                     :
                    <div className="search-error">

                        { error !== "" &&
                        <div className="alert alert-secondary">
                            <h3 className="list-label">{ error }</h3>

                            <span>
                                GitHub API doesn't support partial search,
                                search term has to match the full name of an organization.
                                Example: "netflix", "github", "nasa"
                            </span>
                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Search;