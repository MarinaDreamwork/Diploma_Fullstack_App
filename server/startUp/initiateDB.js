const booksMock = require('../mock/books.json');
const quotesMock = require('../mock/quotes.json');
const Books = require('../model/Books');
const Quotes = require('../model/Quotes');

module.exports = async () => {
  const books = await Books.find();
  const quotes = await Quotes.find();
  if(books.length !== booksMock.length) {
    await createInitialEntity(Books, booksMock);
  }
  if(quotes.length !== quotesMock.length) {
    await createInitialEntity(Quotes, quotesMock);
  }
};

async function createInitialEntity(Model, initialData) {
  await Model.collection.drop();
  return Promise.all(
    initialData.map(async item => {
      try {
        delete item.id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  )
};