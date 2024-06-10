const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const helper = require("../helper")
const Register = async (req, res) => {
    const { email,password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: {email} })
        if (user)
            return res.status(401).json({success: false,message:"Email already exist!"})
        let hashPass = await helper.hashPassword(password)
        const data = await prisma.user.create({
            data: { email ,password:hashPass},
        });
        res.status(201).json({ success: true,message: "Account created Successfully!", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const logIn = async (req, res) => {
        try {
            const body = req.body;
           const user = await prisma.user.findUnique({ where: {email:req.body.email} })
            if (!user)
                return res.status(400).json({success:false,message:"Invalid email or password. Please try again."});
            const isPasswordValid = await helper.verifyPassword(user.password, body.password);
            if (!isPasswordValid) 
                return res.status(400).json({success:false, message:"Invalid email or password. Please try again."});
            if (user.status == 0)
                return res.status(400).json({success: false, message:"Your account is inactive. Please contact the administrator."});
            const token = helper.generateToken(user);
            return res.status(200).json({success:true, message:"Login successful!", token });
        }
        catch (error) {
            res.status(500).json({error});
        }
    };


const profile =  async (req, res) => {
    try {
        let data = req.user;
        let user = await prisma.user.findUnique({ where:{email:data.email}});
        if(user) {
            delete user.password;
            return res.status(200).json({success:true, message:"User fetch successfuly!",user});
        }else{
         return res.status(400).json({success:false,message:"User not exists !"})
        }
    }
    catch (error) {
       return res.status(500).json({error});
    }
};

const update = async (req, res) => {
        try {
            let uData = req.body;
            let id = Number(req.params.id)
            let user = await prisma.user.findUnique({ where:{id}});
            if(user) {
            const updat = await prisma.user.update({ where: {id}, data:uData })
                return res.status(200).json({success:true,message:"User update successfuly!",updat});     
            }else{
                 return res.status(400).json({success: false, message:"User not exists  !"})
            }
        }
        catch (error) {
            console.log("error",error);
           return res.status(500).json({error});
        }
    };


const getAllTodo = async (req, res) => {
    try {
        const allTodos = await prisma.todo.findMany()
        res.status(200).json({ data: allTodos })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, completed } = req.body;
        const todo = await prisma.todo.findUnique({ where: { id } })
        if (todo) {
            const todo = await prisma.todo.update({
                where: {
                    id
                },
                data: { title, description, completed }
            })
            res.status(200).json(todo)
        } else {
            res.status(404).json({ message: "No Todo Found with this ID" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await prisma.todo.findUnique({ where: { id } })
        if (todo) {
            res.status(200).json(todo)
        } else {
            res.status(404).json({ message: "Todo Not Found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }

}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await prisma.todo.delete({ where: { id } })
        res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
module.exports = {
    Register,
    logIn,
    profile,
    update,
    getAllTodo,
    updateTodo,
    getTodoById,
    deleteTodo
};
