const repository = require('../repositories/atendente-repository')

exports.get = async (req, res, next) => {
    const data = await repository.get();
    return res.status(200).send(data);
};

exports.post = async (req, res) => {
    const { idDepartamento, idSetor } = req.body;
    if (!idDepartamento || !idSetor) {
        return res.status(400).send({ mensagem: "Entradas inválidas. Verifique os campos obrigatórios." });
    }
    await repository.create(req.body);
    res.status(201).send({ mensagem: "Criado com sucesso!" });
};

exports.put = async (req, res) => {
    const id = req.params.id;
    const { idDepartamento, idSetor } = req.body;
    if (!idDepartamento || !idSetor) {
        return res.status(400).send({ mensagem: "Entradas inválidas. Verifique os campos obrigatórios." });
    }
    const updated = await repository.update(id, req.body);
    if (!updated) {
        return res.status(404).send({ mensagem: "Cadastro não encontrado." });
    }
    res.status(204).send({ mensagem: "Atualizado com sucesso!" });
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    const deleted = await repository.delete(id);
    if (!deleted) {
        return res.status(404).send({ mensagem: "Cadastro não encontrado." });
    }
    res.status(200).send({ mensagem: "Deletado com sucesso!" });
};
