import React  from 'react';
import { Route, Switch } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import Organizations from './Organizations';
import OrganizationSingle from './OrganizationSingle';
import OrganizationCommits from './OrganizationCommits';

const App = () => {
  return (
      <div>
        <Header />

          <Switch>
              <Route exact path="/" component={ Organizations } />
              <Route exact path="/:orgUser" render={({ match }) => (
                  <OrganizationSingle org_login={ match.params.orgUser } />
              )} />
              <Route exact path="/:orgUser/repository/:orgRep" render={({ match }) => (
                  <OrganizationCommits org_login={ match.params.orgUser } org_repo={ match.params.orgRep } />
              )} />
          </Switch>

        <Footer />
      </div>
  )
}

export default App;