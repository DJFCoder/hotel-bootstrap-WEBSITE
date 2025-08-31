const url = 'http://localhost:3000/reservas';
const tbody = $('#reservas-tbody');

$(document).ready(function () {
  // Buscar as reservas quando a página estiver pronta
  $.get(url, function (data) {
    data.forEach(function (item) {
      tbody.append(`
        <tr>
          <td>${item.nome}</td>
          <td>${item.email}</td>
          <td>${item.dataEntrada}</td>
          <td>${item.dataSaida}</td>
          <td>${item.adultos}</td>
          <td>${item.criancas}</td>
          <td>${item.observacoes}</td>
        </tr>
      `);
    });
  });
});