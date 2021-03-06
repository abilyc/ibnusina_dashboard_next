import { ExpandMore } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Divider, Grid, Typography, styled } from "@mui/material";
import Accordions from '../Accordion';


export default function SyaratKetentuan(){
    return(
        <>
            <Grid item>
                <Card variant='outlined'>
                    <CardHeader
                        title='SYARAT & KETENTUAN'
                        sx={{padding: '20px', textAlign: 'center'}}
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container gap={2} direction='column'>


                            <Accordions
                                title='Siswa dianggap terdaftar secara sah jika:'
                                isExpand
                                icon={<ExpandMore/>}
                            >
                                <Typography component='div' sx={{pl: 2}}>
                                    <ul>
                                        <li>Telah mengisi data formulir dengan lengkap dan benar</li>
                                        <li>Memenuhi biaya pendaftaran minimal yang dilunasi pada saat masuk</li>
                                        <li>Menyerahkan dokumen-dokumen yang dibutuhkan seperti KTP orang tua dan lain-lain</li>
                                    </ul>
                                    
                                </Typography>
                            </Accordions>
                            
                            <Accordions
                                title='Panitia berhak membatalkan pendaftaran santri bersangkutan jika di kemudian hari, data atau dokumen yang diberikan tidak benar / palsu'
                            />

                            <Accordions
                                title='Pendaftaran dibagi ke dalam tiga gelombang dan pendaftar mematuhi kewajiban pembayaran yang berlaku untuk setiap gelombang, sebagaimana tercantum dalam brosur atau media-media resmi lainnya.'
                            />
                            

                            <Accordions 
                                title='Orang tua / pendaftar berhak membatalkan dengan konsekuensi pengembalian uang pendaftaran mengikuti ketentuan sebagai berikut:' 
                                isExpand
                                icon={<ExpandMore/>}
                            >
                                <Typography component='div' sx={{pl: 2}}>
                                    <ul>
                                        <li>Pengembalian 100% jika pembatalan dilakukan dalam periode gelombang pertama, yaitu satu bulan setelah pendaftaran. Lebih dari satu bulan, maka tidak ada pengembalian.</li>
                                        <li>Pengembalian 50% jika pembatalan dilakukan dalam periode gelombang kedua, yaitu satu bulan setelah pendaftaran. lebih dari itu, maka tidak ada pengembalian.</li>
                                        <li>Untuk pendaftaran gelombang 3, tidak ada pengembalian jika terjadi pembatalan.</li>
                                        <li>Untuk semua gelombang, pembatalan di hari yang sama pada saat pendaftaran, uang pendaftaran dikembalikan 100%.</li>
                                        <li>Jika telah melakukan pembayaran harus dibacakan ketentuan pembayaran disertai bukti tanda tangan.</li>
                                        <li>setelah transaksi pembayaran dilakukan wajib diberikan kwitansi, tidak ada kwitansi pembayaran diluar tanggung jawab.</li>
                                            
                                    </ul>
                                </Typography>
                            </Accordions>

                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            

        </>
    )
}

// color #12181e