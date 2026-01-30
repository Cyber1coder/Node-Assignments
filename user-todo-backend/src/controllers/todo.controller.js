import supabase from "../config/supabase.js";
import { validateTodo } from "../validations/todo.validation.js";

export const addTodo = async (req, res) => {
  const error = validateTodo(req.body);
  if (error) return res.status(400).json({ error });

  const { title, description, userId } = req.body;

  const { data, error: dbError } = await supabase
    .from("todos")
    .insert([{ title, description, user_id: userId }])
    .select()
    .single();

  if (dbError) return res.status(400).json({ error: dbError.message });

  res.status(201).json(data);
};

export const getUserTodos = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);

  if (error) return res.status(404).json({ error: "Invalid user ID" });

  res.json(data);
};

export const updateTodo = async (req, res) => {
  const { todoId } = req.params;

  const { data, error } = await supabase
    .from("todos")
    .update(req.body)
    .eq("id", todoId)
    .select()
    .single();

  if (error) return res.status(404).json({ error: "Todo not found" });

  res.json(data);
};

export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", todoId);

  if (error) return res.status(404).json({ error: "Todo not found" });

  res.json({ message: "Todo deleted" });
};
