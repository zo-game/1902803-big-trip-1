const Method = {
  PUT : 'PUT',
  GET : 'GET'
};

export default class ApiService {
    #endPoint = null;
    #authorization = null;

    constructor(endPoint, authorization){
      this.#authorization = authorization;
      this.#endPoint = endPoint;
    }

    get points(){
      return this.#load({url: 'points'})
        .then(ApiService.parseResponse);
    }

    updateTask = async (point) => {
      const response = await this.#load({
        url: `points/${point.id}`,
        method: Method.PUT,
        body: JSON.stringify(this.#adaptToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'}),
      });

      const parsedResponse = await ApiService.parseResponse(response);

      return parsedResponse;
    }

    #load = async ({
      url,
      method = Method.GET,
      body = null,
      headers = new Headers(),
    }) => {
      headers.append('Authorization', this.#authorization);

      const response = await fetch(
        `${this.#endPoint}/${url}`,
        {method, body, headers},
      );

      try {
        ApiService.checkStatus(response);
        return response;
      } catch (err) {
        ApiService.catchError(err);
      }
    }

    static parseResponse = (response) => response.json();

    static checkStatus = (response) => {
      if(!response.ok){
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    }

    #adaptToServer = (point) => {
      const adaptedPoint = {
        ...point,
        date_from: new Date(point['dateStartEvent']).toISOString(),
        date_to: new Date(point['dateEndEvent']).toISOString(),
        // date_from: point['dateStartEvent'].format().toISOString(),
        // date_to: point['dateEndEvent'].format(),
        type: point['pointType'],
        base_price: Number(point['price']),
        is_favorite: point['isFavorite'],
        offers: point['offer'].offers,
        destination: {
          name: point['destination'],
          description: point['destinationInfo'].description,
          pictures: point['destinationInfo'].pictures,
        }
      };

      delete adaptedPoint['dateStartEvent'];
      delete adaptedPoint['destinationInfo'];
      delete adaptedPoint['dateEndEvent'];
      delete adaptedPoint['pointType'];
      delete adaptedPoint['price'];
      delete adaptedPoint['isFavorite'];
      delete adaptedPoint['formatDate'];
      delete adaptedPoint['offer'];
      delete adaptedPoint['period'];
      delete adaptedPoint['waitingTime'];
      return adaptedPoint;
    }

    static catchError = (err) => {
      throw err;
    }
}
