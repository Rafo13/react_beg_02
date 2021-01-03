
function request(url, method = 'GET', body) {
   const config =  {
      method: method,
      headers: {
         "Content-Type": "application/json"
      },
   }

   if(body){
     config.body = JSON.stringify(body);
   }

   return fetch(url, config)
      .then((res) => {
         return res.json();
      })
      .then((response) => {
         if (response.error) {
            throw response.error;
         }
        return response;
      });
      //catch-y grecinq actions-i mej, vorpeszi ashxati
}

export default request