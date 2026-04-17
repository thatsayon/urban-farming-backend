import swaggerJsdoc from "swagger-jsdoc";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [ADMIN, VENDOR, CUSTOMER]
 *     VendorProfile:
 *       type: object
 *       properties:
 *         farmName:
 *           type: string
 *         farmLocation:
 *           type: string
 *     Produce:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         availableQuantity:
 *           type: integer
 *     RentalSpace:
 *       type: object
 *       properties:
 *         location:
 *           type: string
 *         size:
 *           type: string
 *         price:
 *           type: number
 *     Order:
 *       type: object
 *       properties:
 *         produceId:
 *           type: string
 *     Certification:
 *       type: object
 *       properties:
 *         certifyingAgency:
 *           type: string
 *         certificationDate:
 *           type: string
 *           format: date-time
 *     CommunityPost:
 *       type: object
 *       properties:
 *         postContent:
 *           type: string
 * 
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 * 
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 * 
 * /vendors/profile:
 *   post:
 *     summary: Create vendor profile
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorProfile'
 *     responses:
 *       201:
 *         description: Profile created
 *   get:
 *     summary: Get vendor profile
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor profile
 * 
 * /produce:
 *   post:
 *     summary: Create produce item
 *     tags: [Produce]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produce'
 *     responses:
 *       201:
 *         description: Produce created
 *   get:
 *     summary: List all produce
 *     tags: [Produce]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of produce
 * 
 * /produce/my:
 *   get:
 *     summary: List vendor's own produce
 *     tags: [Produce]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor's produce
 * 
 * /rentals:
 *   post:
 *     summary: Create rental space
 *     tags: [Rental]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RentalSpace'
 *     responses:
 *       201:
 *         description: Rental space created
 *   get:
 *     summary: List all rental spaces
 *     tags: [Rental]
 *     responses:
 *       200:
 *         description: List of rental spaces
 * 
 * /rentals/my:
 *   get:
 *     summary: List vendor's rental spaces
 *     tags: [Rental]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor's rental spaces
 * 
 * /orders:
 *   post:
 *     summary: Create an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created
 * 
 * /orders/my:
 *   get:
 *     summary: Get customer's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer's orders
 * 
 * /orders/vendor:
 *   get:
 *     summary: Get vendor's received orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor's received orders
 * 
 * /orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, SHIPPED, COMPLETED, CANCELLED]
 *     responses:
 *       200:
 *         description: Order status updated
 * 
 * /certifications:
 *   get:
 *     summary: List all certifications (Admin)
 *     tags: [Certification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all certifications
 *   post:
 *     summary: Submit a certification (Vendor)
 *     tags: [Certification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       201:
 *         description: Certification submitted
 * 
 * /certifications/my:
 *   get:
 *     summary: Get vendor's certifications
 *     tags: [Certification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor's certifications
 * 
 * /certifications/{id}:
 *   patch:
 *     summary: Approve/Reject certification (Admin)
 *     tags: [Certification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [APPROVED, REJECTED]
 *     responses:
 *       200:
 *         description: Certification status updated
 * 
 * /community:
 *   post:
 *     summary: Create community post
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommunityPost'
 *     responses:
 *       201:
 *         description: Post created
 *   get:
 *     summary: List all community posts
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: List of posts
 */

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Urban Farming API",
      version: "1.0.0",
      description: "API documentation for Urban Farming backend"
    },

    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local server"
      }
    ],

    tags: [
      { name: "Auth" },
      { name: "Vendor" },
      { name: "Produce" },
      { name: "Rental" },
      { name: "Orders" },
      { name: "Certification" },
      { name: "Community" }
    ]
  },

  apis: [
    "src/modules/**/*.ts",
    "src/community/**/*.ts",
    "src/config/swagger.ts",
    "dist/src/modules/**/*.js",
    "dist/src/community/**/*.js",
    "dist/src/config/swagger.js"
  ]
};

export const swaggerSpec = swaggerJsdoc(options);