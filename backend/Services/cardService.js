const cardModel = require('../Models/cardModel');
const listModel = require('../Models/listModel');
const boardModel = require('../Models/boardModel');
const userModel = require('../Models/userModel');
const helperMethods = require('./helperMethods');

const create = async (title, listId, boardId, user, callback) => {
	try {
		// Get list and board
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		// Validate the ownership
		const validate = await helperMethods.validateCardOwners(null, list, board, user, true);
		if (!validate) return callback({ errMessage: 'You dont have permission to add card to this list or board' });

		// Create new card
		const card = await cardModel({ title: title });
		card.owner = listId;
		card.activities.unshift({ text: `added this card to ${list.title}`, userName: user.name, color: user.color });
		card.labels = helperMethods.labelsSeed;
		await card.save();

		// Add id of the new card to owner list
		list.cards.push(card._id);
		await list.save();

		// Add log to board activity
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `added ${card.title} to this board`,
			color: user.color,
		});
		await board.save();

		// Set data transfer object
		const result = await listModel.findById(listId).populate({ path: 'cards' }).exec();
		return callback(false, result);
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const deleteById = async (cardId, listId, boardId, user, callback) => {
	try {
		// Get models
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		// Validate owner
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		// Delete the card
		const result = await cardModel.findByIdAndDelete(cardId);

		// Delete the list from lists of board
		list.cards = list.cards.filter((tempCard) => tempCard.toString() !== cardId);
		await list.save();

		// Add activity log to board
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `deleted ${result.title} from ${list.title}`,
			color: user.color,
		});
		await board.save();

		return callback(false, { message: 'Success' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const getCard = async (cardId, listId, boardId, user, callback) => {
	try {
		// Get models
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		// Validate owner
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		let returnObject = { ...card._doc, listTitle: list.title, listId: listId, boardId: boardId };

		return callback(false, returnObject);
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const update = async (cardId, listId, boardId, user, updatedObj, callback) => {
	try {
		// Get models
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		// Validate owner
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		//Update card
		await card.updateOne(updatedObj);
		await card.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const addComment = async (cardId, listId, boardId, user, body, callback) => {
	try {
		// Get models
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		// Validate owner
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		//Add comment
		card.activities.unshift({
			text: body.text,
			userName: user.name,
			isComment: true,
			color: user.color,
		});
		await card.save();

		//Add comment to board activity
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: body.text,
			actionType: 'comment',
			cardTitle: card.title,
			color: user.color,
		});
		board.save();

		return callback(false, card.activities);
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const updateComment = async (cardId, listId, boardId, commentId, user, body, callback) => {
	try {
		// Get models
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		// Validate owner
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		//Update card
		card.activities = card.activities.map((activity) => {
			if (activity._id.toString() === commentId.toString()) {
				if (activity.userName !== user.name) {
					return callback({ errMessage: "You can not edit the comment that you hasn't" });
				}
				activity.text = body.text;
			}
			return activity;
		});
		await card.save();

		//Add to board activity
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: body.text,
			actionType: 'comment',
			edited: true,
			color: user.color,
			cardTitle: card.title,
		});
		board.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

const deleteComment = async (cardId, listId, boardId, commentId, user, callback) => {
	try {
		// Get models
		const card = await cardModel.findById(cardId);
		const list = await listModel.findById(listId);
		const board = await boardModel.findById(boardId);

		// Validate owner
		const validate = await helperMethods.validateCardOwners(card, list, board, user, false);
		if (!validate) {
			errMessage: 'You dont have permission to update this card';
		}

		//Delete card
		card.activities = card.activities.filter((activity) => activity._id.toString() !== commentId.toString());
		await card.save();

		//Add to board activity
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: `deleted his/her own comment from ${card.title}`,
			color: user.color,
		});
		board.save();

		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

module.exports = {
	create,
	update,
	getCard,
	addComment,
	deleteById,
	updateComment,
	deleteComment
};
