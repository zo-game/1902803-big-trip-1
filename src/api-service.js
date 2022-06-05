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

    updatePoint = async (point) => {
      const response = await this.#load({
        url: `point/${point.id}`,
        method: Method.PUT,
        body: JSON.stringify(point),
        headers: new Headers({'ContentType': 'application/json'}),
      });

      const parseResponse = await ApiService.parseResponse(response);
      return parseResponse;
    }

    #load = async({
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
      }
      catch (err){
        ApiService.catchError(err);
      }
    }

    static parseResponse = (response) => response.json();

    static checkStatus = (response) => {
      if(!response.ok){
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    }

    static catchError = (err) => {
      throw err;
    }
}
