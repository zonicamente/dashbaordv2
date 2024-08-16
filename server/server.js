const express = require('express');
const cors = require('cors');
const path = require('path');
const vertica = require('vertica-nodejs');

const app = express();
const port = process.env.PORT || 3001;

const connection = new vertica.Connection({
    host: '10.50.130.95',
    port: 5433,
    user: 'dbadmin',
    password: 'D3$arrollo',
    database: 'VMart'
});

app.use(cors());

const mockData = [
    { PROCESO: '00_SAPP_TOPICOS_Descarga.py', FECHA: '13-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '01_SAPP_TOPICOS_Carga_a_Vertica.py', FECHA: '13-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '02_SAPP_TOPICOS_TX_Carga_a_Vertica.py', FECHA: '13-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '10_SAPP_ENROLAMIENTO_Y_TIENDAS.py', FECHA: '', ESTATUS: '', HABILITADO: 'NO' },
    { PROCESO: '20_SAPP_TX.py', FECHA: '13-ago-24', ESTATUS: 'ERROR', HABILITADO: 'SI' },
    { PROCESO: '21_SAPP_TX_MAC_WAC.py', FECHA: '13-ago-24', ESTATUS: 'ERROR', HABILITADO: 'SI' },
    { PROCESO: '22_SAPP_TX_WEB_USABILIDAD.py', FECHA: '13-ago-24', ESTATUS: 'ERROR', HABILITADO: 'SI' },
    { PROCESO: '25_SAPP_TX_DETALLE.py', FECHA: '', ESTATUS: '', HABILITADO: 'SI' },
    { PROCESO: '26_SAPP_TX_Historia_Act.py', FECHA: '13-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '27_BANCA_DIG_Borrar_2_dias.py', FECHA: '13-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '30_SAPP_UPAX_Carga_a_Vertica.py', FECHA: '', ESTATUS: '', HABILITADO: 'NO' },
    { PROCESO: '31_SAPP_INTERACCIONES_Carga_a_Vertica.py', FECHA: '13-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '32_SAPP_TAGGEO_Carga_a_Vertica.py', FECHA: '13-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '50_SAPP_MOVIMIENTOS.py', FECHA: '13-ago-24', ESTATUS: 'ERROR', HABILITADO: 'SI' },
    { PROCESO: '50_BIENESTAR_MOVIMIENTOS.py', FECHA: '13-ago-24', ESTATUS: 'ERROR', HABILITADO: 'SI' },
    { PROCESO: '50_WEB_DIG_MOVIMIENTOS.py', FECHA: '13-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '51_SAPP_SALDOS.py', FECHA: '13-ago-24', ESTATUS: 'ERROR', HABILITADO: 'SI' },
    { PROCESO: '56_SAPP_MOV_Y_SALDOS_Historia_Act.py', FECHA: '13-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '56_BIENESTAR_MOVIMIENTOS_Historia_Act.py', FECHA: '12-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '56_WEB_DIG_MOVIMIENTOS_Historia_Act.py', FECHA: '12-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '61_SAPP_CLIENTES_TXND_ZEUS.py', FECHA: '13-ago-24', ESTATUS: 'ERROR', HABILITADO: 'SI' },
    { PROCESO: '66_SAPP_SIN_USO.py', FECHA: '12-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' },
    { PROCESO: '90_SAPP_ESTADISTICAS_PURGE.py', FECHA: '12-ago-24', ESTATUS: 'OK', HABILITADO: 'SI' }
];

// app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/data', (req, res) => {

    console.log("Solicitud recibida en /api/data");

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to Vertica:', err);
            return res.status(500).send('Database connection failed');
        }

        const query = 'SELECT * FROM schvtcd_raw_baz_superapp.RAW_VW_LOG_PROCESO_RESUMEN_SAPP LIMIT 10';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Query failed');
            }

            res.json(results);
            connection.end();
        });
    });
});

app.get('/api/fdata', (req, res) => {
    res.json(mockData);
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
