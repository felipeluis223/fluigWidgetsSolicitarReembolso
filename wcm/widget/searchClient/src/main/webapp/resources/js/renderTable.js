function renderTable(data) {
    if (!data || data.length === 0) {
        $("#target").html("<p>Nenhum dado encontrado.</p>");
        return;
    }

    // Destroi DataTable se existir
    if ($.fn.DataTable.isDataTable('#tableClientes')) {
        $('#tableClientes').DataTable().clear().destroy();
    }

    // Pega as colunas selecionadas pelos toggles
    var selectedColumns = $(".toggle-column:checked").map(function () {
        return $(this).data("column");
    }).get();

    var keys = Object.keys(data[0]).filter(function (key) {
        return key !== "A1_FILIAL" && selectedColumns.includes(key);
    });

    if (keys.length === 0) {
        $("#target").html("<p>Nenhuma coluna selecionada.</p>");
        return;
    }

    // Criação da tabela HTML
    var table = '<table id="tableClientes" class="table table-sm table-striped table-bordered display nowrap" style="width:100%;">';
    table += '<thead><tr>';

    for (var i = 0; i < keys.length; i++) {
        var columnTitle = keys[i];
        if (keys[i] == "A1_COD") columnTitle = "Código";
        else if (keys[i] == "A1_NREDUZ") columnTitle = "Nome reduzido";
        else if (keys[i] == "A1_BAIRRO") columnTitle = "Bairro";
        else if (keys[i] == "A1_END") columnTitle = "Endereço";
        else if (keys[i] == "A1_EMAIL") columnTitle = "E-mail";
        else if (keys[i] == "A1_LOJA") columnTitle = "Loja";
        else if (keys[i] == "A1_NOME") columnTitle = "Nome";
        else if (keys[i] == "A1_CGC") columnTitle = "CNPJ/CPF";
        else if (keys[i] == "A1_INSCR") columnTitle = "Insc.Estadual";
        else if (keys[i] == "A1_MUN") columnTitle = "Município";

        table += `<th data-col="${i}" data-order="desc" style="padding:2px 4px; font-size: 9px; border:1px solid #ddd; word-wrap: break-word; white-space: normal;">${columnTitle}</th>`;
    }

    table += '</tr></thead><tbody>';

    for (var j = 0; j < data.length; j++) {
        table += '<tr>';
        for (var k = 0; k < keys.length; k++) {
            table += `<td style="padding:2px 4px; font-size: 9px; border:1px solid #ddd; word-wrap: break-word; white-space: normal;">${data[j][keys[k]] || ''}</td>`;
        }
        table += '</tr>';
    }

    table += '</tbody></table>';
    $("#target").html(table);

    // Inicializa DataTables
    $('#tableClientes').DataTable({
        pageLength: 10,
        lengthChange: false,
        ordering: false,
        info: true,
        paging: true,
        pagingType: "simple_numbers",
        language: {
            search: "<span class='fs-text-md'>Buscar:</span>",
            searchPlaceholder: "Digite para filtrar",
            info: "Página _PAGE_ de _PAGES_",
            paginate: {
                previous: "Anterior",
                next: "Próxima"
            },
            infoEmpty: "Sem registros",
            zeroRecords: "Nenhum registro encontrado"
        }
    });

    // Ordenação manual (opcional)
    $("#target th").on('click', function () {
        var tableEl = $(this).closest('table');
        var tbody = tableEl.find('tbody');
        var rows = tbody.find('tr').toArray();
        var colIndex = $(this).data('col');
        var order = $(this).data('order');

        order = (order === 'desc') ? 'asc' : 'desc';
        $(this).data('order', order);

        rows.sort(function (a, b) {
            var A = $(a).find('td').eq(colIndex).text().toUpperCase();
            var B = $(b).find('td').eq(colIndex).text().toUpperCase();

            var numA = parseFloat(A.replace(/[^0-9.\-]+/g, ""));
            var numB = parseFloat(B.replace(/[^0-9.\-]+/g, ""));

            if (!isNaN(numA) && !isNaN(numB)) {
                A = numA;
                B = numB;
            }

            if (A < B) return order === 'asc' ? -1 : 1;
            if (A > B) return order === 'asc' ? 1 : -1;
            return 0;
        });

        $.each(rows, function (index, row) {
            tbody.append(row);
        });
    });
}
