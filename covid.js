exports.handler = async (event) => {
    const HOSPITAL_SCORE = 50; // puntuación a partir de la cual, le mandamos al médico
    const CHECK_SCORE = 25; // puntuación que indica que debe vigilarse
    const data = event.Details.ContactData.Attributes; // donde está la info del usuario
    const result = { continue: 1, text: '' }; // default
    const answer = (data.answer === '*') ? false : parseInt(data.answer || 0); // si introduce * quiere salir
    if (answer !== false) {
        const step = parseInt(data.step || 0); // paso actual
        const oldScore = parseInt(data.score || 0); // puntuación
        const answerScore = parseInt(data.answerScore || 0); // valor de la respuesta
        const textEnd = `. De lo contrario, pulse 0 o espere.
        Pulse asterisco para salir del diagnóstico.`;
        result.score = (answer === 1) ? (oldScore + answerScore) : oldScore;
        if (result.score < HOSPITAL_SCORE) {
            switch (step) {
                case 0:
                    result.answerScore = 15;
                    result.text = 'Pulse 1 si has tenido contacto con algún caso confirmado';
                    break;
                case 1:
                    result.answerScore = 25;
                    result.text = 'Pulse 1 si tiene dificultades o molestias al respirar';
                    break;
                case 2:
                    result.answerScore = 15;
                    result.text = 'Pulse 1 si ha perdido el sentido del gusto o del olfato';
                    break;
                case 3:
                    result.answerScore = 10;
                    result.text = 'Pulse 1 si tiene más de 38 grados de fiebre';
                    break;
                case 4:
                    result.answerScore = 10;
                    result.text = 'Pulse 1 si tiene molestias musculares o cansancio';
                    break;
                case 5:
                    result.answerScore = 10;
                    result.text = 'Pulse 1 si tiene tos seca';
                    break;
                case 6:
                    result.answerScore = 10;
                    result.text = 'Pulse 1 si tiene dolor de cabeza';
                    break;
                default:
                    result.continue = 0; // salimos, último paso
                    if (result.score < CHECK_SCORE) {
                        result.text = `Su diagnóstico no indica que esté infectado
                        por el COVID 19. Si alguno de sus síntomas empeora, vuelva
                        a realizar este diagnóstico`;
                    } else {
                        result.text = `Tiene síntomas que hacen pensar que puede 
                        estar infectado por COVID 19.
                        Haga este diagnóstico si alguno de sus síntomas empeora y
                        extreme las medidas de aislamiento e higiene para evitar
                        contagiar a otras personas`;
                    }
                    return result;

            }
            result.step = step + 1;
            result.text += textEnd;
        } else { // caso confirmado,
            result.text = `Sus síntomas requieren de revisión médica. 
            Acuda lo antes posible a un centro hospitalario siguiendo todas 
            las medidas de precaución.`;
            result.continue = 0;
        }
    } else { // quiere salir
        result.continue = 0;
        result.text = 'Muchas gracias por utilizar nuestro servicio';
    }
    // result.continue, result.text, result.score, result.answerScore, step
    return result;
};
