function exportPDF() {
    var table = $('#tableClientes').DataTable();

    // Força todas as colunas visíveis temporariamente para impressão
    table.columns().visible(true);

    // Pega dados das linhas visíveis após filtro (search: 'applied')
    var dataRows = table.rows({ search: 'applied' }).data();

    // Monta HTML das linhas manualmente
    var rowsHtml = '';
    dataRows.each(function(rowData) {
        rowsHtml += '<tr>';
        // Supondo que rowData seja um array (ou objeto, adapte conforme seu dataset)
        for (var i = 0; i < rowData.length; i++) {
            rowsHtml += '<td>' + rowData[i] + '</td>';
        }
        rowsHtml += '</tr>';
    });

    // Clona cabeçalho da tabela para impressão
    var headerHtml = $('#tableClientes thead').prop('outerHTML');

    // Monta tabela completa para impressão
    var tableHtml = '<table id="tableClientes" style="width:100%; border-collapse: collapse;" border="1">' +
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
                        margin: 20mm;
                    }
                    table {
                        font-size: 9px;
                        width: 100%;
                        border-collapse: collapse;
                        table-layout: fixed;
                        word-wrap: break-word;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 4px 6px;
                        white-space: normal;
                        vertical-align: top;
                        overflow-wrap: break-word;
                        word-break: break-word;
                    }
                    th {
                        background-color: #f4f4f4;
                        cursor: default;
                    }
                    tr {
                        page-break-inside: avoid;
                    }
                </style>
            </head>
            <body>
                <div style="display: flex; align-items: center; justify-content: flex-start; padding-bottom: 10px; border-bottom: 1px solid #ccc;">
                    <img src="https://fluighlg.teakrc.com:7070/portal/api/servlet/image/01/custom/logo_image.png" alt="Logo da Empresa" height="50">
                </div>
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
