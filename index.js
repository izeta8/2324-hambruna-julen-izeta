// La única forma de sobrevivir, o al menos intentarlo es de la siguiente manera:

// ✅ Crear un repositorio en Gitlab con un proyecto llamado 2324-hambruna-nombre-apellido
// ✅ Crear un proyecto basado en NodeJS.
// ✅ Crear un fichero index.js que ejecutaremos mediante node index.js
// ✅ Crear un servicio para la ejecución asíncrona de petición de datos.
// Cada línea de nuestro hechizo se mostrará con comentarios legibles, por ej:

// 	“El donut con más azúcar es Black Mockaroo”


// ----------------------------//
// ---- ⬇️ UTILIDADES ⬇️ ---- //
// --------------------------- //

// Se le pasa la cantidad de azucar por parametro y de devuelve sin la 'g' final.
function parseSugar(sugar)
{
    // Si se pasa un valor null o undefined se retorna 0 porque daría error con substring.
    if (!sugar) {return 0}

    sugar = parseInt(sugar.substring(0, sugar.length - 1));
    return sugar;
}
// ---------------------------//
// ---- ⬇️ EJERCICIO ⬇️ ---- //
// -------------------------- //


// Función Asíncrona para obtener el JSON.
async function fetchJSON() {

    const url = "https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json";
    
    try {

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Estado respuesta: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        // 1.- Nuestro grupo se encuentra totalmente debilitado. Necesitamos tomar azúcares, hierro, proteínas y poca fibra. Para ello debemos preparar un conjuro que nos muestre:

        console.log("1.- Nuestro grupo se encuentra totalmente debilitado. Necesitamos tomar azúcares, hierro, proteínas y poca fibra. Para ello debemos preparar un conjuro que nos muestre:");

        // Donut con más azúcar (+ 50 exp)

        console.log("Donut con más azúcar (+ 50 exp):");

        let sugarestItem;
        json.items.item.forEach(item => {
            
            let itemSugar = parseSugar(item.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars);
            let maxSugar = parseSugar(sugarestItem?.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars);

            console.log(`Item: ${item.name}. Cant: ${itemSugar}`);

            if (itemSugar>maxSugar)
            {
                sugarestItem = item;
            }
            

        });

        console.log(`El donut con más azúcar es ${sugarestItem.name}`);


        // Donut con más hierro (+ 50 exp)

        // Donut con más proteína (+ 50 exp)

        // Donut con menos fibra (+ 50 exp)

        

    } catch (error) {
        console.error(error.message);
    }
}

fetchJSON();