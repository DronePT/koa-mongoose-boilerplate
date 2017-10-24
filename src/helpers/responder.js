class Responder {
  data (data) {
    this._status = 'ok'
    this._data = data
    return this
  }

  error (data, code = null) {
    this._status = 'error'
    this._error = data
    if (code) this._errorCode = code

    return this
  }

  metadata (data) {
    this._metadata = data
    return this
  }

  json () {
    const {
      _status: status,
      _data: data,
      _error: error,
      _metadata: metadata,
      _errorCode: errorCode
    } = this

    return { status, data, errorCode, error, metadata }
  }
}

module.exports = Responder
