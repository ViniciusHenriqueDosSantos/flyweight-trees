import { TreeFactory } from "./tree"

TreeFactory.registerKind({
    kind: "araucaria",
    tipoFolha: "normal e pequeno",
    tipoTronco: "seco",
    numeroMedioGalhos: 40,
    corPredominanteFolhas: "verde escuro",
    regiaoTipicaOcorrencia: "Sul do Brasil",
})

TreeFactory.registerKind({
    kind: "cacto",
    tipoFolha: "não possui",
    tipoTronco: "espinhento",
    numeroMedioGalhos: 5,
    corPredominanteFolhas: "verde claro",
    regiaoTipicaOcorrencia: "Nordeste do Brasil",
})

TreeFactory.registerKind({
    kind: "ipe",
    tipoFolha: "normal e grande",
    tipoTronco: "normal",
    numeroMedioGalhos: 25,
    corPredominanteFolhas: "verde",
    regiaoTipicaOcorrencia: "Cerrado e Mata Atlantica",
})

const kinds = ["araucaria", "cacto", "ipe"]
const treesGroups = kinds.map(kind =>{
   return Array.from({ length: 5 }, (_, i) =>
        TreeFactory.create(kind, {
            posicao: { x: i * 10, y: i * 5 },
            id: `${kind}-${i}`,
            alturaAproximada: 2 + i,
            idadeEstimada: 5 + i * 3,
        })
    )
}
)
let numArvores =0
for (const trees of treesGroups){
    for (const t of trees) {
        console.log(`${t.id} (${t.kind.kind}) at (${t.posicao.x},${t.posicao.y}) - ${t.alturaAproximada}m, ${t.idadeEstimada} yearks`)
        numArvores++
    }
}
console.log(`\nTotal de arvores: ${numArvores}`)
