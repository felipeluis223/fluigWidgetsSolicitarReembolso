<!-- Plugins e estilos -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

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
  <section class="panel panel-default">

    <!-- Título -->
    <div class="panel-heading" style="background-color: #35825e; color: #ffffff;">
      <h3 class="panel-title">Consulta de Clientes Cadastrados</h3>
    </div>

    <!-- Filtros -->
    <div class="panel-body fs-display-flex fs-flex-wrap-wrap fs-flex-direction-row fs-md-margin-vertical">
      <div class="row">
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
        <div class="col-md-8 fs-display-flex fs-md-gap fs-lg-margin-top">
          <button type="button" class="btn btn-default" id="btnLimpar">Limpar</button>
          <div class="btn-group">
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Exportar <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="#" id="btnExportPDF">Exportar PDF</a></li>
              <li><a href="#" id="btnExportCSV">Exportar CSV</a></li>
              <li><a href="#" id="btnExportXLSX">Exportar XLSX</a></li>
            </ul>
          </div>
          <button type="button" id="btnBuscarDados" class="btn btn-info">Filtrar</button>
        </div>
      </div>
    </div>

    <!-- Accordion -->
    <div class="panel-group clean-collapse" id="accordion">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a class="collapse-icon" href="#collapseOneExemple">
              <strong>Configurações Avançadas</strong>
            </a>
          </h4>
        </div>
        <div id="collapseOneExemple" class="collapse-content fs-lg-margin-left" style="padding: 10px; border-top: 1px solid #ffffff; display: none;">
          <span>Personalizar colunas exibidas na tabela</span>
          <div class="row fs-md-margin-vertical fs-md-gap">
            <!-- 1º Coluna de Toggles -->
            <div class="col-md-2">
              <ul class="list-group">
                <li class="list-group-item col-md-12 fs-xs-padding">
                  <div class="col-md-9" style="font-size: 12px;">Código</div>
                  <div class="col-md-3">
                    <div class="switch switch-success switch-sm">
                      <input class="switch-input toggle-column" type="checkbox" id="switch-1" data-column="A1_COD" checked />
                      <label class="switch-button" for="switch-1">Toggle</label>
                    </div>
                  </div>
                </li>
              </ul>
              
              <ul class="list-group">
                <li class="list-group-item col-md-12 fs-xs-padding">
                  <div class="col-md-9" style="font-size: 12px;">Nome reduzido</div>
                  <div class="col-md-3">
                    <div class="switch switch-success switch-sm">
                      <input class="switch-input toggle-column" type="checkbox" id="switch-2" data-column="A1_NREDUZ" checked />
                      <label class="switch-button" for="switch-2">Toggle</label>
                    </div>
                  </div>
                </li>
              </ul>

              <ul class="list-group">
                <li class="list-group-item col-md-12 fs-xs-padding">
                  <div class="col-md-9" style="font-size: 12px;">Bairro</div>
                  <div class="col-md-3">
                    <div class="switch switch-success switch-sm">
                      <input class="switch-input toggle-column" type="checkbox" id="switch-3" data-column="A1_BAIRRO" checked />
                      <label class="switch-button" for="switch-3">Toggle</label>
                    </div>
                  </div>
                </li>
              </ul>

              <ul class="list-group">
                <li class="list-group-item col-md-12 fs-xs-padding">
                  <div class="col-md-9" style="font-size: 12px;">Endereço</div>
                  <div class="col-md-3">
                    <div class="switch switch-success switch-sm">
                      <input class="switch-input toggle-column" type="checkbox" id="switch-4" data-column="A1_END" checked />
                      <label class="switch-button" for="switch-4">Toggle</label>
                    </div>
                  </div>
                </li>
              </ul>

              <ul class="list-group">
                <li class="list-group-item col-md-12 fs-xs-padding">
                  <div class="col-md-9" style="font-size: 12px;">E-mail</div>
                  <div class="col-md-3">
                    <div class="switch switch-success switch-sm">
                      <input class="switch-input toggle-column" type="checkbox" id="switch-5" data-column="A1_EMAIL" checked />
                      <label class="switch-button" for="switch-5">Toggle</label>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- 2º Coluna de Toggles -->
            <div class="col-md-2">
              <ul class="list-group">
                <li class="list-group-item col-md-12 fs-xs-padding">
                  <div class="col-md-9" style="font-size: 12px;">Loja</div>
                  <div class="col-md-3">
                    <div class="switch switch-success switch-sm">
                      <input class="switch-input toggle-column" type="checkbox" id="switch-6" data-column="A1_LOJA" checked />
                      <label class="switch-button" for="switch-6">Toggle</label>
                    </div>
                  </div>
                </li>
              </ul>

              <ul class="list-group">
                <li class="list-group-item col-md-12 fs-xs-padding">
                  <div class="col-md-9" style="font-size: 12px;">Nome</div>
                  <div class="col-md-3">
                    <div class="switch switch-success switch-sm">
                      <input class="switch-input toggle-column" type="checkbox" id="switch-7" data-column="A1_NOME" checked />
                      <label class="switch-button" for="switch-7">Toggle</label>
                    </div>
                  </div>
                </li>
              </ul>

              <ul class="list-group">
                <li class="list-group-item col-md-12 fs-xs-padding">
                  <div class="col-md-9" style="font-size: 12px;">CNPJ/CPF</div>
                  <div class="col-md-3">
                    <div class="switch switch-success switch-sm">
                      <input class="switch-input toggle-column" type="checkbox" id="switch-8" data-column="A1_CGC" checked />
                      <label class="switch-button" for="switch-8">Toggle</label>
                    </div>
                  </div>
                </li>
              </ul>

              <ul class="list-group">
                <li class="list-group-item col-md-12 fs-xs-padding">
                  <div class="col-md-9" style="font-size: 12px;">Insc.Estadual</div>
                  <div class="col-md-3">
                    <div class="switch switch-success switch-sm">
                      <input class="switch-input toggle-column" type="checkbox" id="switch-9" data-column="A1_INSCR" checked />
                      <label class="switch-button" for="switch-9">Toggle</label>
                    </div>
                  </div>
                </li>
              </ul>

              <ul class="list-group">
                <li class="list-group-item col-md-12 fs-xs-padding">
                  <div class="col-md-9" style="font-size: 12px;">Município</div>
                  <div class="col-md-3">
                    <div class="switch switch-success switch-sm">
                      <input class="switch-input toggle-column" type="checkbox" id="switch-10" data-column="A1_MUN" checked />
                      <label class="switch-button" for="switch-10">Toggle</label>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Área de resultado -->
    <section class="panel-body fs-display-flex fs-flex-direction-column">
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

    // Botão limpar (limpa filtros e tabela)
    $("#btnLimpar").click(function () {
      $("input[type=text], input[type=email]").val("");
      $(".toggle-column").prop("checked", true);
      $("#target").html("");
    });
  });
</script>
