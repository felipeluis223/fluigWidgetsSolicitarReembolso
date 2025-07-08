function printTable() {
    var tableHtml = document.getElementById('target').innerHTML;

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
                    }
                    th {
                        background-color: #f4f4f4;
                        cursor: default;
                    }
                    tr {
                        page-break-inside: avoid;
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
                </style>
            </head>
            <body>
                ${headerHtml}
                ${tableHtml}
            </body>
        </html>
    `);

    printWindow.document.close();

    printWindow.onload = function () {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };
}
