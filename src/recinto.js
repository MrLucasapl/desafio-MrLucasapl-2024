export class Recinto {
  constructor(numero, bioma, tamanho_total, animais_existentes = []) {
    this.numero = numero;
    this.bioma = bioma;
    this.tamanho_total = tamanho_total;
    this.animais_existentes = animais_existentes;
    this.espacoOcupado = animais_existentes.reduce((total, animal) => total + animal.tamanho, 0);
  }
}
