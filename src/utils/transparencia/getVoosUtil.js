import unWrapJsonP from '../unWrapJsonP';

/**
 * Tranforma o objeto recebido pela api do transparencia
 * @param {string} origemVoo ICAN da origem ou destino do voo
 * @param {object} voosWrapped JsonP recebido pela api do transparencia
 */
export default function getVoosUtil(origemDestinoVoo, voosWrapped) {
  return new Promise((resolve, reject) => {
    // Transforma o JsonP em um Objeto javascript
    const voos = unWrapJsonP(voosWrapped);

    // Se tiver um processamento retorna ele
    if (typeof voos.processamento !== 'undefined') {
      const {
        processamento: { codigo, resultado },
      } = voos;
      return reject({ codigo, resultado });
    }

    // Se tiver uma mensagem retorna ela
    if (typeof voos.errorMessage !== 'undefined') {
      const { codigo, errorMessage } = voos;
      return reject({ codigo, resultado: errorMessage });
    }

    const {
      voos: { voo },
    } = voos;

    // Apenas retornando os dados com algumas alterações
    return resolve(
      voo.map(
        ({
          numero,
          situacao,
          categoria,
          dataHoraPrevista,
          dataHoraEfetiva,
          origem,
          destino,
          observacao,
        }) => ({
          numero,
          origem: origem === '-' ? origemDestinoVoo : origem,
          destino: destino === '-' ? origemDestinoVoo : destino,
          situacao,
          observacao,
          categoria,
          dataHoraPrevista,
          dataHoraEfetiva,
        }),
      ),
    );
  });
}
