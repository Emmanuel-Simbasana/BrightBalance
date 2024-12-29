import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home'; // New Home component
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App container">
                    <Switch>
                        <Route path="/" exact component={Home} /> {/* Home route */}
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <Route path="/signin" component={SignIn} />
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;