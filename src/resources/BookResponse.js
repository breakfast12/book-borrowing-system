/**
 * Book response.
 */
function bookResponse(book) {
  return {
    message: "Successfully Store Book",
    book: {
      id: book.id,
      code: book.code,
      title: book.title,
      author: book.author,
      stock: book.stock,
    },
  };
}

module.exports = bookResponse;
