function exportCSV(filename = 'clientes.csv') {
    console.log('clickou...')
    const table = $('#tableClientes').DataTable();
    const visibleColumns = table.columns(':visible')[0];

    const header = visibleColumns.map(index => table.column(index).header().innerText);
    const rows = table.rows({ search: 'applied' }).data().toArray();

    const csvRows = [];
    csvRows.push(header.join(';'));

    rows.forEach(row => {
        const csvRow = visibleColumns.map(index => {
        let cell = row[index];
        if (typeof cell === 'string') {
            cell = cell.replace(/\n/g, ' ').replace(/;/g, ',');
        }
        return '"' + cell + '"';
        });
        csvRows.push(csvRow.join(';'));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
