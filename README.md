# CURAGAN

Curagan is a mobile-based web application where we can make appointments with available doctors for consultation.

## Installation

### Client Side

1. Pull this repository

2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

3. Run the service

```bash
npm run dev
```

<mark> Doctor's Account can only created using a request to admin</mark>

### Server Side

1. Pull this repository: https://github.com/yankyhermawan/curagan-personal.git

2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

3. Run the service

```bash
npm run dev
```

<mark>Create .env by your own</mark>

## Preview

Beranda

![Beranda](./assets/home.png)

Pencarian

![Pencarian](./assets/search.png)

Riwayat

![Riwayat Konsultasi](./assets/history.png)

Notifikasi

![Notifikasi](./assets/notif.png)

Jadwal Dokter

![Jadwal Dokter](./assets/doctorAppointment.png)

Atur Jadwal Dokter

![Atur Jadwal Dokter](./assets/jadwalDokter.png)

Known Issues:

- NextJS Router can't define the id parameter in some routes
- It will error if you try to refresh the page (even though the first visit has no error)
