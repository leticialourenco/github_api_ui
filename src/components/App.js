import React  from 'react';
import { Route, Switch } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import Organizations from './Organizations';
import OrganizationSingle from './OrganizationSingle';

const App = () => {
  return (
      <div>
        <Header />

          <Switch>
              <Route exact path="/" component={ Organizations } />
              <Route exact path="/:orgUser" render={({ match }) => (
                  <OrganizationSingle org_login={ match.params.orgUser } />
              )} />
          </Switch>
        <Footer />
      </div>
  )
}

export default App;