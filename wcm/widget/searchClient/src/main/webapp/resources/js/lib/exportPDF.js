function exportPDF() {
    console.log('Clickou no PDF')
    var table = $('#tableClientes').DataTable();

    // Força todas as colunas visíveis temporariamente para impressão
    table.columns().visible(true);

    // Pega dados das linhas visíveis após filtro (search: 'applied')
    var dataRows = table.rows({ search: 'applied' }).data();

    // Monta HTML das linhas manualmente
    var rowsHtml = '';
    dataRows.each(function(rowData) {
        rowsHtml += '<tr>';
        for (var i = 0; i < rowData.length; i++) {
            rowsHtml += '<td>' + rowData[i] + '</td>';
        }
        rowsHtml += '</tr>';
    });

    // Clona cabeçalho da tabela para impressão
    var headerHtml = $('#tableClientes thead').prop('outerHTML');

    // Monta tabela completa para impressão
    var tableHtml = '<table id="tableClientes" style="width:100%; border-collapse: collapse; table-layout: fixed;" border="1">' +
        headerHtml +
        '<tbody>' + rowsHtml + '</tbody>' +
        '</table>';

    var printWindow = window.open('', '', 'height=700,width=900');

    printWindow.document.write(`
        <html>
            <head>
                <title>Imprimir</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 10px;
                        margin: 0; /* margem topo-direita-baixo-esquerda */
                        padding: 0;
                    }
                    table {
                        font-size: 9px;
                        width: 100%;
                        border-collapse: collapse;
                        table-layout: fixed; /* importante para largura fixa */
                        word-wrap: break-word;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 4px 6px;
                        white-space: normal;
                        vertical-align: top;
                        overflow-wrap: break-word;
                        word-break: break-word;
                        max-width: 100px;       /* largura máxima */
                        min-width: 50px;       /* largura mínima */
                        width: 50px;           /* largura fixa */
                    }
                    th {
                        background-color: #f4f4f4;
                        cursor: default;
                    }
                    tr {
                        page-break-inside: avoid;
                    }
                    header {
                        background-color: white;
                        padding: 10px;
                        border-bottom: 1px solid #ccc;
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        margin-bottom: 15px;
                    }
                    header .header-right h3 {
                        margin: 0;
                    }
                    header .header-right span {
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <header>
                    <div class="header-left">
                        <img src="https://fluighlg.teakrc.com:7070/portal/api/servlet/image/01/custom/logo_image.png" alt="Logo da Empresa" height="50">
                    </div>
                    <div class="header-right">
                        <h3>Consulta de Clientes</h3>
                        <span>Dataset que reúne dados básicos e de contato dos clientes cadastrados, utilizado para consultas e processos de negócio que envolvem informações cadastrais.</span>
                    </div>
                </header>
                ${tableHtml}
            </body>
        </html>
    `);

    printWindow.document.close();

    printWindow.onload = function () {
        printWindow.focus();
        printWindow.print();
        printWindow.close();

        // Restaura visibilidade original das colunas
        table.columns().visible(true);
    };
}
