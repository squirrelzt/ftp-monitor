import axios from 'axios';

module.exports = {
    axiosRequest(url, method, params, callback) {
        let api = this.getPath() + url;
        axios({
            url: api,
            method: method,
            params: params,
          })
          .then(function (response) {
            switch (response.status) {
                case 200: {
                    callback(response.data);
                    break;
                }
                default: {
                    console.log('status=' + response.status);
                    console.log('statusText=' + response.statusText);
                    callback(response);
                    break;
                }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    getPath(){
        // return '';
          return 'http://localhost:8080'
      }
}