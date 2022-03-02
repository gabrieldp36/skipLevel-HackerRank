// Declaro esta variable para indicar el número máximo de créditos que dispone el jugador.

const k = 20;

// En este arreglo agregamos los niveles a cumplimentar, 
// el numero representa el costo que insume finalizar el nivel.
// Ej: [5,3,2,1,4]

let costs = [];

// Agregamos aleatoriamente los niveles que deberá superar el usuario.

for (let i = 0; i < 5; i++) { costs.push( Math.round(Math.random()*10) ); };

console.time('Tiempo Ejecución');

function maximumPoints(k, costs) {

    // Declaro esta variable a fin de contabilizar 
    // el número máximo de puntos que insume cumplir todos los niveles.
    let totalArr = 0;

    // Declaro esta variable para ir sumando el costo que insume completar cada nivel.
    let sum = 0;

    // Mediante esta variable contabilizamos el número de saltos de nivel. Sólo se permite uno.
    let skipLevel = 0;

    // A través de esta variable sumamos la cantidad de niveles completados.
    let levels = 0;

    // Declaro esta variable para determinar si luego del salto de nivel 
    // existen posibilidades de continuar sumando niveles.
    let arrPossibility = [];

    // Mediante esta variable evaluamos si existen posibilidades de continuar sumanto niveles.
    let resultPossibility = [];

    // Ultilizo esta variable para indicar si se ha sumado o no un nivel al marcador general.
    let sumLevel = false;

    // Primero contabilizamos el costo total de puntos que insume completar todos los niveles.
    for ( let i = 0; i < costs.length; i++ ) {
        
        totalArr += costs[i];
    };

    // Si el total de puntos que insume completar todos los niveles es menor o igual a los créditos 
    // que posee el jugador, ello implica que se pueden completar todos los niveles y no existen 
    // razones para continuar efectuando evaluaciones.
    if ( totalArr <= k  ) {

        levels = costs.length;

        return levels;

    } else {

        // Aquí comensamos con un FOR para ir evaluando el costo que insume completar los distintos niveles 
        // y cuando aplicar el salto de nivel, para así completar el mayor número posible de niveles.
        for(let i = 0; i < costs.length; i++) {

            // Cuando entramos en cada nueva iteración evaluamos si el costo total de niveles 
            // completados hasta el momento es igual o mayor a la suma de créditos. 
            // En dicho caso no corresponde continuar evaluando nada dado que se han agotado los créditos.
            if(sum >= k) { break };

            // Si la sumatoria es menor (costo niveles completado frente a créditos del jujador) 
            // sigo avanzando y sumo el costo del nivel actual)
            if (sum < k) {

                sum += costs[i];

                sumLevel = false;

                // Si la suma total niveles cumplidos hasta el momento es menor o igual a los créditos,
                // corresponde sumar un nivel dado que el mismo se puede completar (alcanzan los créditos).
                if (sum <= k) {

                    levels = levels + 1;

                    // indicamos que se ha sumado un nivel al marcador general de niveles completados.
                    sumLevel = true;
                };
            };

            // Evaluamos para aplicar el salto de nivel: (A) que el nivel actual sea el de mayor costo; 
            // (B) que la suma total de costos supere los créditos del jugador. En ambos casos controlamos que
            // el salto de nivel se aplique sólo una vez.
            if ( ( ( costs[i] === Math.max(...costs) ) && (skipLevel < 1 ) ) 
                        || ( ( sum > k ) && (skipLevel < 1 ) ) ) {
                
                // De la suma total del costo de niveles cumplimentados, restamos el costo del nivel que no se puede completar 
                // por exceder el total de créditos disponibles.
                sum = sum - costs[i];
                
                // Dejamos constancia que ya se ha aplicado el salto de nivel.
                skipLevel = skipLevel + 1;
                
                // Aquí evaluamos las posibilidades que tiene el jugador de seguir sumando niveles, 
                // en base al costo unitario de los niveles restantes a completar.
                arrPossibility =  costs.slice( costs.indexOf(costs[i]) );
        
                for( let j = 0; j < arrPossibility.length; j++ ) {

                    let total = sum + arrPossibility[j];

                    if(total > k) {

                        resultPossibility.push('no');

                    } else {

                        resultPossibility.push('si');
                    };
                };

                // Restamos el nivel que se salta el jugador, siempre que existan posibilidades de continuar jugando 
                // y se haya sumado un nivel.
                if (resultPossibility.includes('si') && sumLevel ) {

                    levels = levels - 1;
                };
            };
        };

        // Retornamos en valor máximo posible de niveles completados.
        return levels;
    };
};

const resultado = maximumPoints(k, costs);

// Mostramos en consola el arreglo que contiene el costo unitario de cada nivel, 
// el número máximo de niveles a completar y el tiempo total de ejecución.
console.log (costs);

console.log(`El jugador puede completar un máximo de ${resultado} niveles.`);

console.timeEnd('Tiempo Ejecución');