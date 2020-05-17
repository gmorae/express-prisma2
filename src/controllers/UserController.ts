import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import Mail from './sendEmailController'

const prisma = new PrismaClient()

class UserController {

    public async index(req: Request, res: Response) {
        const users = await prisma.user.findMany()
        return res.json(users)
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params
        const user = await prisma.user.findOne({
            where: { id: +id },
        })
        return res.json(user)
    }

    public async create(req: Request, res: Response) {
        const { email, name, password } = req.body

        const emailValidate = await prisma.user.findOne({
            where: { email: email }
        })

        if (emailValidate) {
            return res.json({ error: 'Este e-mail já está cadastrado' })
        }

        const result = await prisma.user.create({
            data: {
                ...req.body
            },
        })

        Mail.email = email
        Mail.name = name
        Mail.password = password

        const resMail = Mail.sendMail();

        return result
            ? res.json({ success: 'Um email foi enviado para sua caixa de entrar com os seus dados de acesso' })
            : res.json({ success: 'Erro ao criar a conta, tente novamente ou mais tarde' })
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params
        const user = await prisma.user.update({
            where: { id: +id },
            data: {
                ...req.body
            },
        })
        return user
            ? res.json({ success: 'Usuário editado com sucesso' })
            : res.json({ error: 'Erro ao editar o usuário, tente novamente ou mais tarde' })
    }

    public async destroy(req: Request, res: Response) {
        const { id } = req.params
        const user = await prisma.user.delete({
            where: {
                id: +id,
            },
        })
        return user
            ? res.json({ success: 'Usuário excluido com sucesso' })
            : res.json({ error: 'Erro ao excluir o usuário, tente novamente ou mais tarde' })
    }

}

export default new UserController()