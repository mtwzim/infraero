import getVoosPartidaTransparencia from '../services/transparencia/getVoosPartidaTransparencia';
import getVoosUtil from '../utils/transparencia/getVoosUtil';

/**
 * Lista todos os voos de partidas não finalizados de um determinado aeroporto
 * @param {string} ican Codígo ICAN do Aeroporto
 */
export const getVoosPartida = (ican) =>
  new Promise(async (resolve, reject) => {
    // Se não ican não for uma string retorna um erro
    if (typeof ican !== 'string') {
      return reject({
        codigo: 'INFRAERO-PROMISE-0001',
        resultado: 'Parâmetro "ican" deve ser uma string',
      });
    }

    try {
      // Busca pelas partida na api de transparencia e os tranforma
      return resolve(
        await getVoosUtil(ican, await getVoosPartidaTransparencia(ican)),
      );
    } catch (error) {
      return reject(error);
    }
  });
