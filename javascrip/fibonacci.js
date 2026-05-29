
function fib(n) {
    let a = 1, b = 2, seq = [1, 1, 2];
    if (n === 1) return [1];
    if (n === 2) return [1, 1];
    if (n === 3) return [1, 1, 2];

    for (let i = 3; i < n; i++) {
        let c = a + b;
        seq.push(c);
        a = b;
        b = c;
    }
    return seq.slice(0, n);
}

function fmt(n, base) {
    return 'Bs. ' + Math.round(n * base).toLocaleString('es-BO');
}

function recalcular() {
    const dias = parseInt(document.getElementById('dias').value);
    const base = parseInt(document.getElementById('monto').value);
    document.getElementById('dias-val').textContent = dias;
    document.getElementById('monto-val').textContent = base;

    const seq = fib(dias);
    const totales = [];
    let acc = 0;
    seq.forEach(v => { acc += v * base; totales.push(acc); });

    const total = totales[totales.length - 1];
    const ultimo = seq[seq.length - 1] * base;
    const promedio = Math.round(total / dias);

    // Render de los círculos fijos superiores superiores de Fibonacci
    const baseChips = [1, 1, 2, 3, 5, 8, 13, 21];
    document.getElementById('chips').innerHTML = baseChips.map((v, i) =>
        `<span class="chip ${i < 3 ? 'active' : ''}">${v}</span>`
    ).join('');

    // Actualización de Tarjetas de Estado
    document.getElementById('stats').innerHTML = `
    <div class="stat-card accent">
      <div class="stat-label">Total al final del mes</div>
      <div class="stat-val">${fmt(1, total)}</div>
      <div class="stat-sub">en ${dias} días</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Ahorro del último día</div>
      <div class="stat-val">${fmt(1, ultimo)}</div>
      <div class="stat-sub">día ${dias}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Promedio diario</div>
      <div class="stat-val">${fmt(1, promedio)}</div>
      <div class="stat-sub">media del período</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Ahorro del día 1</div>
      <div class="stat-val">${fmt(base, 1)}</div>
      <div class="stat-sub">punto de partida</div>
    </div>
  `;

    // Renderizado Dinámico de la Tabla
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    seq.forEach((v, i) => {
        const ahorro = v * base;
        const acum = totales[i];
        const pct = Math.round((acum / total) * 100);
        const isLast = i === seq.length - 1;

        const formula = i === 0 ? '—' : i === 1 ? '—' : `${seq[i - 2] * base} + ${seq[i - 1] * base}`;

        const tr = document.createElement('tr');
        if (isLast) tr.classList.add('hl');
        tr.innerHTML = `
      <td>${i + 1}</td>
      <td style="font-family:var(--font-mono);color:var(--color-text-secondary);">${formula}</td>
      <td>Bs. ${ahorro.toLocaleString('es-BO')}</td>
      <td>
        <div class="bar-wrap">
          <div class="bar-bg"><div class="bar-fill" style="width:${pct}%"></div></div>
          <span style="font-size:12px;color:var(--color-text-secondary);min-width:32px;text-align:right;">${pct}%</span>
        </div>
      </td>
      <td>Bs. ${acum.toLocaleString('es-BO')}</td>
    `;
        tbody.appendChild(tr);
    });

    document.getElementById('insight').innerHTML = `
    <strong>¿Por qué funciona?</strong> El ahorro crece de forma exponencial pero gradual — empiezas con solo <strong>Bs. ${base}</strong> el día 1, y para el día ${dias} ya estás ahorrando <strong>Bs. ${ultimo.toLocaleString('es-BO')}</strong> en un solo día. El monto del último día es 500× mayor al inicial. Al final del mes habrás acumulado <strong>Bs. ${total.toLocaleString('es-BO')}</strong> sin sentir el golpe de un ahorro fijo alto desde el inicio.
  `;
}

// Inicializar la primera carga
recalcular();




function calcularViabilidad() {
  const maxPermitido = parseFloat(document.getElementById('max-diario-input').value);
  const resultadoDiv = document.getElementById('resultado-viabilidad');
  
  if (isNaN(maxPermitido) || maxPermitido <= 0) {
    resultadoDiv.innerHTML = `<span style="color: #ff6b6b;">Por favor, introduce un número válido mayor a 0.</span>`;
    return;
  }

  // Simulamos Fibonacci partiendo de una base estándar adaptada (Día 1: 10bs, Día 2: 10bs, etc.)
  let a = 10; // Día 1
  let b = 10; // Día 2
  let dia = 2;
  let historial = [10, 10];

  while (b <= maxPermitido && dia < 30) {
    let sig = a + b;
    a = b;
    b = sig;
    dia++;
    historial.push(b);
  }

  if (maxPermitido < 10) {
    resultadoDiv.innerHTML = `⚠️ Con un tope de <strong>Bs. ${maxPermitido}</strong> no podrías completar ni el <strong>Día 1</strong> (Base: 10 Bs).`;
  } else {
    resultadoDiv.innerHTML = `🚨 El sistema colapsa en el <strong>Día ${dia}</strong>. Tu tope es de Bs. ${maxPermitido}, pero ese día la secuencia te exige ahorrar <strong>Bs. ${b}</strong>. ¡Ciclar antes de este día es la clave!`;
  }
}