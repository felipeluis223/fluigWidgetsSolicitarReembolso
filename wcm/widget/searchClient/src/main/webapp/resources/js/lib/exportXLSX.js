function exportXLSX() {
    const table = $('#tableClientes').DataTable();

    // Captura apenas colunas visíveis
    const visibleColumns = table.columns(':visible').indexes().toArray();

    // Cabeçalhos
    const headers = [];
    $('#tableClientes thead th').each(function (index) {
        if (visibleColumns.includes(index)) {
            headers.push($(this).text().trim());
        }
    });

    // Dados
    const data = [];
    table.rows({ search: 'applied' }).every(function () {
        const row = this.data();
        const rowData = [];

        visibleColumns.forEach(function (i) {
            const td = $('<div>').html(row[i]).text().trim(); // remove HTML
            rowData.push(td);
        });

        data.push(rowData);
    });

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");

    XLSX.writeFile(workbook, 'clientes.xlsx');
}
