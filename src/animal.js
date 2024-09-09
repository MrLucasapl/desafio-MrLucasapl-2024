export class Animal {
  tabelaAnimal = [
    { especie: "LEAO", tipo: "CARNIVORO", tamanho: 3, bioma: "savana" },
    { especie: "LEOPARDO", tipo: "CARNIVORO", tamanho: 2, bioma: "savana" },
    { especie: "CROCODILO", tipo: "CARNIVORO", tamanho: 3, bioma: "rio" },
    { especie: "MACACO", tipo: "ONIVORO", tamanho: 1, bioma: ["savana", "floresta"] },
    { especie: "GAZELA", tipo: "HERBIVORO", tamanho: 2, bioma: "savana" },
    { especie: "HIPOPOTAMO", tipo: "HERBIVORO", tamanho: 4, bioma: ["savana", "rio"] },
  ];

  constructor(animal, quantidade) {    
    const findAnimal = this.tabelaAnimal.find((a) => a.especie === animal);

    if (!findAnimal) {
      throw new Error("Animal inválido");
    }

    if (quantidade <= 0) {
      throw new Error("Quantidade inválida");
    }

    return findAnimal;
  }
}
