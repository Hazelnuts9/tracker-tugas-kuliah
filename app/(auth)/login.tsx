const handleAuth = async () => {
  if (loading) return; // cegah double submit
  setLoading(true);
  setMessage("");
  const cleanEmail = email.trim(); // aturan emas #1

  try {
    if (isRegistering) {
      const { error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: { data: { nama: nama.trim() } },
      });
      if (error) throw error;
      setMessage("Pendaftaran berhasil!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (error) throw error;
      // tidak perlu router.push, guard yang mengarahkan
    }
  } catch (e: any) {
    setMessage(e.message ?? "Terjadi kesalahan");
  } finally {
    setLoading(false);
  }
};
