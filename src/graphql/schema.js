import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';

import soap from 'soap';
import _ from 'lodash';
import urldecode from 'urldecode'

import settings from '../../settings';

const getCattleDetail = id =>
  soap.createClientAsync('http://yokto.net/wsdl.xml', { forceSoap12Headers: true }).then(client => {
    client.addHttpHeader('Authorization', settings.authorization);
    client.addSoapHeader({
      Action: 'http://www.admin.ch/xmlns/Services/evd/Livestock/AnimalTracing/1/AnimalTracingPortType/GetCattleDetail',
    }, '', 'wsa', 'http://www.w3.org/2005/08/addressing');
    client.addSoapHeader({
      To: 'https://ws-in.wbf.admin.ch/Livestock/AnimalTracing/1',
    }, '', 'wsa', 'http://www.w3.org/2005/08/addressing');

    return client.GetCattleDetailAsync({
      'ns:p_ManufacturerKey': '834dbf42-8c56-444e-a33d-5c0a09779454',
      'ns:p_LCID': '2055',
      'ns:p_WorkingFocus': {
        'ns:WorkingFocusItem': {
          'ns:WorkingFocusType': '0',
          'ns:TVDNumber': '0',
          'ns:MandateGiver': '3461314',
        },
      },
      'ns:p_EarTagNumber': urldecode(id),
    });
  }).then(result => {
    const cattleDetail = result.GetCattleDetailResult.CattleDetail;
    const BirthNotificationData = cattleDetail.BirthNotificationData;
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
    ]));
  });

const getCattleHistory = id =>
  soap.createClientAsync('http://yokto.net/wsdl.xml', { forceSoap12Headers: true }).then(client => {
    client.addHttpHeader('Authorization', settings.authorization);
    client.addSoapHeader({
      Action: 'http://www.admin.ch/xmlns/Services/evd/Livestock/AnimalTracing/1/AnimalTracingPortType/GetCattleHistory',
    }, '', 'wsa', 'http://www.w3.org/2005/08/addressing');
    client.addSoapHeader({
      To: 'https://ws-in.wbf.admin.ch/Livestock/AnimalTracing/1',
    }, '', 'wsa', 'http://www.w3.org/2005/08/addressing');

    return client.GetCattleHistoryAsync({
      'ns:p_ManufacturerKey': '834dbf42-8c56-444e-a33d-5c0a09779454',
      'ns:p_LCID': '2055',
      'ns:p_WorkingFocus': {
        'ns:WorkingFocusItem': {
          'ns:WorkingFocusType': '0',
          'ns:TVDNumber': '0',
          'ns:MandateGiver': '3461314',
        },
      },
      'ns:p_EarTagNumber': urldecode(id),
    });
  }).then(result =>
    result.GetCattleHistoryResult.CattleStays.CattleStayDataItem.map(stayItem => {
      return {
        StayLocation: _(stayItem.StayAddress).split(',').last().trim(),
        StayFamily: _.split(stayItem.StayAddress, ' ')[0],
      };
    }),
  );

const CattleStayType = new GraphQLObjectType({
  name: 'CattleStay',
  description: 'CattleStay',
  fields() {
    return {
      StayLocation: { type: GraphQLString },
      StayFamily: { type: GraphQLString },
    };
  },
});

const CattleType = new GraphQLObjectType({
  name: 'Cattle',
  description: 'Cattle',
  fields() {
    return {
      NameFather: { type: GraphQLString },
      NameMother: { type: GraphQLString },
      DeathDate: { type: GraphQLString },
      Gender: { type: GraphQLString },
      BirthDate: { type: GraphQLString },
      Race: { type: GraphQLString },
      Name: { type: GraphQLString },
      BirthWeight: { type: GraphQLString },
      History: {
        type: new GraphQLList(CattleStayType),
        resolve: cattle => getCattleHistory(cattle.EarTagNumber),
      },
    };
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    cattle: {
      type: CattleType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => getCattleDetail(args.id),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
