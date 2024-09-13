// La única forma de sobrevivir, o al menos intentarlo es de la siguiente manera:

// ✅ Crear un repositorio en Gitlab con un proyecto llamado 2324-hambruna-nombre-apellido
// ✅ Crear un proyecto basado en NodeJS.
// ✅ Crear un fichero index.js que ejecutaremos mediante node index.js
// ✅ Crear un servicio para la ejecución asíncrona de petición de datos.
// Cada línea de nuestro hechizo se mostrará con comentarios legibles, por ej:

// 	“El donut con más azúcar es Black Mockaroo”

console.clear();

// ----------------------------//
// ---- ⬇️ UTILITIES ⬇️ ---- //
// --------------------------- //

// The amount of nutrition is passed as a parameter and it returns the value without the unit or '%' sign.
function parseNutrition(nutrition)
{
    // If a null or undefined value is passed, return 0 to avoid an error with substring.
    if (!nutrition) {return 0}

    // If the nutrition value is already numeric, it means there are no non-digit characters. Return the original number.
    if (isNumeric(nutrition)) {return nutrition}

    nutrition = parseFloat(nutrition.substring(0, nutrition.length - 1));
    return nutrition;
}

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}  

// Rounds the given number to 2 decimals.
function round(num) {
    return Math.round(num * 100) / 100;
}

function printTitle(title)
{
    console.log("\n\n====================================================\n");

    // Dark blue, bold and underlined.
    console.log('\x1b[34m\x1b[1m\x1b[4m%s\x1b[0m', title);
}

function printSubTitle(subTitle)
{
    // Cyan
    console.log('\x1b[36m%s\x1b[0m', subTitle);
}

// --------------------------//
// ---- ⬇️ EXERSIZE ⬇️ ---- //
// ------------------------- //


// Asyncronous function to get the donuts JSON.
(async () => {

    const url = "https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json";
    
    try {

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Estado respuesta: ${response.status}`);
        }

        const json = await response.json();

        // ----------------------------//
        // ---- ⬇️ QUESTION 1 ⬇️ ---- //
        // --------------------------- //

        // 1.- Nuestro grupo se encuentra totalmente debilitado. Necesitamos tomar azúcares, hierro, proteínas y poca fibra. Para ello debemos preparar un conjuro que nos muestre:

        printTitle("1.- Nuestro grupo se encuentra totalmente debilitado. Necesitamos tomar azúcares, hierro, proteínas y poca fibra. Para ello debemos preparar un conjuro que nos muestre:\n");

        let sugarestItemsArray = [];
        let ironestItemsArray = [];
        let proteinestItemsArray = [];
        let lessFibrousItemsArray = [];

        json.items.item.forEach(item => {
            
            // -------------------- SUGAR -------------------------- / 

            let itemSugar = parseNutrition(item.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars);
            
            // If the 'sugarestItemsArray' array is empty, we return 0 because it's the first iteration and there is no value to read from the array
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

            // If the 'ironestItemsArray' array is empty, we return 0 because it's the first iteration and there is no value to read from the array
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

            // If the 'proteinestItemsArray' array is empty, we return 0 because it's the first iteration and there is no value to read from the array
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

            let itemFibre = parseNutrition(item.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre);

            // If the 'lessFibrousItemsArray' array is empty, we return 0 because it's the first iteration and there is no value to read from the array
            let minFibra  = lessFibrousItemsArray.length==0 ? Infinity : parseNutrition(lessFibrousItemsArray[0].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre);

            // console.log(`Item: ${item.name}. Cant: ${itemFibre}`);

            if (itemFibre<minFibra)
            {
                lessFibrousItemsArray = [item];
            }

            if (itemFibre==minFibra)
            {
                lessFibrousItemsArray.push(item);
            }
            
        });
        
        // Donut con más azúcar (+ 50 exp)
        printSubTitle("Donut con más azúcar (+ 50 exp)");

        if (sugarestItemsArray.length==1)
        {
            console.log(`El donut con más azúcar es ${sugarestItemsArray[0].name}`);
        } 
            
        if (sugarestItemsArray.length>1)
        {
            let sugarestItemsNames = sugarestItemsArray.map(el => el.name); 
            console.log(`Los donuts con más azúcar son ${sugarestItemsNames.join(", ")}`);
        }
        
        // Donut con más hierro (+ 50 exp)
        printSubTitle("\nDonut con más hierro (+ 50 exp)");
        
        if (ironestItemsArray.length==1)
        {
            console.log(`El donut con más hierro es ${ironestItemsArray[0].name}`);
        } 
        
        if (ironestItemsArray.length>1)
        {
            let ironestItemsNames = ironestItemsArray.map(el => el.name); 
            console.log(`Los donuts con más hierro son ${ironestItemsNames.join(", ")}`);
        }
        
        // Donut con más proteína (+ 50 exp)
        printSubTitle("\nDonut con más proteína (+ 50 exp)");

        if (proteinestItemsArray.length==1)
        {
            console.log(`El donut con más proteína es ${ironestItemsArray[0].name}`);
        } 
        
        if (proteinestItemsArray.length>1)
        {
            let ironestItemsNames = ironestItemsArray.map(el => el.name); 
            console.log(`Los donuts con más proteína son ${ironestItemsNames.join(", ")}`);
        }
        
        // Donut con menos fibra (+ 50 exp)
        printSubTitle("\nDonut con menos fibra (+ 50 exp)");
        
        if (lessFibrousItemsArray.length==1)
        {
            console.log(`El donut con menos fibra es ${lessFibrousItemsArray[0].name}`);
        } 
        
        if (lessFibrousItemsArray.length>1)
        {
            let fibrousestItemsNames = lessFibrousItemsArray.map(el => el.name); 
            console.log(`Los donuts con menos fibra son ${fibrousestItemsNames.join(", ")}`);
        }
        
        // ----------------------------//
        // ---- ⬇️ QUESTION 2 ⬇️ ---- //
        // --------------------------- //

        // 2.- Necesitamos saber si la ingesta de calorías, grasas y carbohidratos puede mellar nuestra agilidad por lo que necesitamos:
        printTitle("2.- Necesitamos saber si la ingesta de calorías, grasas y carbohidratos puede mellar nuestra agilidad por lo que necesitamos:");

        // Listar todos los donuts y sus calorías (+ 50 exp)
        printSubTitle("\nListar todos los donuts y sus calorías (+ 50 exp)\n");
        
        json.items.item.forEach(item => {
            console.log(`El donut '${item.name}' tiene ${item.nutrition_facts.nutrition.calories} calorias`)
        });
        
        // Listar todos los donuts y sus carbohidratos (+ 50 exp)
        printSubTitle("\nListar todos los donuts y sus carbohidratos (+ 50 exp):");
        
        json.items.item.forEach(item => {
            console.log(`El donut '${item.name}' tiene ${item.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount} calorias`)
        });
        
        // Mostrar la media de calorías de todos los donuts (+ 50 exp)
        printSubTitle("\nMostrar la media de calorías de todos los donuts (+ 50 exp):");
        
        let sumaCalorias = 0;

        json.items.item.forEach(item => {
            sumaCalorias += item.nutrition_facts.nutrition.calories;
        });

        let mediaCalorias = sumaCalorias / json.items.item.length;

        console.log("La media de las calorias de todos los donuts es " + mediaCalorias );
        
        // Mostrar la suma de las grasas saturadas de todos los donuts (+ 50 exp)
        
        printSubTitle("\nMostrar la suma de las grasas saturadas de todos los donuts (+ 50 exp)");
        
        let sumaGrasasSaturadas = 0;

        json.items.item.forEach(item => {
            sumaGrasasSaturadas += parseNutrition(item.nutrition_facts.nutrition.fat.fat_type.saturated);
        });

        console.log("La suma de las grasas saturadas de todos los donuts es de " + sumaGrasasSaturadas + " gramos");
        
        // Mostrar el porcentaje medio de cada vitamina (+ 50 exp)

        printSubTitle("\nMostrar el porcentaje medio de cada vitamina (+ 50 exp)");

        let mediaVitaminas = [0, 0, 0, 0];

        json.items.item.forEach(item => {

            item.nutrition_facts.nutrition.vitamines.forEach((vitamina, index) => {
                mediaVitaminas[index] += parseFloat(parseNutrition(vitamina.percent));
            });

        });

        mediaVitaminas = mediaVitaminas.map(sumaVitaminas => {
            return sumaVitaminas / json.items.item.length;
        });
        
        for (let i = 0; i<mediaVitaminas.length; i++)
        {

            let nombreVitamina = "";
            switch (i)
            {
                case 0:
                    nombreVitamina = "Vitamin A";
                    break
                case 1:
                    nombreVitamina = "Vitamin C";
                    break
                case 2:
                    nombreVitamina = "Calcium";
                    break
                case 3:
                    nombreVitamina = "Iron";
                    break
            }

            console.log(`La media del porcentaje de la vitamina ${nombreVitamina} es de ${mediaVitaminas[i]}%`);

        }

        // ----------------------------//
        // ---- ⬇️ QUESTION 3 ⬇️ ---- //
        // --------------------------- //

        // 3.- El horno a la leña de esta posada es de alta calidad, debemos lanzar un hechizo para saber qué tipo de masa utilizan
        printTitle("\n3.- El horno a la leña de esta posada es de alta calidad, debemos lanzar un hechizo para saber qué tipo de masa utilizan");

        // Listar cada donut con sus posibles masas, batter (+ 50 exp)
        printSubTitle("\nListar cada donut con sus posibles masas, batter (+ 50 exp):\n");
        
        json.items.item.forEach(donut => {

            let battersList = donut.batters.batter.map(batter => batter.type);

            console.log(`Las posibles masas del donut ${donut.name} son: ${battersList.join(", ")}`);

        });

        // Listar cada donut con sus posibles extras topping (+ 50 exp)

        printSubTitle("\nListar cada donut con sus posibles extras topping (+ 50 exp):\n");
        
        json.items.item.forEach(donut => {

            let toppingsList = donut.topping.map(topping => topping.type);

            console.log(`Los posibles toppings del donut ${donut.name} son: ${toppingsList.join(", ")}`);

        });

        // ----------------------------//
        // ---- ⬇️ QUESTION 4 ⬇️ ---- //
        // --------------------------- //

        // 4.- Nuestro grupo sólo dispone de 4 monedas de plata.
        printTitle("\n4.- Nuestro grupo sólo dispone de 4 monedas de plata.");

    	// Mostrar cuántos donuts de cada tipo podemos comprar y las monedas sobrantes. (+ 50 exp)
        printSubTitle("\nMostrar cuántos donuts de cada tipo podemos comprar y las monedas sobrantes. (+ 50 exp)\n");

        json.items.item.forEach(donut => {
            
            let priceSum = 0;
            let budget   = 4;

            let amount = 0;
            while (donut.ppu + priceSum<=budget)
            {
                priceSum+=donut.ppu;
                amount++;
            } 

            console.log(`Puedes comprar ${amount} donuts ${donut.name} (PPU: ${donut.ppu}) con ${budget} monedas. Te sobrarían ${round(budget-priceSum)}`);

        });

        // ----------------------------//
        // ---- ⬇️ QUESTION 5 ⬇️ ---- //
        // --------------------------- //

        // 5.- Para nuestro horror y preocupación hemos detectado grandes errores sintácticos en el conjuro original, es momento de poner nuestros conocimientos arcanos al servicio de toda la posada.
        
        printTitle("\n5.- Para nuestro horror y preocupación hemos detectado grandes errores sintácticos en el conjuro original, es momento de poner nuestros conocimientos arcanos al servicio de toda la posada.");

        // Los donuts con el colesterol > 12 modificar las grasas trans a 3,2 gr (+ 50 exp)
        printSubTitle("\nLos donuts con el colesterol > 12 modificar las grasas trans a 3,2 gr (+ 50 exp)\n");
        
        json.items.item = json.items.item.map(donut => {
           
            if (parseNutrition(donut.nutrition_facts.nutrition.cholesterol.daily_value) > 12) {
                donut.nutrition_facts.nutrition.fat.fat_type.trans = "3.2 gr";

                console.log(`Al donut ${donut.name} que tiene más de 12 de colesterol, se le han cambiado las grasas trans a 3,2 gramos.`);
            }

            return donut;
        });

        // Donuts con azúcar > 50  modificar el amount de los detalles de carbohidratos a 42gr (+ 50 exp)
        printSubTitle("\nDonuts con azúcar > 50  modificar el amount de los detalles de carbohidratos a 42gr (+ 50 exp)\n");

        json.items.item = json.items.item.map(donut => {
           
            if (parseNutrition(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars) > 50) {
                donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount = '42gr';

                console.log(`Al donut ${donut.name} que tiene ${donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars} gr de azucar, se le ha cambiado el amount de los detalles de carbohidratos a ${donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount}`);
            }


            return donut;
        });

        // Añadir una vitamina llamada "Nitacina" al donut con el nombre "Magic Fusion" (+ 50 exp)
        printSubTitle('\nAñadir una vitamina llamada "Nitacina" al donut con el nombre "Magic Fusion" (+ 50 exp)\n');

        json.items.item = json.items.item.map(donut => {

            if (donut.name == "Magic Fusion") {
                donut.nutrition_facts.nutrition.vitamines.push({
                    type: "Nitacina",
                    percent: undefined
                });

                console.log(donut.name);
                console.log(donut.nutrition_facts.nutrition.vitamines);
                console.log("\n--------------------- \n");
            }
            

            return donut;
        });

        // El daily value de los carbohidratos de todos los donuts va a ser de 53% (+ 50 exp)
        printSubTitle('\nEl daily value de los carbohidratos de todos los donuts va a ser de 53% (+ 50 exp)\n');
        
        json.items.item = json.items.item.map(donut => {

            donut.nutrition_facts.nutrition.carbohydrate.daily_value = "53%";
            console.log(`Al donut ${donut.name}, se le ha cambiado el daily value de los carbohidratos a ${donut.nutrition_facts.nutrition.carbohydrate.daily_value}`);

            return donut;
        });
        
        // Crearle un nuevo atributo "Alergen" al donut llamado "Relaxing Alchemy" y que dentro de el ponga "Gluten Free" (+ 50 exp)

        printSubTitle('\nCrearle un nuevo atributo "Alergen" al donut llamado "Relaxing Alchemy" y que dentro de el ponga "Gluten Free" (+ 50 exp)\n');
        
        json.items.item = json.items.item.map(donut => {
        
            if (donut.name == "Relaxing Alchemy")
            {
                donut.alergen = "Gluten Free";
            }

            return donut;
        });

    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
    }

})();