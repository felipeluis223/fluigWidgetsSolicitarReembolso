<div id="PainelDatatable_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="PainelDatatable.instance()">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Painel de Controle</h3>
        </div>
        <div class="panel-body">
            <section class="col-md-12 fs-display-flex fs-direction-column fs-flex-wrap-wrap fs-md-gap-vertical">     
                <!-- 1Âº Linha -->
                <div class="col-md-2">
                    <label for="idSolicitante">ID do solicitante:</label>
                    <input class="form-control" type="text" id="idSolicitante" name="idSolicitante">
                </div>
                <div class="col-md-3">
                    <label for="nomeSolicitante">Nome completo do solicitante:</label>
                    <input class="form-control" type="text" id="nomeSolicitante" name="nomeSolicitante" placeholder="Ex.: JoÃ£o Silva Santos">
                </div>
                <div class="col-md-3">
                    <label for="valor">Valor R$:</label>
                    <input class="form-control" type="text" id="valor" name="valor" placeholder="Ex.: 1.000,00" mask="#00.000.000.000.000,00">
                </div>
                <div class="col-md-2">
                    <label for="centroCusto">Centro de custo:</label>
                    <select class="form-control" id="centroCusto" name="centroCusto" dataset="dsCentroCusto" datasetKey="Id" datasetValue="Descricao"></select>
                </div>

                <div class="col-md-2">
                    <label for="dataDespesa">Data da solicitação:</label>
                    <input class="form-control" type="date" id="dataDespesa" name="dataDespesa">
                </div>
                
                <!-- 2Âº Linha -->
                <div class="col-md-12">
                    <label for="justificativa">Observação ou justificativa:</label>
                    <textarea class="form-control" id="justificativa" name="justificativa" rows="2"></textarea>				
                </div>
                <!-- 3Âº Linha -->
                <div class="col-md-5">
                    <label for="anexarComprovante">Lembre-se de anexar as notas:</label>
                    <div class="custom-checkbox custom-checkbox-success">
                        <input type="checkbox" name="anexoDespesas" id="anexoDespesas">
                        <label for="anexoDespesas">Anexado</label>
                    </div>		
                </div>	
           </section>
           <section class="fs-display-flex col-md-12 fs-justify-content-space-between">
                <button type="button" class="btn btn-primary">Imprimir</button>
                <button type="button" class="btn btn-primary">Enviar</button>
           </section>
        </div>
    </div>
</div>

