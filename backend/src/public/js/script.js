//client table
$(document).ready(function () {
    $('#clientTable').DataTable({
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },

        "dom": 'frtip',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});

//stock table
$(document).ready(function () {
    $('#stockTable').DataTable({
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },

        "dom": 'frtip',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});

//rentTable prazo
$(document).ready(function () {
    $('#rentTable').DataTable({
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },

        "dom": 'frtip',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});

//rentTable em breve
$(document).ready(function () {
    $('#rentTableSoon').DataTable({
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },

        "dom": 'frtip',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});

//rentTable atraso
$(document).ready(function () {
    $('#rentTableLate').DataTable({
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },

        "dom": 'frtip',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});

//balanceTable
$(document).ready(function () {
    $('#balanceTable').DataTable({
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },

        "dom": 'rtip',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});