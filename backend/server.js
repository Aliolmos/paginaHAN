import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pkg from "mercadopago";

const { MercadoPagoConfig, Preference } = pkg;

const app = express();

app.use(cors());
app.use(express.json());


const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN = "APP_USR-3465602578079606-040808-0ac4ff18c957fbad8149792f8bf33610-2565839522",
});

app.post("/create_preference", async (req, res) => {
  try {
    const preference = {
      items: req.body.items,
      back_urls: {
        success: "https://paginahan.onrender.com/success",
        failure: "https://paginahan.onrender.com/failure",
        pending: "https://paginahan.onrender.com/pending",
      },
      
    };

    const preferenceClient = new Preference(client);
    const result = await preferenceClient.create({ body: preference });

    res.json({ 
      id: result.id,
      init_point: result.init_point
    });

  } catch (error) {
    console.log("ERROR MP:", error);
    res.status(500).json({ error: "Error creando preferencia" });
  }
});

// Servir archivos estáticos
app.use(express.static('./'));

// Ruta para servir el HTML
app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: __dirname });
});
app.get("/success", (req, res) => {
  res.send('<h1>✅ Pago exitoso!</h1><a href="/">Volver</a>');
});

app.get("/failure", (req, res) => {
  res.send('<h1>❌ Pago fallido</h1><a href="/">Volver</a>');
});

app.get("/pending", (req, res) => {
  res.send('<h1>⏳ Pago pendiente</h1><a href="/">Volver</a>');
});

app.post("/webhook", (req, res) => {
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
