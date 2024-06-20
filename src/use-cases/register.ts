import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

//  services

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

// SOLID - Uncle Bob (Clean Code)

// D - Dependency Inversion Principle

export class RegisterUseCase {
  constructor(private usersRepository: any) {
    // inversão de dependências
  }

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error("E-mail already exists");

      // return reply.status(409).send(); //HTTP
    }

    // const prismaUsersRepository = new PrismaUsersRepository();

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
