import express, { Request, Response } from 'express';
import { UploadedFile, FileArray } from 'express-fileupload';
import { csv_parser, csv_filter } from '../../utils/csv/parser';
import { csv_generate } from '../../utils/csv/generate';
import { csv_clean } from '../../utils/csv/clean';

const router = express.Router();
const base_path = '/csv';

csv_clean();
const separator = ',';

router.post(base_path, (req: Request, res: Response) => {
    try {
        let document = (req.files as FileArray).document as UploadedFile;
        let file_name = new Date().getTime().toString();
        let { data } = csv_parser(document.data, separator);
        let { headers } = csv_filter(data, 'Employee Name');

        let return_value = csv_generate(
            headers,
            data,
            file_name
        );
        if (return_value.status === 'success') {
            res.status(200).send(return_value);
        } else {
            res.status(400).send({
                body: "Error creating csv file"
            })
        }
    } catch (error) {
        res.status(400).send({
            body: "Invalid payload"
        })
    }
})

export default router;