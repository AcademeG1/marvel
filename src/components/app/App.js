import { Component } from 'react/cjs/react.production.min';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

// const Message = ({counter}) => { render-пропсы
//   return <p>This counter item {counter}</p>
// }

// class Counter extends Component {
//   state = {
//     count: 0
//   }

//   counterInc = () => {
//     this.setState({count: this.state.count + 1})
//   }

//   render() {
//     return (
//       <>
//         <button onClick={this.counterInc}></button>
//         {this.props.render(this.state.count)}
//         {this.props.some(this.state.count)}
//       </>
//     )
//   }
// }

class App extends Component {

  state = {
    selectedChar: null,
  }

  onCharSelected = (id) => {
    this.setState({selectedChar: id});
  }

  render() {
    return (
      <div className="app">
        {/* <Counter render={counter => (
          <Message counter={counter} />
        )} some={counter => (
          <Message counter={counter} />
        )}/> */}
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
};

export default App;
