import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/'); // где хранятся книги
  },
  filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, `${Date.now()} - ${file.originalname}`); // получаем время и оригинальное имя файла
  }
});

export default multer({ storage });
