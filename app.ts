/**
 * Module dependencies.
 */

import express, { Application } from "express";
import cors from "cors";

import helmet from "helmet";
import compression from 'compression';
import body_parser from 'body-parser';
import file_upload from 'express-fileupload';

import routes_list from './src/routes';

/**
 * Define app variables
 */
const app: Application = express();

/**
 * Assign functions to app
 */
app
    .use(compression())
    .use(helmet())
    .use(cors())
    // 
    .use(body_parser.json())
    .use(body_parser.urlencoded({ extended: true }))
    .use(file_upload())
    // 
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    // public folder
    .use('/static', express.static('public'));

/**
 * Add routing handlers
 */
const base_api_prefix = "/api";
// use routes
routes_list.forEach((router) => {
    app.use(base_api_prefix, router);
})

export default app;