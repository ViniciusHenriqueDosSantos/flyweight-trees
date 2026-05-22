interface ITreeKind {
  kind: string;
  tipoFolha: string;
  tipoTronco: string;
  numeroMedioGalhos: number;
  corPredominanteFolhas: string;
  regiaoTipicaOcorrencia: string;
}

interface ITree {
  kind: ITreeKind;
  posicao: { x: number; y: number };
  id: string;
  alturaAproximada: number;
  idadeEstimada: number;
}

const ContagensArvores = {
  objetosCompartilhadosCriados: 0,
  objetosArvoreCriados: 0,
  caracteresCompartilhadosArmazenados: 0,
  caracteresNaoCompartilhadosArmazenados: 0,
};

function contarCaracteresArmazenados(value: string | number): number {
  return String(value).length;
}

class Tree implements ITree {
  constructor(
    public kind: ITreeKind,
    public posicao: { x: number; y: number },
    public id: string,
    public alturaAproximada: number,
    public idadeEstimada: number,
  ) {
    ContagensArvores.objetosArvoreCriados++;
    ContagensArvores.caracteresNaoCompartilhadosArmazenados +=
      contarCaracteresArmazenados(posicao.x);
    ContagensArvores.caracteresNaoCompartilhadosArmazenados +=
      contarCaracteresArmazenados(posicao.y);
    ContagensArvores.caracteresNaoCompartilhadosArmazenados +=
      contarCaracteresArmazenados(id);
    ContagensArvores.caracteresNaoCompartilhadosArmazenados +=
      contarCaracteresArmazenados(alturaAproximada);
    ContagensArvores.caracteresNaoCompartilhadosArmazenados +=
      contarCaracteresArmazenados(idadeEstimada);
  }
}

class TreeFactory {
  private static kinds: Map<string, ITreeKind> = new Map();

  static registerKind(data: ITreeKind): ITreeKind {
    if (!this.kinds.has(data.kind)) {
      this.kinds.set(data.kind, data);
      ContagensArvores.objetosCompartilhadosCriados++;
      ContagensArvores.caracteresCompartilhadosArmazenados +=
        contarCaracteresArmazenados(data.kind);
      ContagensArvores.caracteresCompartilhadosArmazenados +=
        contarCaracteresArmazenados(data.tipoFolha);
      ContagensArvores.caracteresCompartilhadosArmazenados +=
        contarCaracteresArmazenados(data.tipoTronco);
      ContagensArvores.caracteresCompartilhadosArmazenados +=
        contarCaracteresArmazenados(data.numeroMedioGalhos);
      ContagensArvores.caracteresCompartilhadosArmazenados +=
        contarCaracteresArmazenados(data.corPredominanteFolhas);
      ContagensArvores.caracteresCompartilhadosArmazenados +=
        contarCaracteresArmazenados(data.regiaoTipicaOcorrencia);
    }
    return this.kinds.get(data.kind)!;
  }

  static getKind(kind: string): ITreeKind {
    const found = this.kinds.get(kind);
    if (!found) throw new Error(`Tipo de arvore desconhecido: ${kind}`);
    return found;
  }

  static create(
    kind: string,
    extrinsic: {
      posicao: { x: number; y: number };
      id: string;
      alturaAproximada: number;
      idadeEstimada: number;
    },
  ): Tree {
    return new Tree(
      this.getKind(kind),
      extrinsic.posicao,
      extrinsic.id,
      extrinsic.alturaAproximada,
      extrinsic.idadeEstimada,
    );
  }

  static countKinds(): number {
    return this.kinds.size;
  }
}

export type { ITree, ITreeKind };
export { Tree, TreeFactory, ContagensArvores };
