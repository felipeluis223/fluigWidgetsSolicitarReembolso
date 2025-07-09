<!-- Plugins e estilos -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

<!-- Cabeçalho Fluig -->
<header id="printHeader" style="display:none; background-color: white; padding: 10px; border-bottom: 1px solid #ccc;">
  <div class="header-left">
    <img src="https://fluighlg.teakrc.com:7070/portal/api/servlet/image/01/custom/logo_image.png" alt="Logo da Empresa" height="50">
  </div>
  <div class="header-right">
    <h3>Consulta de Clientes</h3>
    <span>Dataset que reúne dados básicos e de contato dos clientes cadastrados, utilizado para consultas e processos de negócio que envolvem informações cadastrais.</span>
  </div>
</header>

<!-- Widget -->
<div id="Search_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="Search.instance()">
  <section class="panel panel-default col-md-12">

    <!-- Título -->
    <div class="col-md-12 panel-heading">
      <h3 class="panel-title">Consulta de Clientes Cadastrados</h3>
    </div>

    <!-- Filtros -->
    <div class="panel-body col-md-12 fs-display-flex fs-flex-wrap-wrap fs-flex-direction-row fs-md-margin-vertical">
      <!-- 1° Linha -->
      <div class="col-md-2">
        <div class="form-group">
          <label for="filialInput">Filial:</label>
          <input type="text" class="form-control" id="filialInput" placeholder="Ex.: 00000">
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group">
          <label for="codigoInput">Código:</label>
          <input type="text" class="form-control" id="codigoInput" placeholder="Ex.: 0000000">
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group">
          <label for="lojaInput">Loja:</label>
          <input type="text" class="form-control" id="lojaInput" placeholder="Ex.: 00">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label for="nomeInput">Nome:</label>
          <input type="text" class="form-control" id="nomeInput" placeholder="Ex.: João Silva">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label for="nreduzInput">Nome Reduzido:</label>
          <input type="text" class="form-control" id="nreduzInput" placeholder="Ex.: J. Silva">
        </div>
      </div>

      <!-- 2° Linha -->
      <div class="col-md-3">
        <div class="form-group">
          <label for="enderecoInput">Endereço:</label>
          <input type="text" class="form-control" id="enderecoInput" placeholder="Ex.: Rua Exemplo, 123">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label for="bairroInput">Bairro:</label>
          <input type="text" class="form-control" id="bairroInput" placeholder="Ex.: Centro">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label for="municipioInput">Município:</label>
          <input type="text" class="form-control" id="municipioInput" placeholder="Ex.: São Paulo">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label for="emailInput">E-mail:</label>
          <input type="email" class="form-control" id="emailInput" placeholder="Ex.: cliente@email.com">
        </div>
      </div>

      <!-- 3° Linha -->
      <div class="col-md-2">
        <div class="form-group">
          <label for="cnpjInput">CNPJ/CPF:</label>
          <input type="text" class="form-control" id="cnpjInput" placeholder="Ex.: 00.000.000/0000-00">
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group">
          <label for="inscrInput">Inscrição Estadual:</label>
          <input type="text" class="form-control" id="inscrInput" placeholder="Ex.: 1234567890">
        </div>
      </div>
      <div class="col-md-2 fs-display-flex fs-align-items-center">
        <button type="button" class="btn btn-default">Limpar</button>
        <button type="button" class="btn btn-primary" id="btnPrint">Imprimir</button>
        <button type="button" id="btnBuscarDados" class="btn btn-info">Filtrar</button>
      </div>
    </div>

    <!-- Accordion -->
    <div class="col-md-12 panel-group clean-collapse" id="accordion">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a class="collapse-icon" href="#collapseOneExemple">
              Collapsible Group Item 1
            </a>
          </h4>
          <p class="collapse-text">Clique para exibir detalhes adicionais.</p>
        </div>
        <div id="collapseOneExemple" class="collapse-content" style="display:none; padding: 10px; border-top: 1px solid #ccc;">
          <p>Este é o conteúdo do accordion. Pode conter tabelas, formulários, textos, etc.</p>
        </div>
      </div>
    </div>

    <!-- Área de resultado -->
    <section class="panel-body col-md-12 fs-display-flex fs-flex-direction-column">
      <div id="target"></div>
    </section>

  </section>
</div>

<!-- Script para accordion -->
<script>
  $(document).ready(function () {
    $(".collapse-icon").click(function (e) {
      e.preventDefault();
      var target = $(this).attr("href");

      // Fecha todos os outros
      $(".collapse-content").not(target).slideUp();

      // Alterna visibilidade do atual
      $(target).slideToggle();
    });
  });
</script>
