export function NumeroSolicitacaoMask(valorDoTextBox) {

    valorDoTextBox = valorDoTextBox.replace("/","");

    if(valorDoTextBox.length > 4) {
        valorDoTextBox = valorDoTextBox.substr(0, 4)+"/"+valorDoTextBox.substr(4, 6);
    }

    return valorDoTextBox;
}