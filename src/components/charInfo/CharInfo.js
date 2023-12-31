import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types'
import './charInfo.scss';
import MarvelService from '../../services/MarvelServices';

import Skeleton from './../skeleton/Skeleton'
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharLoaded = (char) => {
    this.setState({char: char, loading: false})
  }

  onCharLoading = () => {
    this.setState({loading: true})
  }

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelService.getCharacter(charId).then(this.onCharLoaded).catch(this.onError);
  }

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
};

const View = ({char}) => {
  const { name, thumbnail, homepage, wiki, description, comics } = char;

  let imgStyle = {'objectFit' : 'cover'};
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
      imgStyle = {'objectFit' : 'contain'};
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
        <div className="char__descr">{description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
          {comics.length === 0 ? <li>This character has no comics</li> : null}
          {comics.slice(0,10).map(({name, resourceURI}, index) => {
            // if (index > 9) return;
            return (
              <li key={index} className='char__comics-item'>
                <a href={resourceURI} >
                  {name}
                </a>
              </li>
            )
          })}
        </ul>
    </>
  )
}


CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo;
