import getVoosChegadaTransparencia from '../services/transparencia/getVoosChegadaTransparencia';
import getVoosUtil from '../utils/transparencia/getVoosUtil';

/**
 * Lista todos os voos de partidas não finalizados de um determinado aeroporto
 * @param {string} ican Codígo ICAN do Aeroporto
 */
export const getVoosChegada = (ican) =>
  new Promise(async (resolve, reject) => {
    // Se não ican não for uma string retorna um erro
    if (typeof ican !== 'string') {
      return reject({
        codigo: 'INFRAERO-PROMISE-0002',
        resultado: 'Parâmetro "ican" deve ser uma string',
      });
    }

    try {
      // Busca pelas chegadas na api de transparencia e os tranforma
      return resolve(
        await getVoosUtil(ican, await getVoosChegadaTransparencia(ican)),
      );
    } catch (error) {
      return reject(error);
    }
  });
