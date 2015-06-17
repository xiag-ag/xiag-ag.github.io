$('select[name="C"]').selectize({
    plugins: {
        caret_button: {},
        quick_list: {
            pinnedOptions: [
                'Switzerland',
                'Norfolk Island',
                'Russian Federation',
                'Madagascar'
            ]
        }
    },
    valueField: 'id',
    labelField: 'title',
    searchField: 'title',
    maxItems: 1,
    openOnFocus: false,
    createOnBlur: true,
    selectOnTab: true,
    placeholder: '- select -'
});
$('select[name="D"]').selectize({
    plugins: {
        caret_button: {},
        quick_list: {
            pinnedOptions: [
                'Switzerland',
                'Norfolk Island',
                'Russian Federation',
                'Madagascar'
            ]
        }
    },
    valueField: 'id',
    labelField: 'title',
    searchField: 'title',
    maxItems: 3,
    openOnFocus: false,
    createOnBlur: true,
    selectOnTab: true,
    placeholder: '- select -'
});