import React  from 'react';
import { ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchResults = props => {
    const organization = props.organization;

    return (
        <div className="search-result">
            <h3 className="list-label">Search Result</h3>
            <ListGroup className="organization-list">
                <Link
                    className="list-group-item"
                    key={ organization.id }
                    to={`/${ organization.login }`}
                >
                    <Image rounded src={ organization.avatar_url }/>
                    <span>{ organization.login }</span>
                </Link>
            </ListGroup>
        </div>
    )
}

export default SearchResults;