import React, { Component } from 'react';
import PropsTypes, { number } from 'prop-types'
import MarvelService from '../../services/MarvelServices';
import './charList.scss';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../Spinner/Spinner';

class CharList extends Component {
  itemRefs = [];
  state = {
    charList: [],
    loading: true,
    error: false,
    newCharLoading: false,
    offset: 210,
    charEnded: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharNewLoading();
    this.marvelService.getAllCharacters(offset).then(res => this.onCharListLoaded(res));
  }

  onCharNewLoading = () => {
    this.setState({newCharLoading: true})
  }

  setRef = (ref) => {
    this.itemRefs.push(ref);
  }

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({charList, offset}) => ({charList: [...charList, ...newCharList], loading: false, newCharLoading: false, offset: offset + 9, charEnded: ended}));
  }

  onError = () => {
    this.setState({loading: false, error: true})
  }

  focusOnItem = (id) => {
    this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
    this.itemRefs[id].classList.add('char__item_selected');
    this.itemRefs[id].focus();
  }

  renderItem = (arr) => {
    const charatres = arr.map(({name, thumbnail, id}, index) => {
      let imgStyle = {'objectFit' : 'cover'};
      if (thumbnail.includes('image_not_available')) {
        imgStyle = {'objectFit' : 'fill'};
      }
      return (
      <li key={id} 
        tabIndex={0} 
        ref={this.setRef} 
        className="char__item" 
        onClick={() => {
          this.props.onCharSelected(id); 
          this.focusOnItem(index) 
        }} 
        onKeyDown={(event) => {
          if (event.key === ' ' || event.key === 'Enter') {
            this.props.onCharSelected(id);
            this.focusOnItem(index);
          }
        }}
      >
        <img src={thumbnail} alt="abyss" style={imgStyle} />
        <div className="char__name">{name}</div>
      </li>)}
    )
    return (
      <ul className="char__grid">
          {charatres}
      </ul>
    )
  }

  render () {
    const {charList, loading, error, newCharLoading, offset, charEnded} = this.state;
    const load = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? this.renderItem(charList) : null;
    return (
      <div className="char__list">
        {load}
        {errorMessage}
        {content}
        <button 
          className="button button__main button__long"
          style={{'display': charEnded ? 'none' : 'block'}}
          disabled={newCharLoading}
          onClick={() => this.onRequest(offset)}>
            <div className="inner">load more</div>
        </button>
      </div>
    );
  }
};

CharList.propTypes = {
  onCharSelected: PropsTypes.func.isRequired
}

export default CharList;
