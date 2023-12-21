import { Schema, model } from 'mongoose';
import cartModel from './carts.models.js';

const fileSchema = new Schema(
	{
		name: String,
		reference: String,
	},
	{ _id: false }
);

const userSchemna = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	rol: {
		type: String,
		default: 'user',
	},
	cart: {
		type: Schema.Types.ObjectId,
		ref: 'carts',
	},
	age: {
		type: Number,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	documents: [fileSchema],
	last_connection: Date,
});

userSchemna.pre('save', async function (next) {
	// preconfiguración para generar un nuevo carrito al crear el usuario
	try {
		const newCart = await cartModel.create({});
		this.cart = newCart._id;
	} catch (error) {
		next(error);
	}
});

const userModel = model('users', userSchemna);

export default userModel;