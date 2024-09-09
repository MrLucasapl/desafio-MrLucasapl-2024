import { Animal } from "./animal.js";
import { Recinto } from "./recinto.js";

class RecintosZoo {
  constructor() {
    this.recintosZoo = [
      new Recinto(1, "savana", 10, [
        {
          especie: "MACACO",
          tipo: "ONIVORO",
          quantidade: 1,
          tamanho: 1,
          bioma: ["savana", "floresta"],
        },
        {
          especie: "MACACO",
          tipo: "ONIVORO",
          quantidade: 1,
          tamanho: 1,
          bioma: ["savana", "floresta"],
        },
        {
          especie: "MACACO",
          tipo: "ONIVORO",
          quantidade: 1,
          tamanho: 1,
          bioma: ["savana", "floresta"],
        },
      ]),
      new Recinto(2, "floresta", 5, []),
      new Recinto(3, "savana e rio", 7, [
        {
          especie: "GAZELA",
          tipo: "HERBIVORO",
          quantidade: 1,
          tamanho: 2,
          bioma: ["savana"],
        },
      ]),
      new Recinto(4, "rio", 8, []),
      new Recinto(5, "savana", 9, [
        {
          especie: "LEAO",
          tipo: "CARNIVORO",
          quantidade: 1,
          tamanho: 3,
          bioma: ["savana"],
        },
      ]),
    ];
  }

  analisaRecintos(animal, quantidade) {
    try {
      const novoAnimal = new Animal(animal, quantidade);
      const recintosViaveis = this.recintosZoo
        .filter((recinto) =>
          this.recintoEhViavel(recinto, novoAnimal, quantidade)
        )
        .map((recinto) =>
          this.formataResultado(recinto, novoAnimal, quantidade)
        );

      if (recintosViaveis.length > 0) {
        return { recintosViaveis: recintosViaveis.map((r) => r.message) };
      } else {
        throw new Error("Não há recinto viável");
      }
    } catch (error) {
      return { erro: error.message };
    }
  }

  recintoEhViavel(recinto, animal, quantidade) {
    const { bioma, animais_existentes } = recinto;
    const { bioma: biomasAnimal, especie, tipo } = animal;

    return (
      this.biomaCompativel(bioma, biomasAnimal) &&
      this.verificaRegrasTipo(animais_existentes, tipo) &&
      this.verificaRegrasEspeciais(
        especie,
        bioma,
        animais_existentes,
        quantidade
      ) &&
      this.verificaEspacoDisponivel(recinto, animal, quantidade)
    );
  }

  biomaCompativel(biomasRecinto, biomasAnimal) {
    const palavrasRecinto = biomasRecinto.split(" ");
    const palavrasAnimal = Array.isArray(biomasAnimal)
      ? biomasAnimal
      : biomasAnimal.split(" ");

    return palavrasAnimal.some((bioma) => palavrasRecinto.includes(bioma));
  }

  verificaRegrasTipo(animaisExistentes, tipo) {
    let existeCarnivoros = animaisExistentes.every(
      (animal) => animal.tipo === "CARNIVORO"
    );

    return (existeCarnivoros && tipo === "CARNIVORO") ||
      (!existeCarnivoros && tipo !== "CARNIVORO") ||
      animaisExistentes.length === 0
      ? true
      : false;
  }

  verificaRegrasEspeciais(especie, bioma, animaisExistentes, quantidade) {
    switch (especie) {
      case "HIPOPOTAMO":
        return bioma.includes("savana e rio");
      case "MACACO":
        return animaisExistentes.length > 0 || quantidade > 1;
      default:
        return true;
    }
  }

  verificaEspacoDisponivel(recinto, animal, quantidade) {
    const { tamanho_total, animais_existentes } = recinto;
    const { tamanho } = animal;

    const especiesDiferentes =
      new Set(animais_existentes.map((a) => a.especie)).size > 1;

    const espacoAdicional = especiesDiferentes ? 1 : 0;

    const espacoTotalOcupado = recinto.espacoOcupado + espacoAdicional;

    const espacoNecessario = tamanho * quantidade;
    return tamanho_total - espacoTotalOcupado >= espacoNecessario;
  }

  formataResultado(recinto, animal, quantidade) {
    const { numero, tamanho_total } = recinto;
    const { tamanho, especie } = animal;

    const especiesDiferentes = recinto.animais_existentes.some(
      (animal) => animal.especie !== especie
    );

    let espacoLivre =
      recinto.tamanho_total - recinto.espacoOcupado - tamanho * quantidade;

    if (especiesDiferentes) {
      espacoLivre = espacoLivre - 1;
    }

    return {
      espacoLivre,
      message: `Recinto ${numero} (espaço livre: ${espacoLivre} total: ${tamanho_total})`,
    };
  }
}

export { RecintosZoo as RecintosZoo };
