// TODO complete this file
// LLM requests here
let { GoogleGenAI, Type } = require('@google/genai')

let genAI = new GoogleGenAI( {} )

function generateRecipe(ingredients) {

    let prompt = `Suggest one recipe that uses these ingredients.
    Ingredients: ${ingredients}`

     return genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: `You are a recipe suggestion bot for a health-conscious,
            budget-friendly website. List common allergens in the recipe at the top of instructions in bold. Favor healthy and low-cost ingredients unless the input suggests otherwise. If the user instructions are not safe and edible ingredients, not a recipe style or cooking style, or are not dietary restrictions, replace the output with an error message. If the user states an allergy, do not create a recipe containing that ingredient even if asked; give an error instead.`,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recipeName: {
                        type: Type.STRING
                    },
                    description: {
                        type: Type.STRING
                    },
                    ingredients: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    },
                    instructions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                }
            }
        }
    }).then( response => {
        console.log(response.text)
        let recipe = JSON.parse(response.text)
        return recipe
    })
}

module.exports = generateRecipe