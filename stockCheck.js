const axios = require('axios')
const parseString = require('xml2js').parseString

const productCode = '40354278'
const storeNumber = '446'
let productDetails = {}

function getAvailability() {
  return axios.get(`http://www.ikea.com/au/en/iows/catalog/availability/${productCode}`)
    .then(response => {
      parseString(response.data, (err, result) => {
        productDetails = result['ir:ikea-rest'].availability[0].localStore.filter(store => store.$.buCode === storeNumber)[0].stock[0]
      })
    })
    .catch(err => console.log(err))
}

getAvailability()
  .then(() => {
    console.log(productDetails.forecasts[0].forcast)
  })