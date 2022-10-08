export default async function handler(req, res) {

  var requestOptions = {
    method: 'GET'
  };

  try {
    return fetch('https://statsapi.web.nhl.com/api/v1/teams', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (res.statusCode === 200) {
          res.status(200).json(result);
        }
      })
      // Catch any !200
      .catch(error => {
        console.error('Error', error);
        res.status(res.statusCode).json({error: error});
      }
      );
  } catch(error) {
    /*
      Fetch promises only reject with a TypeError when a network error occurs.
      Since 4xx and 5xx responses aren't network errors, there's nothing to catch
      here usually.
    */
    return res.status(res.satusCode).json({
      statusCode: res.statusCode,
      error: error.message
    });
  }
}
