const express = require('express')
const router = express.Router()
const generateRecipe = require('../services/generate_recipe')

router.get('/', function(req, res, next){
    res.render('enter_ingredients')
})

router.post('/generate_recipe', function(req, res, next){
    // TODO complete this method 
    let formData = req.body
    let userIngredients = formData.ingredients
    console.log('User entered:', formData)

    // make a Gemini request
    generateRecipe(userIngredients).then( recipeJSON => {
        return res.render('recipe_result', { userIngredients: userIngredients, recipeJSON: recipeJSON})
    }).catch(err => {
        return next(err)
    })
})

module.exports = router


