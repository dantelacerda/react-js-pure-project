export function CnpjMask(valorDoTextBox) {

    if (valorDoTextBox.length <= 14) {

        //Coloca ponto entre o segundo e o terceiro dígitos
        valorDoTextBox = valorDoTextBox.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")

     }
    return valorDoTextBox;
}