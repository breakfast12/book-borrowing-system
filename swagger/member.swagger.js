/**
 * @swagger
 * /api/member:
 *   get:
 *     summary: Retrieve a list of members
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for members (code and name)
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
 *           enum: [code, name, createdAt, updatedAt]
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
 *         description: Successfully Show List Member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Show List Member
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       code:
 *                         type: string
 *                         example: M001
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-08T05:17:03.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-08T05:17:03.000Z
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
 *                       example: 5
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
 *                       example: http://127.0.0.1:3000/api/member?per_page=1&page=1
 *                     previous:
 *                       type: string
 *                       example: null
 *                     next:
 *                       type: string
 *                       example: http://127.0.0.1:3000/api/member?per_page=1&page=1
 *                     last:
 *                       type: string
 *                       example: http://127.0.0.1:3000/api/member?per_page=1&page=1
 */

/**
 * @swagger
 * /api/member:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: Successfully Store Member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Store Member
 *                 member:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     code:
 *                       type: string
 *                       example: M001
 *                     name:
 *                       type: string
 *                       example: John Doe
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
 *               name-required:
 *                 summary: Name is required
 *                 value:
 *                   errors:
 *                     name: "Name is required"
 *               name-unique:
 *                 summary: Name must be unique
 *                 value:
 *                   errors:
 *                     name: "Name must be unique"
 *
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
 * /api/member/{id}:
 *   get:
 *     summary: Get a member by ID
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The member ID
 *     responses:
 *       200:
 *         description: Successfully Show Detail Member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Show Detail Member
 *                 member:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     code:
 *                       type: string
 *                       example: M001
 *                     name:
 *                       type: string
 *                       example: Rendy
 *       400:
 *         description: Bad Request
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
 *               member-not-found:
 *                 summary: Member not found
 *                 value:
 *                   errors:
 *                     id: "Member not found"
 *
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
 * /api/member/{id}:
 *   put:
 *     summary: Update a member by ID
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Successfully Update Member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Update Member
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
 *               name-required:
 *                 summary: Name is required
 *                 value:
 *                   errors:
 *                     name: "Name is required"
 *               name-unique:
 *                 summary: Name must be unique
 *                 value:
 *                   errors:
 *                     name: "Name must be unique"
 *               member-not-found:
 *                 summary: Member not found
 *                 value:
 *                   errors:
 *                     id: "Member not found"
 *
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
 * /api/member/{id}:
 *   delete:
 *     summary: Delete a member by ID
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The member ID
 *     responses:
 *       200:
 *         description: Successfully Delete Member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Delete Member
 *       400:
 *         description: Bad Request
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
 *               member-not-found:
 *                 summary: Member not found
 *                 value:
 *                   errors:
 *                     id: "Member not found"
 *
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
