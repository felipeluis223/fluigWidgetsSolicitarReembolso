function printTable() {
    var table = $('#tableClientes').DataTable();

    // Torna todas as colunas visíveis temporariamente para impressão
    table.columns().visible(true);

    // Pega todas as linhas visíveis após filtro, independente da paginação
    var allRows = table.rows({ search: 'applied' }).nodes().to$();

    // Clona a tabela atual (com todas as colunas agora visíveis)
    var tableClone = $('#tableClientes').clone();

    // Limpa o corpo da tabela clonada
    tableClone.find('tbody').empty();

    // Insere todas as linhas na tabela clonada
    tableClone.find('tbody').append(allRows);

    var headerHtml = `
        <div style="display: flex; align-items: center; justify-content: flex-start; padding-bottom: 10px; border-bottom: 1px solid #ccc;">
            <img src="https://fluighlg.teakrc.com:7070/portal/api/servlet/image/01/custom/logo_image.png" alt="Logo da Empresa" height="50">
        </div>
    `;

    var printWindow = window.open('', '', 'height=700,width=900');

    printWindow.document.write(`
        <html>
            <head>
                <title>Imprimir</title>
                <style>
                    @page {
                        margin: 20mm;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 10px;
                        margin: 0;
                        padding: 0;
                        counter-reset: page;
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
                    /* Limitar largura da coluna Nome (4ª coluna) e Endereço (5ª coluna) */
                    #tableClientes th:nth-child(4),
                    #tableClientes td:nth-child(4),
                    #tableClientes th:nth-child(5),
                    #tableClientes td:nth-child(5),
                    #tableClientes th:nth-child(7),
                    #tableClientes th:nth-child(7) {
                        max-width: 100px;
                        width: 100px;
                    }
                    /* Limitar largura da coluna E-mail (8ª coluna) */
                    #tableClientes th:nth-child(8),
                    #tableClientes td:nth-child(8) {
                        max-width: 150px;
                        width: 150px;
                    }
                    #pageFooter {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        text-align: center;
                        font-size: 10px;
                        color: #555;
                        border-top: 1px solid #ccc;
                        padding: 6px 0;
                        background: white;
                    }
                    #pageFooter::after {
                        content: "Página " counter(page);
                    }
                </style>
            </head>
            <body>
                ${headerHtml}
                ${tableClone.prop('outerHTML')}
                <div id="pageFooter"></div>
            </body>
        </html>
    `);

    printWindow.document.close();

    printWindow.onload = function () {
        printWindow.focus();
        printWindow.print();
        printWindow.close();

        // Depois da impressão, restaura a visibilidade original das colunas
        table.columns().visible(true);
    };
}
