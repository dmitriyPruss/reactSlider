import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Slides from './components/Slides';
import Settings from './components/Settings';
import HomePage from './pages/HomePage';
import NotFound from './components/NotFound';
import { ThemeContext } from './contexts';
import styles from './App.module.scss';


class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      theme: "forest", 
      rangeValue: 5,
    };

    this.paths = {
      pets: {
        path: '/pets.json',
        header: 'PETS',
      },
      trees: {
        path: '/trees.json',
        header: 'TREES',
      },
    };
  }

  /**
   * 
   * @param {number} value
   */
  changeRange = ( { target: { value } } ) => {
    this.setState( { rangeValue: value } );
  }
  
  /**
   * 
   * @param {number} value
   */
  changeTheme = ( { target: { value } } ) => {
    this.setState( { theme: value } );
  }

  /**
   * 
   * @param {object} prevState 
   */
  componentDidUpdate(prevState) {
    if (this.state.theme !== prevState.theme) {
      this.render();
    }
  }

  /**
   * 
   * @returns JSX.Element
   */
  render() {

    const { rangeValue, theme } = this.state;
    
    const navClass = theme === "forest" ? styles.selectMenuForest : styles.selectMenuSky;
    const linkClass = theme === "forest" ? styles.linkForest : styles.linkSky;
    
    return (
      <nav className={navClass}>
        <Router>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link className={linkClass} to={'/'}>Home</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={linkClass} to={'/pets'}>Pets</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={linkClass} to={'/trees'}>Trees</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={linkClass} to={'/settings'}>Settings</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path={'/'}>
              <HomePage />
            </Route>
            <Route path={'/pets'}>
              <ThemeContext.Provider value={theme}>
                <Slides rangeValue={rangeValue} info={this.paths.pets} />
              </ThemeContext.Provider>
            </Route>
            <Route path={'/trees'}>
              <ThemeContext.Provider value={theme}>
                <Slides rangeValue={rangeValue} info={this.paths.trees} />
              </ThemeContext.Provider>
            </Route>
            <Route path={'/settings'}>
              <Settings settings={this.state} changeTheme={this.changeTheme} changeRange={this.changeRange} />
            </Route>
            <Route path={`*`} component={NotFound} />
          </Switch>
        </Router>
      </nav>
    )
  }
}

export default App;

