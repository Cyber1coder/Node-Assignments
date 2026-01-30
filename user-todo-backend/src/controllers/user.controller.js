import supabase from "../config/supabase.js";
import { validateSignup } from "../validations/user.validation.js";

export const signup = async (req, res) => {
  const error = validateSignup(req.body);
  if (error) return res.status(400).json({ error });

  const { name, email, password } = req.body;

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const { data, error: dbError } = await supabase
    .from("users")
    .insert([{ name, email, password }])
    .select()
    .single();

  if (dbError) return res.status(500).json({ error: dbError.message });

  res.status(201).json(data);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (error) return res.status(404).json({ error: "User not found" });

  res.json({ message: "User and related todos deleted" });
};
