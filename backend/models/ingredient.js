const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
    ingredients: [
        {
            name: {
                type: String,
                required: true,
            },
            decription: {
                type: String,
                required: [true, 'Please enter inggredient description'],
            },
            image: [
                {
                    public_id: {
                        type: String,
                        required: true
                    },
                    url: {
                        type: String,
                        required: true
                    },
                }
            ],
            amount: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
                required: true
            }
        }
    ],
    importDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Ingredient', ingredientSchema);