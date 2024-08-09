/**
 * Book Detail response.
 */
function bookDetailResponse(book) {
  return {
    message: "Successfully Show Detail Book",
    book: {
      id: book.id,
      code: book.code,
      title: book.title,
      stock: book.stock,
    },
  };
}

module.exports = bookDetailResponse;
