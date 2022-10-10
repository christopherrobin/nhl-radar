export default async function handler(req, res) {
  // Get query params from request, if any
  const { query } = req;

  try {
    return fetch(`https://statsapi.web.nhl.com/api/v1/people/${query.playerId}`, { method: 'GET' })
      .then(response => response.json())
      .then(result => {
        // Sometimes the NHL returns 304 Not Modified, so we need to check for that too
        if (res.statusCode === 200 || res.statusCode === 304) {
          res.status(200).json(result);
        }
      })
      // Catch any !200 or !304 responses
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
