// Configuración de la tienda. Aquí solo van claves PÚBLICAS (es seguro que se vean en el navegador).
// Si alguna está vacía, la tienda funciona en modo demo con productos de ejemplo y pagos simulados.
// Las claves SECRETAS (service_role de Supabase y sk_ de Culqi) van en las variables de entorno de Vercel, nunca aquí.
window.TIENDA_CONFIG = {
  supabaseUrl: "",      // Supabase → Project Settings → API → Project URL (https://xxxx.supabase.co)
  supabaseAnonKey: "",  // Supabase → Project Settings → API → anon public
  culqiPublicKey: "",   // CulqiPanel → Desarrollo → API Keys → llave pública (pk_test_...)
};
