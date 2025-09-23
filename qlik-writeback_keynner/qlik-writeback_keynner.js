define([], function () {
  return {
    paint: function ($element) {
        $element.html(`
          <div style='padding:1em;font-family:sans-serif'>
            Extensión qlik-writeback_keynner funcionando ✅<br><br>
            <button id='writeback-btn' style='padding:0.5em 1em'>Proponer cambio</button>
            <div id='writeback-result' style='margin-top:1em;color:#00796b'></div>
          </div>
        `);

        document.getElementById('writeback-btn').onclick = function() {
          const resultDiv = document.getElementById('writeback-result');
          resultDiv.textContent = 'Enviando propuesta al backend...';

          fetch('https://backend-data-server.vercel.app/dashboard/change', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'prueba_key_123'
            },
            body: JSON.stringify({
              dashboardId: 1,
              newValue: 'Dato propuesto desde Qlik ' + new Date().toISOString()
            })
          })
          .then(response => response.json())
          .then(data => {
            resultDiv.textContent = 'Respuesta del backend: ' + JSON.stringify(data);
          })
          .catch(error => {
            resultDiv.textContent = 'Error al comunicar con el backend: ' + error;
          });
        };
    }
  };
});

/* define([], function () {
  return {
    paint: function ($element) {
        $element.html(`
          <div style='padding:1em;font-family:sans-serif'>
            Extensión qlik-writeback_keynner funcionando ✅<br><br>
            <button id='writeback-btn' style='padding:0.5em 1em'>Simular Writeback</button>
            <div id='writeback-result' style='margin-top:1em;color:#00796b'></div>
          </div>
        `);
        document.getElementById('writeback-btn').onclick = function() {
          const resultDiv = document.getElementById('writeback-result');
          resultDiv.textContent = 'Enviando datos al backend...';
          fetch('https://backend-data-server.vercel.app/api/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ejemplo: 'dato de prueba desde Qlik' })
          })
          .then(response => response.json())
          .then(data => {
            resultDiv.textContent = 'Respuesta del backend: ' + JSON.stringify(data);
          })
          .catch(error => {
            resultDiv.textContent = 'Error al comunicar con el backend: ' + error;
          });
        };
    }
  };
}); */
