import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wjjvldfpainusaockocg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqanZsZGZwYWludXNhb2Nrb2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzMjY4ODksImV4cCI6MjAwNjkwMjg4OX0.TAnTzVbvUl2qsA-xtDteLzTII2iYn6ilV6CNxtu7EgY"
);
