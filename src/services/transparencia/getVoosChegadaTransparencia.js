import { get } from 'axios';

/**
 * Lista todos os voos de chegadas não finalizados de um determinado aeroporto
 * @param {string} ican Codígo ICAN do Aeroporto
 */
export default async function getVoosChegadaTransparencia(ican) {
  return new Promise(async (resolve, reject) => {
    // URL da api transparencia da infraero
    const url = `https://transparencia.infraero.gov.br/voos.php?${ican}&tipoVoo=CHEGADAS&callback=infraero`;
    try {
      // Executa a requisição
      const { data } = await get(url);
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}
