function post(url, object, successCallBack, errorCallback) {
    $.ajax({
        url: url,
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(object),
        success: (data, status) => {
            return successCallBack(data, status)
        },
        error: (data, status) => {
            return errorCallback(data, status)
        }
    });
}

function put(url, object, successCallBack, errorCallback) {
    $.ajax({
        url: url,
        method: "PUT",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(object),
        success: (data, status) => {
            return successCallBack(data, status)
        },
        error: (data, status) => {
            return errorCallback(data, status)
        }
    });
}

function get(url, successCallBack, errorCallback) {
    $.ajax({
        url: url,
        method: "GET",
        success: (data, status) => {
            return successCallBack(data, status)
        },
        error: (data, status) => {
            return errorCallback(data, status)
        }
    });
}

function deleteP(url, successCallBack, errorCallback) {
    $.ajax({
        url: url,
        method: "DELETE",
        success: (data, status) => {
            return successCallBack(data, status)
        },
        error: (data, status) => {
            return errorCallback(data, status)
        }
    });
}
