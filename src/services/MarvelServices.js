class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public';

  _apiKey = 'apikey=0dcb73f1a23227cfc75a2bd4c1816444';

  _baseOffset = '210';

  getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not featch ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResources(`${this._apiBase}/characters?limit=9&offset=${offset}&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResources(`${this._apiBase}/characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => ({
    id: char.id,
    name: char.name,
    description:
      char.description.length === 0
        ? 'There is no description about the character'
        : char.description.length > 200
        ? `${char.description.slice(0, 200)}...`
        : char.description,
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items,
  });
}

export default MarvelService;
