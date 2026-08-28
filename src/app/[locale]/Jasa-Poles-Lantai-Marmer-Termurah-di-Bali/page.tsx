import type { Metadata } from 'next';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  const ogLocale = locale === 'id' ? 'id_ID' : 'en_US';

  return {
    title: t('blogLantai.title'),
    description: t('blogLantai.description'),
    openGraph: {
      title: t('blogLantai.title'),
      description: t('blogLantai.description'),
      locale: ogLocale,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('blogLantai.title'),
      description: t('blogLantai.description')
    },
    alternates: {
      canonical: `/${locale}/Jasa-Poles-Lantai-Marmer-Termurah-di-Bali`,
      languages: {
        en: '/en/Jasa-Poles-Lantai-Marmer-Termurah-di-Bali',
        id: '/id/Jasa-Poles-Lantai-Marmer-Termurah-di-Bali',
        'x-default': '/en/Jasa-Poles-Lantai-Marmer-Termurah-di-Bali'
      }
    }
  };
}

export default function BlogLantaiPage() {
  return (
    <>
      <section style={{ padding: '150px 20px 40px 20px', background: '#f4f4f4', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ color: '#0D4884', fontSize: '2.5rem', marginBottom: '10px' }}>
            Jasa Poles Lantai Marmer Termurah di Bali
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem', textAlign: 'justify', marginTop: 0, maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            Lantai marmer memberikan kesan mewah dan elegan, baik untuk rumah tinggal, villa, hotel, maupun area komersial. Namun, seiring waktu, marmer dapat menjadi kusam, tergores, bernoda, atau kehilangan kilap alaminya. Jika Anda sedang mencari jasa poles marmer di Bali yang profesional, aman, dan hasilnya tahan lama, baiknya mencari agen terpercaya supaya mendapat hasil yang diinginkan.
          </p>
        </div>
      </section>

      <section style={{ padding: '20px 20px 60px 20px' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.8, color: '#333' }}>
          <Image src="/images/Home.webp" alt="Tukang Poles Marmer Bali Sedang Bekerja" width={800} height={400} style={{ width: '100%', borderRadius: '10px', marginBottom: '40px', height: 'auto' }} />

          <h2 style={{ color: '#0D4884', marginTop: '30px', marginBottom: '5px' }}>Apa itu Poles Lantai Marmer?</h2>
          
          <p style={{ textAlign: 'justify', marginTop: 0, marginBottom: '15px' }}>
            Poles lantai marmer adalah proses perawatan dan pemulihan permukaan marmer menggunakan mesin khusus dan bubuk abrasif bertahap untuk:
          </p>
          
          <ul style={{ marginBottom: '20px', paddingLeft: '20px', marginTop: 0 }}>
            <li>Menghilangkan kusam dan goresan halus</li>
            <li>Membersihkan noda membandel</li>
            <li>Mengembalikan kilap alami marmer</li>
            <li>Meratakan permukaan lantai</li>
          </ul>
          
          <p style={{ textAlign: 'justify', marginBottom: '40px' }}>
            Berbeda dengan pembersihan biasa, jasa poles lantai marmer di Bali dilakukan dengan teknik profesional dan bahan-bahan khusus agar tidak merusak pori-pori batu marmer.
          </p>
          
          <h3 style={{ color: '#0D4884', marginTop: '30px', marginBottom: '5px' }}>Tanda-Tanda Lantai Marmer Anda Perlu Dipoles</h3>
          
          <p style={{ textAlign: 'justify', marginTop: 0, marginBottom: '15px' }}>
            Banyak pemilik bangunan tidak menyadari bahwa marmer membutuhkan perawatan berkala. Berikut tanda-tanda umum (dan layanan solusi kami):
          </p>
          
          <ul style={{ marginBottom: '20px', paddingLeft: '20px', marginTop: 0 }}>
            <li>Permukaan mulai terlihat kusam (Butuh Poles Kristalisasi)</li>
            <li>Terdapat baret atau goresan pasir</li>
            <li>Warna marmer memudar atau bernoda</li>
            <li>Lantai terasa kasar saat diinjak</li>
          </ul>
          
          <p style={{ textAlign: 'justify', marginBottom: '40px' }}>
            Jika Anda mengalami salah satu kondisi di atas, sudah saatnya menggunakan jasa poles marmer di Bali secara profesional.
          </p>

          <h4 style={{ color: '#0D4884', fontSize: '1.3rem', marginTop: '30px', marginBottom: '5px' }}>Keunggulan Menggunakan Jasa Poles Marmer Profesional</h4>
          
          <p style={{ textAlign: 'justify', marginTop: 0, marginBottom: '20px' }}>
            Memoles lantai marmer tidak bisa disamakan dengan membersihkan lantai biasa. Marmer adalah material batu alam yang memiliki pori dan struktur khusus, sehingga membutuhkan teknik, alat, dan material yang tepat. Oleh karena itu, penggunaan jasa poles marmer di Bali yang profesional menjadi pilihan paling aman dan efektif untuk menjaga kualitas serta keindahan lantai marmer Anda.
          </p>
          
          <p style={{ textAlign: 'justify', marginBottom: '20px' }}>
            Memoles marmer secara mandiri sering kali tidak disarankan karena berisiko menimbulkan kerusakan permanen. Kesalahan teknik, seperti penggunaan tingkat abrasif yang tidak sesuai atau tekanan mesin yang berlebihan, dapat menyebabkan permukaan marmer menjadi terkikis secara tidak merata, meninggalkan bekas swirl, atau bahkan membuat marmer terlihat lebih kusam dari sebelumnya. Kerusakan semacam ini sulit diperbaiki dan justru membutuhkan biaya lebih besar untuk pemulihan.
          </p>

          <p style={{ textAlign: 'justify', marginBottom: '20px' }}>
            Selain itu, peralatan rumah tangga atau mesin poles biasa tidak dirancang untuk menangani karakter batu marmer. Mesin profesional menggunakan diamond pad bertahap dan chemical khusus yang mampu menghaluskan permukaan tanpa merusak struktur batu. Tanpa alat yang memadai, hasil poles cenderung tidak maksimal dan berisiko memperpendek usia lantai marmer.
          </p>

          <p style={{ textAlign: 'justify', marginBottom: '20px' }}>
            Hasil pemolesan yang dilakukan tanpa keahlian juga umumnya tidak merata dan tidak bertahan lama. Kilap yang dihasilkan sering kali hanya bersifat sementara, mudah kembali kusam, dan tidak memberikan perlindungan optimal pada permukaan marmer. Berbeda dengan jasa poles marmer profesional di Bali, yang mampu menghasilkan kilap natural, permukaan lebih rata, serta daya tahan kilap yang lebih panjang dengan standar pengerjaan yang terukur.
          </p>

          <p style={{ textAlign: 'justify', marginBottom: '40px' }}>
            Dengan menggunakan tenaga ahli, Anda tidak hanya mendapatkan tampilan lantai yang kembali mengkilap, tetapi juga perlindungan jangka panjang yang menjaga nilai estetika dan fungsi lantai marmer Anda.
          </p>

          <div style={{ background: '#eef5fa', padding: '30px', borderLeft: '5px solid #FEDE30', margin: '40px 0', borderRadius: '8px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '5px', color: '#0D4884' }}>Polesin Bali – Jasa Poles Marmer Termurah dan Terpercaya</h3> kalau seperti ini bagai mana?
            
            <p style={{ marginTop: 0, marginBottom: '15px' }}>Jika Anda membutuhkan jasa poles lantai marmer di Bali dengan hasil profesional, rapi, dan tahan lama, Polesin Bali siap membantu.</p>
            
            <ul style={{ marginBottom: '20px', paddingLeft: '20px', marginTop: 0 }}>
              <li>Konsultasi & survey GRATIS ke Lokasi</li>
              <li>Pengerjaan Cepat & Rapi</li>
              <li>Harga Transparan & Terjangkau</li>
            </ul>

            <p style={{ marginBottom: '20px' }}>Hubungi kami sekarang untuk mendapatkan penawaran terbaik dan lantai marmer kembali mengkilap seperti baru.</p>
            
            <a href="https://api.whatsapp.com/send?phone=6285385825320" target="_blank" rel="noopener noreferrer"
               style={{ background: '#FEDE30', color: '#0D4884', padding: '12px 25px', textDecoration: 'none', fontWeight: 'bold', borderRadius: '5px', display: 'inline-block', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
               <i className="fab fa-whatsapp"></i> Chat WhatsApp Sekarang
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
