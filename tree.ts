interface ITreeKind {
    kind: string
    tipoFolha: string
    tipoTronco: string
    numeroMedioGalhos: number
    corPredominanteFolhas: string
    regiaoTipicaOcorrencia: string
}

interface ITree {
    kind: ITreeKind
    posicao: { x: number, y: number }
    id: string
    alturaAproximada: number
    idadeEstimada: number
}

class Tree implements ITree {
    constructor(
        public kind: ITreeKind,
        public posicao: { x: number, y: number },
        public id: string,
        public alturaAproximada: number,
        public idadeEstimada: number
    ) {}
}

class TreeFactory {
    private static kinds: Map<string, ITreeKind> = new Map()

    static registerKind(data: ITreeKind): ITreeKind {
        if (!this.kinds.has(data.kind)) {
            this.kinds.set(data.kind, data)
        }
        return this.kinds.get(data.kind)!
    }

    static getKind(kind: string): ITreeKind {
        const found = this.kinds.get(kind)
        if (!found) throw new Error(`Tipo de arvore desconhecido: ${kind}`)
        return found
    }

    static create(
        kind: string,
        extrinsic: {
            posicao: { x: number, y: number }
            id: string
            alturaAproximada: number
            idadeEstimada: number
        }
    ): Tree {
        return new Tree(
            this.getKind(kind),
            extrinsic.posicao,
            extrinsic.id,
            extrinsic.alturaAproximada,
            extrinsic.idadeEstimada
        )
    }

}

export type { ITree, ITreeKind }
export { Tree, TreeFactory }

