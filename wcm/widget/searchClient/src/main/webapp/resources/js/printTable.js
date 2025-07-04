function printTable() {
    var tableHtml = document.getElementById('target').innerHTML;
    var printWindow = window.open('', '', 'height=700,width=900');

    printWindow.document.write(`
        <html>
            <head>
                <title>Imprimir</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 10px;
                        margin: 20px;
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
                </style>
            </head>
            <body>
                ${tableHtml}
            </body>
        </html>
    `);

    printWindow.document.close();

    printWindow.onload = function() {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };
}
