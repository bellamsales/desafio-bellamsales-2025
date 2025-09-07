class AbrigoAnimais
{
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais)
  {
    //Base fixa dos animais e brinquedos
    const animais =
    {
      Rex: {tipo: 'cão', brinquedos:['RATO', 'BOLA']},
      Mimi: {tipo:'gato', brinquedos:['BOLA', 'LASER']},
      Fofo: {tipo:'gato', brinquedos:['BOLA', 'RATO', 'LASER']},
      Zero: {tipo:'gato', brinquedos:['BOLA', 'RATO']},
      Bola: {tipo:'cão', brinquedos:['CAIXA', 'NOVELO']},
      Bebe: {tipo:'cão', brinquedos:['BOLA', 'LASER', 'RATO']},
      Loco: {tipo:'jabuti', brinquedos:['SKATE', 'RATO']},
    };

    //Transformei as strings em listas
    const brinquedos1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const brinquedos2 = brinquedosPessoa2.split(',').map(b => b.trim());
    const ordem = ordemAnimais.split(',').map(b => b.trim());

    //Validar os animais inválidos ou duplicados
    const setAnimais = new Set(ordem);
    if (setAnimais.size !== ordem.length || ordem.some(a => !animais[a]))
    {
      return {erro: 'Animal inválido', lista: null};
    }

    //Validar os brinquedos inválidos ou duplicados
    const brinquedosValidos = new Set(Object.values(animais).flatMap(a => a.brinquedos));
    function validarBrinquedos(lista)
    {
      const set = new Set(lista);
      return set.zise === lista.length && lista.every(b => brinquedosValidos.has(b));
    }
    if (!validarBrinquedos(brinquedos1) || !validarBrinquedos(brinquedos2))
    {
      return {erro: 'Brinquedo inválido', lista: null};
    }

    //Função para checar a lista
    function contemSequencia(brinquedosPessoa, brinquedosAnimal)
    {
      let i = 0;
      for (let b of brinquedosPessoa)
      {
        if (b === brinquedosAnimal[i])
        {
          i++;
        }
        if (i === brinquedosAnimal.length)
        {
          return true;
        }
      }
      return false;
    }
    const adotados = {p1: [], p2: []};
    const resultado = [];

    //Processa cada animal na ordem recebida
    for (let animal of ordem)
    {
      const info = animais[animal];
      const cond1 = contemSequencia(brinquedos1, info.brinquedos);
      const cond2 = contemSequencia(brinquedos2, info.brinquedos);
      let destino = 'abrigo';

      if (animal == 'Loco')
      {
        //só vai se já tiver outro animal junto
        if (cond1 && adotados.p1.length > 0 && adotados.p1.length < 3)
        {
          destino = 'pessoa 1';
        }
        else if (cond2 && adotados.p2.length > 0 && adotados.p2.length < 3)
        {
          destino = 'pessoa 2';
        }
      }
      else
      {
        if (cond1 && cond2)
        {
          destino = 'abrigo';
        }
        else if (cond1 && adotados.p1.length < 3)
        {
          destino = 'pessoa 1';
        }
        else if (cond2 && adotados.p2.length < 3)
        {
          destino = 'pessoa 2';
        }
      }
      if (destino === 'pessoa 1')
      {
        adotados.p1.push(animal);
      }
      if (destino === 'pessoa 2')
      {
        adotados.p2 .push(animal);
      }

      resultado.push(`${animal} - ${destino}`);
    }

    //vai ordernar a lista alfabeticamente
    return {lista: resultado.sort()};
  }
}
export { AbrigoAnimais as AbrigoAnimais };