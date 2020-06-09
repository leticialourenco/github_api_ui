import React  from 'react';
import { Route, Switch } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import Organizations from './Organizations';

const App = () => {
  return (
      <div>
        <Header />

          <Switch>
              <Route exact path="/" component={ Organizations } />
          </Switch>
        <Footer />
      </div>
  )
}

export default App;