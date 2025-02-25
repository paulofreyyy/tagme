import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateItemDto{
    @IsString({ message: 'Title deve ser uma string válida' })
    @IsNotEmpty({ message: 'Title é obrigatório' })
    title: string;

    @IsString({ message: 'Description deve ser uma string válida'})
    @IsNotEmpty({message: 'Description é obrigatório'})
    description:string;

    @IsUrl({},{ message: 'Imagem deve ser uma URL válida'})
    @IsNotEmpty({message: 'Image é obrigatório'})
    image: string;
}