import { createClient } from "@supabase/supabase-js";

const SupabaseAPI = createClient(
  "https://kzttcfucnsumvxxstrbg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjEwNDYwOSwiZXhwIjoxOTUxNjgwNjA5fQ.5-PN30zmKUfD7nshegb44EIEPnLEi48L4V3rUuMZbnU"
);

export { SupabaseAPI as API };