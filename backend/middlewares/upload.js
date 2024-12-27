import multer from "multer";

// Configuração do armazenamento de arquivos na memória
const storage = multer.memoryStorage();

// Inicializando o middleware do Multer para aceitar um único arquivo
const uploadFile = multer({ storage }).single("file");

// Middleware de upload de arquivo com verificação de erros
const uploadMiddleware = (req, res, next) => {
  uploadFile(req, res, (err) => {
    // Se houver um erro no upload, retornamos uma resposta de erro
    if (err) {
      // Podemos verificar o tipo de erro para oferecer mensagens mais específicas
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send({
          message: "File is too large. Maximum size is 10MB.",
          error: err.message,
        });
      }
      return res.status(400).send({ message: "Error uploading file", error: err.message });
    }

    // Verificar se o arquivo foi enviado
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    // Caso não haja erro, o controle passa para o próximo middleware
    next();
  });
};

export default uploadMiddleware;
