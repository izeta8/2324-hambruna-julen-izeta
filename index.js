// La única forma de sobrevivir, o al menos intentarlo es de la siguiente manera:

// ✅ Crear un repositorio en Gitlab con un proyecto llamado 2324-hambruna-nombre-apellido
// ✅ Crear un proyecto basado en NodeJS.
// ✅ Crear un fichero index.js que ejecutaremos mediante node index.js
// ✅ Crear un servicio para la ejecución asíncrona de petición de datos.
// Cada línea de nuestro hechizo se mostrará con comentarios legibles, por ej:

// 	“El donut con más azúcar es Black Mockaroo”

console.clear();

// ----------------------------//
// ---- ⬇️ UTILIDADES ⬇️ ---- //
// --------------------------- //

// Se le pasa la cantidad de azucar por parametro y de devuelve sin la 'g' final.
function parseNutrition(sugar)
{
    // Si se pasa un valor null o undefined se retorna 0 porque daría error con substring.
    if (!sugar) {return 0}

    sugar = parseFloat(sugar.substring(0, sugar.length - 1));
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

        // 1.- Nuestro grupo se encuentra totalmente debilitado. Necesitamos tomar azúcares, hierro, proteínas y poca fibra. Para ello debemos preparar un conjuro que nos muestre:

        console.log("1.- Nuestro grupo se encuentra totalmente debilitado. Necesitamos tomar azúcares, hierro, proteínas y poca fibra. Para ello debemos preparar un conjuro que nos muestre:\n");

        let sugarestItemsArray = [];
        let ironestItemsArray = [];
        let proteinestItemsArray = [];
        let fibrousestItemsArray = [];

        json.items.item.forEach(item => {
            
            // -------------------- SUGAR -------------------------- / 

            let itemSugar = parseNutrition(item.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars);
            
            // Si el array 'sugarestItemsArray' está vacío devolvemos 0 porque es la primera iteración y no hay ningun valor para leer en el array 
            let maxSugar = sugarestItemsArray.length==0 ? 0 : parseNutrition(sugarestItemsArray[0]?.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars);

            // console.log(`Item: ${item.name}. Cant: ${itemSugar}`);

            if (itemSugar>maxSugar)
            {
                sugarestItemsArray = [item];
            }

            if (itemSugar==maxSugar)
            {
                sugarestItemsArray.push(item);
            }
      
            // -------------------- IRON -------------------------- / 

            let itemIron = parseNutrition(item.nutrition_facts.nutrition.vitamines[3].percent);

            // Si el array 'ironestItemsArray' está vacío devolvemos 0 porque es la primera iteración y no hay ningun valor para leer en el array 
            let maxIron = ironestItemsArray.length==0 ? 0 : parseNutrition(ironestItemsArray[0].nutrition_facts.nutrition.vitamines[3].percent);

            // console.log(`Item: ${item.name}. Cant: ${itemIron}`);

            if (itemIron>maxIron)
            {
                ironestItemsArray = [item];
            }

            if (itemIron==maxIron)
            {
                ironestItemsArray.push(item);
            }

            // -------------------- PROTEINE -------------------------- / 

            let itemProtein = parseNutrition(item.nutrition_facts.nutrition.proteine);

            // Si el array 'ironestItemsArray' está vacío devolvemos 0 porque es la primera iteración y no hay ningun valor para leer en el array 
            let maxProtein = proteinestItemsArray.length==0 ? 0 : parseNutrition(proteinestItemsArray[0].nutrition_facts.nutrition.proteine);

            // console.log(`Item: ${item.name}. Cant: ${itemProtein}`);

            if (itemProtein>maxProtein)
            {
                proteinestItemsArray = [item];
            }

            if (itemProtein==maxProtein)
            {
                proteinestItemsArray.push(item);
            }

            // -------------------- FIBRA -------------------------- / 

            let itemFibra = parseNutrition(item.nutrition_facts.nutrition.proteine);

            // Si el array 'ironestItemsArray' está vacío devolvemos 0 porque es la primera iteración y no hay ningun valor para leer en el array 
            let maxFibra  = fibrousestItemsArray.length==0 ? 0 : parseNutrition(fibrousestItemsArray[0].nutrition_facts.nutrition.proteine);

            // console.log(`Item: ${item.name}. Cant: ${itemFibra}`);

            if (itemFibra>maxFibra)
            {
                fibrousestItemsArray = [item];
            }

            if (itemFibra==maxFibra)
            {
                fibrousestItemsArray.push(item);
            }
            
        });
        
        // Donut con más azúcar (+ 50 exp)
        
        if (sugarestItemsArray.length==1)
        {
            console.log(`El donut con más azúcar es ${sugarestItemsArray[0].name}\n`);
        } 
            
        if (sugarestItemsArray.length>1)
        {
            let sugarestItemsNames = sugarestItemsArray.map(el => el.name); 
            console.log(`Los donuts con más azúcar son ${sugarestItemsNames.join(", ")}\n`);
        }
        
        // Donut con más hierro (+ 50 exp)
        
        if (ironestItemsArray.length==1)
        {
            console.log(`El donut con más hierro es ${ironestItemsArray[0].name}\n`);
        } 
        
        if (ironestItemsArray.length>1)
        {
            let ironestItemsNames = ironestItemsArray.map(el => el.name); 
            console.log(`Los donuts con más hierro son ${ironestItemsNames.join(", ")}\n`);
        }
        
        // Donut con más proteína (+ 50 exp)

        if (proteinestItemsArray.length==1)
        {
            console.log(`El donut con más proteína es ${ironestItemsArray[0].name}\n`);
        } 
        
        if (proteinestItemsArray.length>1)
        {
            let ironestItemsNames = ironestItemsArray.map(el => el.name); 
            console.log(`Los donuts con más proteína son ${ironestItemsNames.join(", ")}\n`);
        }
        
        // Donut con menos fibra (+ 50 exp)
        
        if (fibrousestItemsArray.length==1)
        {
            console.log(`El donut con más proteína es ${fibrousestItemsArray[0].name}\n`);
        } 
        
        if (fibrousestItemsArray.length>1)
        {
            let fibrousestItemsNames = fibrousestItemsArray.map(el => el.name); 
            console.log(`Los donuts con más proteína son ${fibrousestItemsNames.join(", ")}\n`);
        }
        

    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
    }
}

fetchJSON();