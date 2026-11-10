# 🎮 VEINE STUDIO — Personal Identity & Indie Game/Web Portfolio

Website portfolio bergaya **Gen Z Bento Grid & Kinetic Typography** yang dibangun dengan **Next.js (App Router)**, **Tailwind CSS**, dan **Vanilla CSS**, menggunakan palet warna resmi Veine Studio:

- **Midnight Navy:** `#011427`
- **Ocean Teal:** `#0E7E8E`
- **Ice Aqua:** `#BAE5E9`
- **Crisp Off-White:** `#EFEFEF`

---

## 🚀 Cara Menjalankan di Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser kamu.

---

## 📁 Cara Menambah / Mengubah Data Portfolio (Tanpa Database)

Kamu **tidak memerlukan database atau backend** untuk menambah portfolio. Semua data tersimpan secara terpusat di:

👉 [`src/data/portfolio.ts`](./src/data/portfolio.ts)

1. Buka file `src/data/portfolio.ts`.
2. Edit bagian `SITE_PROFILE` (untuk bio, email, link sosial media), `SKILL_ARSENAL` (daftar skill), `PROJECTS` (daftar karya game/web), atau `QUEST_LOG` (pengalaman).
3. Jika punya gambar screenshot project, simpan di folder `public/projects/` lalu isi properti `imageUrl` pada project terkait.
4. Commit dan push ke GitHub/GitLab:
   ```bash
   git add .
   git commit -m "feat: tambah portfolio baru"
   git push
   ```

---

## ☁️ Cara Deploy ke AWS Amplify

Project ini sudah dilengkapi dengan konfigurasi [`amplify.yml`](./amplify.yml) (`baseDirectory: .next`) yang kompatibel dengan platform **Next.js (WEB_COMPUTE)** di **AWS Amplify Hosting**:

1. Push repository ini ke **GitHub / GitLab / Bitbucket**.
2. Buka **AWS Amplify Console** -> klik **Create new app**.
3. Pilih repository `veinestudio` dan branch utama kamu.
4. AWS Amplify akan otomatis mendeteksi file `amplify.yml` (output folder: `.next`).
5. Klik **Save and deploy** — selesai! Setiap kali kamu `git push`, website akan otomatis ter-update.

