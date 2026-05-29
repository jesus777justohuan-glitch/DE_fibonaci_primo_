
document.getElementById('btnVerificar').addEventListener('click', () => {
    const password = document.getElementById('passInput').value.trim();
    const num = parseInt(document.getElementById('tokenInput').value);

    const resultadoBox = document.getElementById('resultadoCrypto');
    const resultadoTexto = document.getElementById('resultadoTexto');
    const desgloseAlgoritmo = document.getElementById('desgloseAlgoritmo');
    const tablaDesglose = document.getElementById('tablaDesglose');
    const bloqueBinario = document.getElementById('bloqueBinario');
    const binaryOutput = document.getElementById('binaryOutput');

    // Limpiar estados
    tablaDesglose.innerHTML = '';
    bloqueBinario.style.display = 'none';
    desgloseAlgoritmo.style.display = 'none';
    binaryOutput.innerText = '';

    if (!password) {
        resultadoTexto.innerHTML = "⚠️ Por favor, escribe primero una contraseña para cifrar.";
        resultadoTexto.style.color = "#ff6b6b";
        resultadoBox.style.display = 'block';
        return;
    }

    if (isNaN(num) || num < 1) {
        resultadoTexto.innerHTML = "⚠️ Por favor, ingresa un número entero válido mayor a 0.";
        resultadoTexto.style.color = "#ff6b6b";
        resultadoBox.style.display = 'block';
        return;
    }

    if (num === 1) {
        resultadoTexto.innerHTML = "❌ <strong>Cifrado Rechazado:</strong> El número 1 no es primo. No genera seguridad matemática para ocultar los datos.";
        resultadoTexto.style.color = "#ced4da";
        resultadoBox.style.display = 'block';
        return;
    }

    // Validar Primalidad
    let esPrimo = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            esPrimo = false;
            break;
        }
    }

    if (!esPrimo) {
        resultadoTexto.innerHTML = `🔓 <strong>Llave Vulnerable:</strong> El número ${num} es <strong>COMPUESTO</strong>. El cifrado ha sido bloqueado por seguridad.`;
        resultadoTexto.style.color = "#9fa4b0";
        resultadoBox.style.display = 'block';
        return;
    }

    // Cifrado Exitoso
    resultadoTexto.innerHTML = `🔒 <strong>¡Contraseña Cifrada Exitosamente!</strong> Datos procesados de forma segura con tu llave primaria.`;
    resultadoTexto.style.color = "var(--color-text-info)";

    let resultadoBinarioFinal = [];
    const llaveBinaria = num.toString(2).padStart(8, '0');

    for (let i = 0; i < password.length; i++) {
        let letra = password.charAt(i);
        let codigoAscii = password.charCodeAt(i);

        let caracterCifrado = codigoAscii ^ num;

        let asciiBinario = codigoAscii.toString(2).padStart(8, '0');
        let cifradoBinario = caracterCifrado.toString(2).padStart(8, '0');

        resultadoBinarioFinal.push(cifradoBinario);

        // Nueva Tarjeta de Letra con la Operación Alineada al Centro
        const operacionCard = document.createElement('div');
        operacionCard.style.background = 'var(--color-surface)';
        operacionCard.style.border = '1px solid var(--color-border)';
        operacionCard.style.borderRadius = 'var(--border-radius-md)';
        operacionCard.style.padding = '1.2rem';
        operacionCard.style.display = 'flex';
        operacionCard.style.flexDirection = 'column';
        operacionCard.style.alignItems = 'center'; // Centra todo el contenido internamente

        operacionCard.innerHTML = `
          <div style="font-size: 13px; color: var(--color-text-primary); border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 6px; margin-bottom: 8px; width: 100%; text-align: center;">
            Letra: <span style="color: var(--color-text-info); font-family: var(--font-mono); font-weight: bold;">"${letra}"</span> &rarr; ASCII: <strong>${codigoAscii}</strong>
          </div>
          
          <div style="font-family: var(--font-mono); font-size: 14px; letter-spacing: 2px; width: 220px; display: flex; flex-direction: column;">
            
            <div style="color: var(--color-text-secondary); display: flex; justify-content: space-between;">
              <span>Letra:</span>
              <span>${asciiBinario}</span>
            </div>
            
            <div style="color: var(--color-text-info); display: flex; justify-content: space-between; margin-top: 2px;">
              <span>XOR (${num}):</span>
              <span>${llaveBinaria}</span>
            </div>
            
            <div style="width: 100%; height: 1px; background: var(--color-text-info); margin: 6px 0; opacity: 0.5;"></div>
            
            <div style="color: #ffffff; font-weight: bold; display: flex; justify-content: space-between;">
              <span>Result:</span>
              <span>${cifradoBinario}</span>
            </div>
            
          </div>
        `;

        tablaDesglose.appendChild(operacionCard);
    }

    binaryOutput.innerText = resultadoBinarioFinal.join(' ');

    desgloseAlgoritmo.style.display = 'block';
    bloqueBinario.style.display = 'block';
    resultadoBox.style.display = 'block';
});
