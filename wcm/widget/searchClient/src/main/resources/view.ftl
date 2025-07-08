<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

<!-- Cabeçalho Fluig com apenas o logo da empresa -->
<header id="printHeader" style="display:none; justify-content: flex-start; background-color: white; padding: 10px; border-bottom: 1px solid #ccc;">
    <img src="https://fluighlg.teakrc.com:7070/portal/api/servlet/image/01/custom/logo_image.png" alt="Logo da Empresa" height="50">
</header>


<div id="Search_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="Search.instance()">
    <section class="panel panel-default fs-display-flex fs-flex-direction-column fs-flex-wrap-wrap col-md-12">
        
        <div class="col-md-12 panel-heading">
            <h3 class="panel-title">Consulta de Clientes Cadastrados</h3>
        </div>

        <div class="panel-body col-md-12 fs-display-flex fs-flex-wrap-wrap fs-flex-direction-row fs-md-margin-vertical">
            <!-- 1° Linha -->
            <div class="col-md-2 fs-md-gap-vertical">
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

            <div class="col-md-2 ">
                <div class="form-group">
                    <label for="inscrInput">Inscrição Estadual:</label>
                    <input type="text" class="form-control" id="inscrInput" placeholder="Ex.: 1234567890">
                </div>
            </div>

            <div class="col-md-2 fs-md-gap fs-display-flex fs-align-items-center">
                <button type="button" class="btn btn-default">Limpar</button>
                <button type="button" class="btn btn-primary" name="btnPrint" id="btnPrint">Imprimir</button>
                <button type="button" id="btnBuscarDados" name="btnBuscarDados" class="btn btn-info" data-btnLoad>Filtrar</button>
            </div>
        </div>

        <section class="panel-body col-md-12 fs-display-flex fs-flex-wrap-wrap fs-flex-direction-column fs-md-margin-vertical">
            <div id="target"></div>
        </section>
       
    </section>
</div>
