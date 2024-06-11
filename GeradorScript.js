function generateTerm() {
    const name = $('#name').val();
    const email = $('#email').val();
    const equipment = $('#equipment').select2('data')[0]?.text;
    const patrimonyCheckbox = $('#patrimony-checkbox').is(':checked');
    const patrimony = $('#patrimony').val();
    const serialCheckbox = $('#serial-checkbox').is(':checked');
    const serial = $('#serial').val();
    const chipCheckbox = $('#chip-checkbox').is(':checked');
    const chip = $('#chip').val();
    const observacaoCheckbox = $('#observacao-checkbox').is(':checked');
    const observacao = $('#observacao').val();

    function showAlert(fieldName) {
        Swal.fire({
            icon: 'warning',
            title: 'Campo obrigatório',
            html: `Por favor, preencha o campo <strong>${fieldName}</strong> <span style="color: red">*</span>`,
        });
    }

    if (!name) {
        showAlert('Nome do colaborador');
        return;
    }

    if (!equipment) {
        showAlert('Equipamento');
        return;
    }

    $('#term-name').text(name);
    $('#term-email').text(email || 'Não informado');
    $('#term-equipment').text(equipment);
    $('#term-patrimony').text(patrimonyCheckbox && patrimony ? patrimony : 'Não informado');
    $('#term-serial').text(serialCheckbox && serial ? serial : 'Não informado');
    $('#term-chip').text(chipCheckbox && chip ? chip : 'Não informado');
    $('#term-observacao').text(observacao);

    // Ajusta a exibição dos detalhes conforme os checkboxes
    $('#term-patrimony').parent().toggle(patrimonyCheckbox);
    $('#term-serial').parent().toggle(serialCheckbox);
    $('#term-chip').parent().toggle(chipCheckbox);
    $('#term-observacao').parent().toggle(observacaoCheckbox);

    $('#term-form').hide();
    $('#term-display').show();
}

function editTerm() {
    document.getElementById('term-form').style.display = 'block';
    document.getElementById('term-display').style.display = 'none';
}

$(document).ready(function() {
    // Checkbox handlers
    $('#chip-checkbox').change(function() {
        $('#chip').prop('disabled', !this.checked).val('');
    });

    $('#patrimony-checkbox').change(function() {
        $('#patrimony').prop('disabled', !this.checked).val('');
    });

    $('#serial-checkbox').change(function() {
        $('#serial').prop('disabled', !this.checked).val('');
    });

    $('#observacao-checkbox').change(function() {
        $('#observacao').prop('disabled', !this.checked).val('');
    });

    $(document).ready(function(){
        $('#chip').mask('(99) 9 9999-9999');
    });

    // Equipment data
    const equipmentData = {
        celular: [
            "Caterpillar S42",
            "Caterpillar S62",
            "Xiaomi Mi 11", 
            "Xiaomi Mi 10", 
            "Xiaomi Redmi 12",
            "Xiaomi Redmi Note 10", 
            "Xiaomi Redmi Note 9",
            "Samsung Galaxy S21", 
            "Samsung Galaxy S20", 
            "Samsung Galaxy A01",
            "Samsung Galaxy A03",
            "Samsung Galaxy A12",
            "Samsung Galaxy A12S",
            "Samsung Galaxy A20",
            "Samsung Galaxy A20S",
            "Samsung Galaxy A21",
            "Samsung Galaxy A22",
            "Samsung Galaxy A32",
            "Samsung Galaxy A50",
            "Samsung Galaxy A51",
            "Samsung Galaxy A52",
            "Samsung Galaxy A71"
        ],
        notebook: [
            "Dell Latitude 3060",
            "Dell Latitude 3080",
            "Dell Latitude 3410", 
            "Dell Latitude 3420", 
            "Dell Latitude 3440",
            "Dell Latitude 3470",  
            "Dell Latitude 3488", 
            "Dell Latitude 3490",  
            "Dell Latitude 3540",
            "Dell Latitude 5400", 
            "Dell Latitude 5410",
            "Dell Latitude 5420", 
            "Dell Latitude 5430",
            "Dell Latitude 5440" 
        ],
        computador: [
            "Dell OptiPlex 3060",
            "Dell OptiPlex 3070",
            "Dell OptiPlex 3080", 
            "Dell OptiPlex 3090"
        ],
        coletor: [
            "Honeywell EDA 50",
            "Honeywell EDA 51",
            "Honeywell EDA 52",
            "Honeywell CT 50"
        ],
        fone: [
            "Logitech H390",
            "JBL Tune Flex",
            "JBL Wave Flex"
        ],
        mochila: [
            "Mochila Dell Pro 15,6"
        ],
        perifericos: [
            "Teclado e Mouse",
            "Pen-drive",
            "Mouse S/Fio",
            "Mouse C/Fio",
            "Mouse Ergonômico",
            "Teclado C/Fio",
            "Teclado S/Fio",
            "Carregador de Celular USB-C",
            "Carregador de Celular Micro-USB",
            "Carregador de Notebook",
            "HUB USB"
        ]
    };

    // Initialize Select2
    $('#equipment').select2({
        placeholder: "Selecione o equipamento",
        allowClear: true,
        disabled: true  // Desabilita o campo de seleção inicialmente
    }).next(".select2-container").find(".select2-selection--single").css("height", "calc(1.5em + .75rem + 2px)").find(".select2-selection__rendered").css("line-height", "36px");
    
    function populateEquipmentOptions(options) {
        const equipmentSelect = $('#equipment');
        equipmentSelect.empty();
        options.forEach(option => {
            equipmentSelect.append(new Option(option, option));
        });
        equipmentSelect.trigger('change');  // Trigger change to apply Select2
    }

    function handleIconClick(equipmentType) {
        const equipmentOptions = equipmentData[equipmentType];
        populateEquipmentOptions(equipmentOptions);

        $('.equipment-icon').removeClass('selected-icon');
        $('#' + 'icon-' + equipmentType).addClass('selected-icon');

        if (equipmentType === 'celular') { // Condicional para habilitar campos quando for celular
            $('#chip').parent().show();
        } else {
            $('#chip').parent().hide();
        }

        if (equipmentType === 'mochila') {
            $('#serial').parent().hide();
        } else {
            $('#serial').parent().show();
        }

        if (equipmentType === 'mochila' || equipmentType === 'fone') { // Condicional para habilitar campos quando for mochila e fone de ouvido
            $('#patrimony').parent().hide();
        } else {
            $('#patrimony').parent().show();
        }

        if (equipmentType === 'perifericos') {
            $('#patrimony').parent().hide();
            $('#serial').parent().hide();
        }
        
        // Habilita todos os campos quando um ícone de equipamento é clicado
        $('#name, #email, #equipment, #patrimony-checkbox, #serial-checkbox, #chip-checkbox, #observacao-checkbox').prop('disabled', false);
    }

    // Desabilita todos os campos quando a página é carregada
    $('#name, #email, #equipment, #patrimony-checkbox, #serial-checkbox, #chip-checkbox, #observacao-checkbox').prop('disabled', true);

    $('#icon-celular').click(function() {
        handleIconClick('celular');
    });

    $('#icon-notebook').click(function() {
        handleIconClick('notebook');
    });

    $('#icon-computador').click(function() {
        handleIconClick('computador');
    });

    $('#icon-coletor').click(function() {
        handleIconClick('coletor');
    });

    $('#icon-fone').click(function() {
        handleIconClick('fone');
    });

    $('#icon-mochila').click(function() {
        handleIconClick('mochila');
    });

    $('#icon-perifericos').click(function() {
        handleIconClick('perifericos');
    });
});
