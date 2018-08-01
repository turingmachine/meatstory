const soap = require('soap')
const _ = require('lodash')
const { races } = require('./races')
const { settings } = require('./settings')

const tvdApi = (method, id) =>
  soap.createClientAsync('http://yokto.net/wsdlp.xml', { forceSoap12Headers: true }).then(client => {
    client.addHttpHeader('Authorization', `Basic ${settings.tvdAuth}`)
    client.addSoapHeader({
      Action: `http://www.admin.ch/xmlns/Services/evd/Livestock/AnimalTracing/1/AnimalTracingPortType/${method}`,
    }, '', 'wsa', 'http://www.w3.org/2005/08/addressing')
    client.addSoapHeader({
      To: 'https://ws.wbf.admin.ch/Livestock/AnimalTracing/1',
    }, '', 'wsa', 'http://www.w3.org/2005/08/addressing')

    return client[`${method}Async`]({
      'ns:p_ManufacturerKey': 'a9e3c966-e952-41a1-89f0-d5f32967c8a6',
      'ns:p_LCID': '2055',
      'ns:p_WorkingFocus': {
        'ns:WorkingFocusItem': {
          'ns:WorkingFocusType': '0',
          'ns:TVDNumber': '0',
          'ns:MandateGiver': '3201369',
        },
      },
      'ns:p_EarTagNumber': id,
    })
  })

const getCattleDetail = id =>
  tvdApi('GetCattleDetail', id).then(result => {
    const cattleDetail = result[0].GetCattleDetailResult.CattleDetail
    const BirthNotificationData = cattleDetail.BirthNotificationData
    BirthNotificationData['Race'] = races[BirthNotificationData['Race']]
    return _.assign({}, _.pick(cattleDetail, [
      'NameFather',
      'NameMother',
      'DeathDate',
    ]), _.pick(BirthNotificationData, [
      'Gender',
      'BirthDate',
      'Race',
      'Name',
      'BirthWeight',
      'EarTagNumber',
    ]))
  })

const getCattleHistory = id =>
  tvdApi('GetCattleHistory', id).then(result => {
    return result[0].GetCattleHistoryResult.CattleStays.CattleStayDataItem.map(stayItem => {
      return {
        StayLocation: _(stayItem.StayAddress).split(',').last().trim(),
        StayFamily: _.split(stayItem.StayAddress, ' ')[0],
      }
    })
  });

const fetchCattle = async (id) => {
  const [detail, history] = await Promise.all([
    getCattleDetail(id),
    getCattleHistory(id),
  ])
  return _.assign({}, detail, {
    CattleHistory: history,
  })
}

module.exports = {
  fetchCattle: fetchCattle,
}
