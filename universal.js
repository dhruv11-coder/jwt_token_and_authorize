const _response = {}

_response.sendSuccess = function(res, data, message){
	return res.status(200).json({
        success: true,
        message: message,
        data: data
    });
}

_response.sendCatchError = function(res, message){
	return res.status(403).json({
        success: false,
        message: message
    });
}

_response.sendError = function(res){
	return res.status(500).json({
        success: false,
        message: "Something went wrong !!",
    });
}

_response.sendSuccessLists = function(res, data, message){
    return res.status(200).json({
        success: true,
        message: message,
        totalCount: data.totalCount,
        data: data.data
    });
}

module.exports = _response