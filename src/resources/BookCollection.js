/**
 * Book Collection response.
 */
function bookResource(book) {
  return {
    id: book.id,
    code: book.code,
    title: book.title,
    author: book.author,
    stock: book.stock,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
  };
}

function bookCollection(books) {
  // Map each book object to the standardized format.
  return books.map(bookResource);
}

module.exports = {
  bookResource,
  bookCollection,
};
