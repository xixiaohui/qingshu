import { blogSearchSupabaseRepo } from "./blogSearchSupabase";
import { BlogSearchRepository } from "./blogSearchRepository";
import { blogSearchPostgresRepo } from "./blogSearchPostgresRepo";

const USE_SUPABASE = process.env.USE_SUPABASE === "true";

export const blogSearchRepo: BlogSearchRepository = USE_SUPABASE
  ? blogSearchSupabaseRepo
  : blogSearchPostgresRepo;
