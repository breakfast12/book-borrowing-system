/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for books (code, title, or author)
 *       - in: query
 *         name: per_page
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [code, title, author, stock, createdAt, updatedAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sort direction
 *     responses:
 *       200:
 *         description: Successfully Show List Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Show List Book
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       code:
 *                         type: string
 *                         example: BNW-09
 *                       title:
 *                         type: string
 *                         example: Brave New World
 *                       author:
 *                         type: string
 *                         example: Aldous Huxley
 *                       stock:
 *                         type: integer
 *                         example: 13
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 1
 *                     itemCount:
 *                       type: integer
 *                       example: 1
 *                     itemsPerPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                 links:
 *                   type: object
 *                   properties:
 *                     first:
 *                       type: string
 *                       example: http://127.0.0.1:3000/api/book?per_page=10&page=1
 *                     previous:
 *                       type: string
 *                       example: null
 *                     next:
 *                       type: string
 *                       example: null
 *                     last:
 *                       type: string
 *                       example: http://127.0.0.1:3000/api/book?per_page=10&page=1
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                     example: Unauthorized
 *             examples:
 *               unauthorized:
 *                 summary: Token has been invalidated
 *                 value:
 *                   error: "Token has been invalidated"
 */

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - title
 *               - author
 *               - stock
 *             properties:
 *               code:
 *                 type: string
 *                 example: SHR-1
 *               title:
 *                 type: string
 *                 example: A Study in Scarlet
 *               author:
 *                 type: string
 *                 example: Arthur Conan Doyle
 *               stock:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Successfully Store Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Store Book
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     code:
 *                       type: string
 *                       example: JK-45
 *                     title:
 *                       type: string
 *                       example: Harry Potter
 *                     author:
 *                       type: string
 *                       example: J.K Rowling
 *                     stock:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *             examples:
 *               code-required:
 *                 summary: Code is required
 *                 value:
 *                   errors:
 *                     code: "Code is required"
 *               book-code-unique:
 *                 summary: Book code must be unique
 *                 value:
 *                   errors:
 *                     code: "Book code must be unique"
 *               title-required:
 *                 summary: Title is required
 *                 value:
 *                   errors:
 *                     title: "Title is required"
 *               author-required:
 *                 summary: Author is required
 *                 value:
 *                   errors:
 *                     author: "Author is required"
 *               stock-required:
 *                 summary: Stock is required
 *                 value:
 *                   errors:
 *                     stock: "Stock is required"
 *               stock-integer:
 *                 summary: Stock must be an integer
 *                 value:
 *                   errors:
 *                     stock: "Stock must be an integer"
 *               stock-minimum:
 *                 summary: Stock must be at least 1
 *                 value:
 *                   errors:
 *                     stock: "Stock must be at least 1"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                     example: Unauthorized
 *             examples:
 *               unauthorized:
 *                 summary: Token has been invalidated
 *                 value:
 *                   error: "Token has been invalidated"
 */

/**
 * @swagger
 * /api/book/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Successfully Show Detail Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Show Detail Book
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     code:
 *                       type: string
 *                       example: NRN-7
 *                     title:
 *                       type: string
 *                       example: The Lion, the Witch and the Wardrobe
 *                     author:
 *                       type: string
 *                       example: C.S. Lewis
 *                     stock:
 *                       type: integer
 *                       example: 3
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *             examples:
 *               book-not-found:
 *                 summary: Book not found
 *                 value:
 *                   errors:
 *                     id: "Book not found"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                     example: Unauthorized
 *             examples:
 *               unauthorized:
 *                 summary: Token has been invalidated
 *                 value:
 *                   error: "Token has been invalidated"
 */

/**
 * @swagger
 * /api/book/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - title
 *               - author
 *               - stock
 *             properties:
 *               code:
 *                 type: string
 *                 example: SHR-1
 *               title:
 *                 type: string
 *                 example: A Study in Scarlet
 *               author:
 *                 type: string
 *                 example: Arthur Conan Doyle
 *               stock:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully Update Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Update Book
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *             examples:
 *               code-required:
 *                 summary: Code is required
 *                 value:
 *                   errors:
 *                     code: "Code is required"
 *               book-code-unique:
 *                 summary: Book code must be unique
 *                 value:
 *                   errors:
 *                     code: "Book code must be unique"
 *               title-required:
 *                 summary: Title is required
 *                 value:
 *                   errors:
 *                     title: "Title is required"
 *               author-required:
 *                 summary: Author is required
 *                 value:
 *                   errors:
 *                     author: "Author is required"
 *               stock-required:
 *                 summary: Stock is required
 *                 value:
 *                   errors:
 *                     stock: "Stock is required"
 *               stock-integer:
 *                 summary: Stock must be an integer
 *                 value:
 *                   errors:
 *                     stock: "Stock must be an integer"
 *               stock-minimum:
 *                 summary: Stock must be at least 1
 *                 value:
 *                   errors:
 *                     stock: "Stock must be at least 1"
 *               book-not-found:
 *                 summary: Book not found
 *                 value:
 *                   errors:
 *                     id: "Book not found"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                     example: Unauthorized
 *             examples:
 *               unauthorized:
 *                 summary: Token has been invalidated
 *                 value:
 *                   error: "Token has been invalidated"
 */

/**
 * @swagger
 * /api/book/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Successfully Delete Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Delete Book
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *             examples:
 *               book-not-found:
 *                 summary: Book not found
 *                 value:
 *                   errors:
 *                     id: "Book not found"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                     example: Unauthorized
 *             examples:
 *               unauthorized:
 *                 summary: Token has been invalidated
 *                 value:
 *                   error: "Token has been invalidated"
 */
