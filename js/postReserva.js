// Variáveis globais para elementos do DOM
const hoje = new Date().toISOString().split('T')[0];
const dataEntrada = $('input[name="dataEntrada"]');
const dataSaida = $('input[name="dataSaida"]');
const btnEnviar = $('#enviarForm');
const form = $('#reservaForm');


// Inicialização do script após o carregamento do DOM
$(document).ready(function () {
  // Define a data mínima para entrada como hoje
  dataEntrada.attr('min', hoje);

  // Atualiza a data mínima da saída quando a entrada mudar
  dataEntrada.on('change', function () {
    const dataEntradaVal = $(this).val();
    dataSaida.attr('min', dataEntradaVal);
    if (dataSaida.val() < dataEntradaVal) {
      dataSaida.val(dataEntradaVal);
    }
  });

  enviarFormulario(form);

  // Clique do botão apenas dispara o submit
  btnEnviar.click(function () {
    form.submit();
  });
});

/* Métodos */

// Validação das datas informadas pelo usuário
function validarDatas() {
  if (dataEntrada.val() < hoje) {
    alert('A data de entrada não pode ser anterior a hoje.');
    return false;
  }
  if (dataSaida.val() < dataEntrada.val()) {
    alert('A data de saída não pode ser anterior à data de entrada.');
    return false;
  }
  return true;
}

// Envio do formulário
function enviarFormulario(formulario) {
  // Remove handlers anteriores para evitar múltiplos envios
  formulario.off('submit').on('submit', function (event) {
    event.preventDefault();
    if (!validarDatas()) {
      return;
    }
    // Converte os dados do formulário em objeto JSON
    const formValues = $(this).serializeArray().reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
    // Desabilita o botão para evitar envios duplicados
    $('#enviarForm').prop('disabled', true);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/reservas',
      data: JSON.stringify(formValues),
      contentType: 'application/json'
    })
      .done(function () {
        alert('Reserva realizada com sucesso!');
        formulario[0].reset();
        window.open('./reservas.html', '_blank');
      })
      .fail(function () {
        alert('Erro ao realizar a reserva. Por favor, tente novamente.');
      })
      // Reabilita o botão após conclusão da requisição
      .always(function () {
        $('#enviarForm').prop('disabled', false);
      });
  });
}