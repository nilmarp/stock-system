//client table
$(document).ready(function () {
    $('#clientTable').DataTable({
        "lengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },

        
        // "paging": false,
        "scrollCollapse": true,
        "scrollY": '50vh',

        "dom": '<"left"l><"right"fr>t<"bottom"ip>',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});

//stock table
$(document).ready(function () {
    $('#stockTable').DataTable({
        "lengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },

        
        // "paging": false,
        "scrollCollapse": true,
        "scrollY": '50vh',

        "dom": '<"left"l><"right"fr>t<"bottom"ip>',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});

//rentTable prazo
$(document).ready(function () {
    $('#rentTable').DataTable({
        "lengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },

        
        // "paging": false,
        "scrollCollapse": true,
        "scrollY": '50vh',

        "dom": '<"left"l><"right"fr>t<"bottom"ip>',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});

//rentTable em breve
$(document).ready(function () {
    $('#rentTableSoon').DataTable({
        "lengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },

        
        // "paging": false,
        "scrollCollapse": true,
        "scrollY": '50vh',

        "dom": '<"left"l><"right"fr>t<"bottom"ip>',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});

//rentTable atraso
$(document).ready(function () {
    $('#rentTableLate').DataTable({
        "lengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo",
            },
        },
        
        // "paging": false,
        "scrollCollapse": true,
        "scrollY": '50vh',

        "dom": '<"left"l><"right"fr>t<"bottom"ip>',

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

        
        // "paging": false,
        "scrollCollapse": true,
        "scrollY": '50vh',

        "dom": 'rtip',

        "oLanguage": {
            "sSearch": "Buscar:"
        }

    });
});

$(document).ready(function() {
    $('#withdrawOnTime').DataTable({
        ajax: {
            url: '/withdrawn/ontime',
            dataSrc: 'rentals'
        },
        columns: [
            {'data': 'client?.name'}
        ]
        
    })
})

// if(window.location.href )

const openLinkTab = (source) => {
    window.location.href = source.getAttribute("href");
}

const changeActiveTab = (param) => {

    let current = 0

    const tabs = [
        {
            inside: '',
            outside: ''
        }
    ]

    if(param != '' && typeof(param) == 'number'){
        
        $(tabs[param].inside).addClass(tabs[param].inside)
        $(tabs[param].outside).addClass(tabs[param].outside)
        $(tabs[current].inside).removeClass(tabs[current].inside)
        $(tabs[current].outside).removeClass(tabs[current].outside)

        
        current = param
    }



}