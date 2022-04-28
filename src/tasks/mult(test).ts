import { extname } from "path";

export const FileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|avi|mkv|flv|wmv)$/)) {
      return callback(new Error('Only image\video files are allowed!'), false);
    }
    callback(null, true);
  };