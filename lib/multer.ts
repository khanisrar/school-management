import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect"; 

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/schoolImages/",
    filename: (_req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: any, res: any, next: (result?: any) => void) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
};

export const uploadMiddleware = upload.single("image");
