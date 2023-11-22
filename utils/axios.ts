// Mengimpor library Axios
import Axios from 'axios';

// Membuat instance Axios dengan konfigurasi khusus
const instance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Menetapkan URL dasar untuk semua permintaan
    headers: {
        'Accept': 'application/json' // Menetapkan header default untuk semua permintaan
    },
});

// Menambahkan interceptor permintaan
instance.interceptors.request.use(
    async (config) => {
        // Fungsi ini dipanggil sebelum permintaan dikirim
        // Anda dapat memodifikasi konfigurasi permintaan di sini
        return config;
    },
    (error) => {
        // Fungsi ini dipanggil ketika terjadi kesalahan dalam permintaan
        // Anda dapat menangani kesalahan atau menolak permintaan di sini
        return Promise.reject(error);
    }
);

// Menambahkan interceptor respons
instance.interceptors.response.use(
    (res) => {
        // Fungsi ini dipanggil ketika respons diterima dengan sukses
        // Anda dapat memodifikasi data respons atau melakukan tindakan tambahan di sini
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(res.data); // Memecahkan janji dengan data respons setelah penundaan (mensimulasikan perilaku asinkron)
            }, 1000);
        });
    },
    async (err) => {
        // Fungsi ini dipanggil ketika terjadi kesalahan dalam respons
        // Anda dapat menangani kesalahan atau menolak respons di sini

        try {
            if (err.response) {
                return err.response; // Jika kesalahan memiliki respons, kembalikan respons tersebut
            }
        } catch (error) {
            throw new Error('server Error'); // Jika terjadi kesalahan saat menangani respons, lemparkan kesalahan server
        }
    }
);

// Ekspor instance Axios yang dikonfigurasi sebagai ekspor default untuk modul ini
export default instance;
