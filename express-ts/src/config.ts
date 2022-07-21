import { resolve } from 'path'
import { randomBytes } from 'crypto'
import multer, { FileFilterCallback } from 'multer'


export let config: any = {};

config.db = {};
config.server = {};

config.db.user = "root";
config.db.host = "localhost";
config.db.database = "api";
config.db.password = "heja2121";
config.db.port = 3306;
config.server.port = 8000;

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/')
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname)
  }

});

export const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png") {

    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
}


export const upload: any =  multer({ storage: storage, fileFilter: fileFilter, limits: { fieldSize: 10 * 1024 * 1024 } });
