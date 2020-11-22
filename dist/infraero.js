(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/regenerator'), require('@babel/runtime/helpers/asyncToGenerator'), require('axios')) :
  typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/regenerator', '@babel/runtime/helpers/asyncToGenerator', 'axios'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.cep = {}, global._regeneratorRuntime, global._asyncToGenerator, global.axios));
}(this, (function (exports, _regeneratorRuntime, _asyncToGenerator, axios) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
  var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);

  /**
   * Lista todos os voos de partidas não finalizados de um determinado aeroporto
   * @param {string} ican Codígo ICAN do Aeroporto
   */

  function getVoosPartidaTransparencia(ican) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(resolve, reject) {
        var url, _yield$get, data;

        return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // URL da api transparencia da infraero
                url = "https://transparencia.infraero.gov.br/voos.php?".concat(ican, "&tipoVoo=PARTIDAS&callback=infraero");
                _context.prev = 1;
                _context.next = 4;
                return axios.get(url);

              case 4:
                _yield$get = _context.sent;
                data = _yield$get.data;
                return _context.abrupt("return", resolve(data));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", reject(_context.t0));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  /**
   * Remove o callback do json e transforma em um objeto
   * @param {string} jsonp JsonP
   * @param {string} callback Callback utilizado pelo JsonP
   */
  function unWrapJsonP(jsonp) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'infraero';
    // Remove a função, e transforma em um objeto javascript
    return JSON.parse(jsonp.slice(callback.length + 1, jsonp.length - 1));
  }

  /**
   * Tranforma o objeto recebido pela api do transparencia
   * @param {string} origemVoo ICAN da origem ou destino do voo
   * @param {object} voosWrapped JsonP recebido pela api do transparencia
   */

  function getVoosUtil(origemDestinoVoo, voosWrapped) {
    return new Promise(function (resolve, reject) {
      // Transforma o JsonP em um Objeto javascript
      var voos = unWrapJsonP(voosWrapped); // Se tiver um processamento retorna ele

      if (typeof voos.processamento !== 'undefined') {
        var _voos$processamento = voos.processamento,
            codigo = _voos$processamento.codigo,
            resultado = _voos$processamento.resultado;
        return reject({
          codigo: codigo,
          resultado: resultado
        });
      } // Se tiver uma mensagem retorna ela


      if (typeof voos.errorMessage !== 'undefined') {
        var _codigo = voos.codigo,
            errorMessage = voos.errorMessage;
        return reject({
          codigo: _codigo,
          resultado: errorMessage
        });
      }

      var voo = voos.voos.voo; // Apenas retornando os dados com algumas alterações

      return resolve(voo.map(function (_ref) {
        var numero = _ref.numero,
            situacao = _ref.situacao,
            categoria = _ref.categoria,
            dataHoraPrevista = _ref.dataHoraPrevista,
            dataHoraEfetiva = _ref.dataHoraEfetiva,
            origem = _ref.origem,
            destino = _ref.destino,
            observacao = _ref.observacao;
        return {
          numero: numero,
          origem: origem === '-' ? origemDestinoVoo : origem,
          destino: destino === '-' ? origemDestinoVoo : destino,
          situacao: situacao,
          observacao: observacao,
          categoria: categoria,
          dataHoraPrevista: dataHoraPrevista,
          dataHoraEfetiva: dataHoraEfetiva
        };
      }));
    });
  }

  /**
   * Lista todos os voos de partidas não finalizados de um determinado aeroporto
   * @param {string} ican Codígo ICAN do Aeroporto
   */

  var getVoosPartida = function getVoosPartida(ican) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(resolve, reject) {
        return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof ican !== 'string')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", reject({
                  codigo: 'INFRAERO-PROMISE-0001',
                  resultado: 'Parâmetro "ican" deve ser uma string'
                }));

              case 2:
                _context.prev = 2;
                _context.t0 = resolve;
                _context.t1 = getVoosUtil;
                _context.t2 = ican;
                _context.next = 8;
                return getVoosPartidaTransparencia(ican);

              case 8:
                _context.t3 = _context.sent;
                _context.next = 11;
                return (0, _context.t1)(_context.t2, _context.t3);

              case 11:
                _context.t4 = _context.sent;
                return _context.abrupt("return", (0, _context.t0)(_context.t4));

              case 15:
                _context.prev = 15;
                _context.t5 = _context["catch"](2);
                return _context.abrupt("return", reject(_context.t5));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 15]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };

  /**
   * Lista todos os voos de chegadas não finalizados de um determinado aeroporto
   * @param {string} ican Codígo ICAN do Aeroporto
   */

  function getVoosChegadaTransparencia(_x) {
    return _getVoosChegadaTransparencia.apply(this, arguments);
  }

  function _getVoosChegadaTransparencia() {
    _getVoosChegadaTransparencia = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee2(ican) {
      return _regeneratorRuntime__default['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(resolve, reject) {
                  var url, _yield$get, data;

                  return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          // URL da api transparencia da infraero
                          url = "https://transparencia.infraero.gov.br/voos.php?".concat(ican, "&tipoVoo=CHEGADAS&callback=infraero");
                          _context.prev = 1;
                          _context.next = 4;
                          return axios.get(url);

                        case 4:
                          _yield$get = _context.sent;
                          data = _yield$get.data;
                          return _context.abrupt("return", resolve(data));

                        case 9:
                          _context.prev = 9;
                          _context.t0 = _context["catch"](1);
                          return _context.abrupt("return", reject(_context.t0));

                        case 12:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[1, 9]]);
                }));

                return function (_x2, _x3) {
                  return _ref.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _getVoosChegadaTransparencia.apply(this, arguments);
  }

  /**
   * Lista todos os voos de partidas não finalizados de um determinado aeroporto
   * @param {string} ican Codígo ICAN do Aeroporto
   */

  var getVoosChegada = function getVoosChegada(ican) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(resolve, reject) {
        return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof ican !== 'string')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", reject({
                  codigo: 'INFRAERO-PROMISE-0002',
                  resultado: 'Parâmetro "ican" deve ser uma string'
                }));

              case 2:
                _context.prev = 2;
                _context.t0 = resolve;
                _context.t1 = getVoosUtil;
                _context.t2 = ican;
                _context.next = 8;
                return getVoosChegadaTransparencia(ican);

              case 8:
                _context.t3 = _context.sent;
                _context.next = 11;
                return (0, _context.t1)(_context.t2, _context.t3);

              case 11:
                _context.t4 = _context.sent;
                return _context.abrupt("return", (0, _context.t0)(_context.t4));

              case 15:
                _context.prev = 15;
                _context.t5 = _context["catch"](2);
                return _context.abrupt("return", reject(_context.t5));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 15]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };

  exports.getVoosChegada = getVoosChegada;
  exports.getVoosPartida = getVoosPartida;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
