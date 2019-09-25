import { receiveData } from '../store/actions';

/**
 * This middleware serves two purposes (and could perhaps be broken into two pieces).
 * 1. To set up API requests with all the appropriate settings
 * 2. To handle the attendant responses and failures. Successful requests will need to be cached and then
 * sent to the store. Failures will need to be taken round back and shot.
 * @param {Object} services
 */
const createCTSMiddleware = services => ({
  dispatch,
  getState,
}) => next => async action => {
  console.log('action: ', action);
  next(action);
  console.log('services: ', services);

  if (action.type !== '@@api/CTS') {
    return;
  }

  const { service: serviceName, queries, params, options, fetchHandlers, resultName } = action.payload;
  console.log('OPTIONS: ', options);
  const service = services[serviceName]();
  if (service !== null) {
    try {
      const response = await service(queries, params, options);
      const body = response.terms;
      console.log('body: ', body);
      const { formatResponse } = fetchHandlers;
      const formattedBody = formatResponse ? formatResponse(body) : body;
      dispatch(receiveData(resultName, formattedBody));
    } catch (err) {
      console.log(err);
    }
  }
};

export default createCTSMiddleware;