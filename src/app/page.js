import { redirect } from "next/navigation";

export default function RootPage() {
  // Kullanıcı ana kök dizine (/) girdiğinde direkt İngilizceye (veya TR'ye) atıyoruz.
  redirect("/en");
}
