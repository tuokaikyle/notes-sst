import Links from './Routes'; // make sure the path is correct
import { AppContext, AppContextType } from './lib/contextLib';
import { useState } from 'react';

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <div style={{ padding: '0 24px' }}>
      <h1>Hello World</h1>
      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
      >
        <Links />
      </AppContext.Provider>
    </div>
  );
};

export default App;
