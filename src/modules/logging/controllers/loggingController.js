const helpService = require('../services/helpService.js');
const { getContext } = require('../../../utils/controllerUtils.js');
const { getTransaction } = require('../../../services/connectionService.js');

exports.getHelp = async (req, res, next) => {
  const transaction = await getTransaction();
  try {
    const context = getContext(res);
    const response = await helpService.getHelp({
      id: req.params.id,
      query: req.query,
      ...context,
      connection: transaction,
    });
    await transaction.commit();
    return res.ok(response);
  } catch (e) {
    await transaction.rollback();
    return next(e);
  }
};
