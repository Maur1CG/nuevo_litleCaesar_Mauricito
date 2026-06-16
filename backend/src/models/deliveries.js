/*
    Campos:
        name
        phone
        image
        cars: {
            brand
            model
            plate
        }
        isActive
*/

import {Schema, model} from "mongoose"

const deliveriesSchema = new Schema({
    name: {type: String},
    phone: {type: String},
    image: {type: String},
    public_id: {type: String},
    cars: [
        {
            brand: {type: String},
            model: {type: String},
            plate: {type: String}
        }
    ],
    isActive: {type: Boolean}
},
{
    timestamps: true,
    strict: false
})

export default model("Deliveries", deliveriesSchema)