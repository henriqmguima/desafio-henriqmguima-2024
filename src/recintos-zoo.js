class RecintosZoo {

    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'macaco', quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'gazela', quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'leão', quantidade: 1, tamanho: 3 }] },
        ];

        this.animaisValidos = {
            leao: { tamanho: 3, biomas: ['savana'] },
            leopardo: { tamanho: 2, biomas: ['savana'] },
            crocodilo: { tamanho: 3, biomas: ['rio'] },
            macaco: { tamanho: 1, biomas: ['savana', 'floresta'] },
            gazela: { tamanho: 2, biomas: ['savana'] },
            hipopotamo: { tamanho: 4, biomas: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        const especie = this.animaisValidos[animal.toLowerCase()];
        if (!especie) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const recintosViaveis = this.recintos.filter(recinto => {
            if (!especie.biomas.includes(recinto.bioma)) return false;

            const espacoNecessario = especie.tamanho * quantidade;

            let espacoOcupado = recinto.animais.reduce((total, a) => total + (a.tamanho * a.quantidade), 0);

            if (recinto.animais.length > 0) {
                const especieExistente = recinto.animais[0].especie;
                const isCarnivoro = ['leao', 'leopardo', 'crocodilo'].includes(animal.toLowerCase());
                const isCarnivoroExistente = ['leao', 'leopardo', 'crocodilo'].includes(especieExistente);

                if (isCarnivoro || isCarnivoroExistente) {
                    if (animal.toLowerCase() !== especieExistente) {
                        return false;
                    }
                }

                if (recinto.animais.length > 1 || (recinto.animais.length === 1 && animal.toLowerCase() !== especieExistente)) {
                    espacoOcupado += 1;
                }

                // Hipopótamos só convivem com outras espécies em "savana e rio"
                if (animal.toLowerCase() === 'hipopotamo' && recinto.bioma !== 'savana e rio') {
                    return false;
                }
            }

            const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
            return espacoDisponivel >= espacoNecessario;
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return {
            recintosViaveis: recintosViaveis.map(recinto => {
                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.tamanho * a.quantidade), 0);
                const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado - especie.tamanho * quantidade;
                return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel}, total: ${recinto.tamanhoTotal})`;
            })
        };
    }
}

export { RecintosZoo as RecintosZoo };
const zoo = new RecintosZoo();

