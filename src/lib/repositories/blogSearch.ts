import { blogSearchSupabaseRepo } from "./blogSearchSupabase";
import { blogSearchPostgresRepo } from "./blogSearchPostgres";
import { BlogSearchRepository } from "./blogSearchRepository";

const USE_SUPABASE = process.env.USE_SUPABASE === "true";

export const blogSearchRepo: BlogSearchRepository = USE_SUPABASE
  ? blogSearchSupabaseRepo
  : blogSearchPostgresRepo;
