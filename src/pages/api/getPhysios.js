// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabase = createClient('https://ukxiygarirdmhkubmvnc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreGl5Z2FyaXJkbWhrdWJtdm5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzc4NTExOCwiZXhwIjoyMDE5MzYxMTE4fQ.K0KxaiboSBtiE2Z1ldelCrZNGDIyH0T366Nc7uTo_bg')
  
  const { data, error } = await supabase
  .from('Physios')
  .select()

  res.status(200).json(data);
  // res.status(200).json({ name: "John Doe" });
}
