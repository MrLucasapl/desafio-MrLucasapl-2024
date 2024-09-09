classDiagram
    class Zoológico {
        - recintos: List<Recinto>
        - animaisValidos: Dict<str, int>
        + adicionar_animal(especie: str, quantidade: int) -> List[str]
    }

    class Recinto {
        - numero: int
        - bioma: str
        - tamanhoTotal: int
        - espaçoOcupado: int
        - animais: List<Animal>
        + adicionar_animais(animais: List<Animal>)
        + is_compativel(animais: List<Animal>) -> bool
    }

    class Animal {
        - especie: str
        - tamanho: int
        - biomasAdequados: List[str]
    }

    Zoológico "1" -- "*" Recinto
    Recinto "1" -- "*" Animal