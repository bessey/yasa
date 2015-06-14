module.exports = function handleError(res, error) {
    return res.send(500, {error: error.message});
};
