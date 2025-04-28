import prisma from "@/lib/prisma";
import { Button } from "flowbite-react";
import Form from "next/form";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";

export default async function DeleteTodo({ params }) {
    const id = parseInt((await params).id);
    const currentTodo = await prisma.todo.findFirst({ where: { id: id }});
    if (!currentTodo) return notFound();
    const deleteTodo = async() => {
        "use server";
        await prisma.todo.delete({
            where: { id: id }
        });
        redirect('/todos');
    }
    return <Form action={deleteTodo}>
        <h1>Are you sure you want to delete <strong>{currentTodo.task}</strong>?</h1>
        <div className="flex">
            <Button color="failure" type="submit">Yes</Button>
            <Button color="success" as={Link} href={`/todos/${id}`}>No</Button>
        </div>
    </Form>
}